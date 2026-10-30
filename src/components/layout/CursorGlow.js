import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const TRAIL_LIFETIME = 200;
const MAX_TRAIL_POINTS = 96;
const TRAIL_START_SPEED = 1.05;
const TRAIL_RELEASE_SPEED = 0.68;
const CURSOR_ATTRIBUTE = 'data-cursor-dot-visible';

const CursorGlobalStyle = createGlobalStyle`
  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    html[${CURSOR_ATTRIBUTE}='true'] body,
    html[${CURSOR_ATTRIBUTE}='true'] body * {
      cursor: none !important;
    }

    html[${CURSOR_ATTRIBUTE}='true'] input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']),
    html[${CURSOR_ATTRIBUTE}='true'] textarea,
    html[${CURSOR_ATTRIBUTE}='true'] [contenteditable='true'],
    html[${CURSOR_ATTRIBUTE}='true'] [role='textbox'] {
      cursor: text !important;
    }

    html[${CURSOR_ATTRIBUTE}='true'] input[type='checkbox'],
    html[${CURSOR_ATTRIBUTE}='true'] input[type='radio'],
    html[${CURSOR_ATTRIBUTE}='true'] input[type='range'],
    html[${CURSOR_ATTRIBUTE}='true'] select {
      cursor: pointer !important;
    }
  }
`;

const CursorLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
  overflow: hidden;
  visibility: hidden;

  &[data-visible='true'] { visibility: visible; }

  canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  .cursor-core {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    will-change: transform;
  }

  .cursor-core::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    margin: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    background: var(--color-text-accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--color-text-accent) 72%, transparent);
  }

  .cursor-core[data-interactive='true']::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    margin: -8px;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--color-text-accent) 68%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-text-accent) 14%, transparent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--color-text-accent) 48%, transparent);
  }

  .cursor-core[data-interactive='true']::before {
    background: var(--color-text-accent);
    border: 1px solid var(--color-text-accent);
  }

  @media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const isEditableTarget = (target) => target instanceof Element && target.closest(
  `input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']), textarea, select, [contenteditable='true'], [role='textbox']`
);

const CursorGlow = () => {
  const layerRef = useRef(null);
  const canvasRef = useRef(null);
  const coreRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const points = [];
    let enabled = finePointer.matches && !reducedMotion.matches;
    let visible = false;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let accent = '#33ffc7';
    let lastDrawBounds = null;
    let lastPointer = null;
    let lastPointerAt = 0;
    let lastFrameAt = 0;
    let pointerSpeed = 0;
    let trailStrength = 0;
    let trailActive = false;

    const setVisible = (value) => {
      if (visible === value) return;
      visible = value;
      layerRef.current?.setAttribute('data-visible', String(value));
      if (value) document.documentElement.setAttribute(CURSOR_ATTRIBUTE, 'true');
      else document.documentElement.removeAttribute(CURSOR_ATTRIBUTE);
    };

    const refreshAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--color-text-accent').trim() || '#33ffc7';
    };

    const resizeCanvas = () => {
      if (!canvas || !context) return;
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(2_000_000 / Math.max(1, width * height))
      );
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      lastDrawBounds = null;
      refreshAccent();
    };

    const themeObserver = new MutationObserver(refreshAccent);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const stop = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      points.length = 0;
      if (lastDrawBounds) {
        context?.clearRect(lastDrawBounds.x, lastDrawBounds.y, lastDrawBounds.width, lastDrawBounds.height);
        lastDrawBounds = null;
      }
      lastPointer = null;
      lastPointerAt = 0;
      lastFrameAt = 0;
      pointerSpeed = 0;
      trailStrength = 0;
      trailActive = false;
      coreRef.current?.removeAttribute('data-interactive');
      setVisible(false);
    };

    const drawTrail = (now) => {
      frameRef.current = 0;
      if (!context || !canvas || !visible || !enabled || document.hidden) {
        stop();
        return;
      }

      while (points.length && now - points[0].at > TRAIL_LIFETIME) points.shift();
      if (lastDrawBounds) {
        context.clearRect(lastDrawBounds.x, lastDrawBounds.y, lastDrawBounds.width, lastDrawBounds.height);
        lastDrawBounds = null;
      }
      if (points.length < 2) return;

      const elapsed = lastFrameAt ? Math.min(now - lastFrameAt, 40) : 16;
      lastFrameAt = now;
      const strengthTarget = trailActive && now - lastPointerAt < 42
        ? Math.max(0.2, Math.min(1, (pointerSpeed - TRAIL_RELEASE_SPEED) / 2.2))
        : 0;
      const strengthTau = strengthTarget > trailStrength ? 34 : 92;
      trailStrength += (strengthTarget - trailStrength) * (1 - Math.exp(-elapsed / strengthTau));

      if (trailStrength < 0.012 && !strengthTarget) {
        trailStrength = 0;
        lastFrameAt = 0;
        return;
      }

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      points.forEach((point) => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      });
      const padding = 24;
      lastDrawBounds = {
        x: minX - padding,
        y: minY - padding,
        width: maxX - minX + padding * 2,
        height: maxY - minY + padding * 2,
      };

      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = accent;
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length - 1; index += 1) {
        const point = points[index];
        const next = points[index + 1];
        context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
      }
      const lastPoint = points[points.length - 1];
      context.lineTo(lastPoint.x, lastPoint.y);
      context.shadowColor = accent;
      context.shadowBlur = 16;
      context.lineWidth = 2.5;
      const trailAgeFade = Math.max(0, 1 - (now - lastPoint.at) / TRAIL_LIFETIME);
      context.globalAlpha = trailStrength * trailAgeFade * 0.76;
      context.stroke();

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (points.length > 1) frameRef.current = requestAnimationFrame(drawTrail);
      else lastFrameAt = 0;
    };

    const handlePointerMove = (event) => {
      if (!enabled || document.hidden || event.pointerType !== 'mouse' || isEditableTarget(event.target)) {
        stop();
        return;
      }

      const now = performance.now();
      const eventTime = Number.isFinite(event.timeStamp) && Math.abs(now - event.timeStamp) < 2000
        ? event.timeStamp
        : now;
      const point = { x: event.clientX, y: event.clientY, at: eventTime };
      const pointerStep = lastPointer ? Math.hypot(point.x - lastPointer.x, point.y - lastPointer.y) : 0;
      const pointerElapsed = lastPointer ? Math.max(1, point.at - lastPointer.at) : 1;
      pointerSpeed = pointerStep / pointerElapsed;
      lastPointer = point;
      lastPointerAt = eventTime;
      if (!trailActive && pointerSpeed >= TRAIL_START_SPEED) trailActive = true;
      else if (trailActive && pointerSpeed < TRAIL_RELEASE_SPEED) trailActive = false;

      while (points.length && eventTime - points[0].at > TRAIL_LIFETIME) points.shift();
      const previous = points[points.length - 1];
      coreRef.current?.style.setProperty('transform', `translate3d(${point.x}px, ${point.y}px, 0)`);
      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest('a, button, [role="button"], [data-cursor-hover]'));
      if ((coreRef.current?.getAttribute('data-interactive') === 'true') !== isInteractive) {
        if (isInteractive) coreRef.current?.setAttribute('data-interactive', 'true');
        else coreRef.current?.removeAttribute('data-interactive');
      }
      setVisible(true);

      if (trailActive && pointerSpeed >= TRAIL_RELEASE_SPEED) {
        if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) >= 1) points.push(point);
        if (points.length > MAX_TRAIL_POINTS) points.shift();
      }

      if (points.length > 1 && !frameRef.current) frameRef.current = requestAnimationFrame(drawTrail);
    };

    const handlePointerLeave = () => stop();
    const handleVisibilityChange = () => {
      if (document.hidden) stop();
    };
    const handleCapabilitiesChange = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      if (!enabled) stop();
    };
    const addMediaListener = (query, listener) => {
      if (query.addEventListener) query.addEventListener('change', listener);
      else query.addListener(listener);
    };
    const removeMediaListener = (query, listener) => {
      if (query.removeEventListener) query.removeEventListener('change', listener);
      else query.removeListener(listener);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    addMediaListener(finePointer, handleCapabilitiesChange);
    addMediaListener(reducedMotion, handleCapabilitiesChange);

    return () => {
      stop();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      removeMediaListener(finePointer, handleCapabilitiesChange);
      removeMediaListener(reducedMotion, handleCapabilitiesChange);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <CursorGlobalStyle />
      <CursorLayer ref={layerRef} aria-hidden='true' data-visible='false'>
        <canvas ref={canvasRef} />
        <span ref={coreRef} className='cursor-core' />
      </CursorLayer>
    </>
  );
};

export default CursorGlow;

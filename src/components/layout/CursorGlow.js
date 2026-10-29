import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const TRAIL_LIFETIME = 200;
const MAX_TRAIL_POINTS = 180;
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
    width: 8px;
    height: 8px;
    margin: -4px;
    box-sizing: border-box;
    border-radius: 50%;
    background: var(--color-text-accent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--color-text-accent) 72%, transparent);
  }

  .cursor-core[data-interactive='true']::before {
    width: 12px;
    height: 12px;
    margin: -6px;
    background: color-mix(in srgb, var(--color-text-accent) 42%, transparent);
    border: 1px solid var(--color-text-accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--color-text-accent) 82%, transparent);
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

    const setVisible = (value) => {
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
      refreshAccent();
    };

    const themeObserver = new MutationObserver(refreshAccent);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const stop = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      points.length = 0;
      context?.clearRect(0, 0, width, height);
      coreRef.current?.removeAttribute('data-interactive');
      setVisible(false);
    };

    const drawTrail = (now) => {
      if (!context || !canvas || !visible || !enabled || document.hidden) {
        stop();
        return;
      }

      while (points.length && now - points[0].at > TRAIL_LIFETIME) points.shift();
      context.clearRect(0, 0, width, height);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = accent;

      for (let index = 1; index < points.length; index += 1) {
        const start = points[index - 1];
        const end = points[index];
        const fade = Math.max(0, 1 - (now - end.at) / TRAIL_LIFETIME);
        if (!fade) continue;

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.shadowColor = accent;
        context.shadowBlur = 22;
        context.lineWidth = 12;
        context.globalAlpha = fade * 0.2;
        context.stroke();

        context.shadowBlur = 7;
        context.lineWidth = 2.5;
        context.globalAlpha = fade * 0.56;
        context.stroke();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (points.length > 1) frameRef.current = requestAnimationFrame(drawTrail);
      else frameRef.current = 0;
    };

    const handlePointerMove = (event) => {
      if (!enabled || document.hidden || event.pointerType !== 'mouse' || isEditableTarget(event.target)) {
        stop();
        return;
      }

      const now = performance.now();
      while (points.length && now - points[0].at > TRAIL_LIFETIME) points.shift();
      const point = { x: event.clientX, y: event.clientY, at: now };
      const previous = points[points.length - 1];
      coreRef.current?.style.setProperty('transform', `translate3d(${point.x}px, ${point.y}px, 0)`);
      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest('a, button, [role="button"], [data-cursor-hover]'));
      if (isInteractive) coreRef.current?.setAttribute('data-interactive', 'true');
      else coreRef.current?.removeAttribute('data-interactive');
      setVisible(true);

      if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) >= 0.8) {
        points.push(point);
        if (points.length > MAX_TRAIL_POINTS) points.shift();
      } else {
        previous.at = now;
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

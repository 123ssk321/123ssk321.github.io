import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TRAIL_COUNT = 9;
const TRAIL_LIFETIME = 180;

const CursorLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  transition: opacity 120ms ease-out;

  &[data-visible='true'] { opacity: 1; }

  .cursor-core {
    position: absolute;
    top: 0;
    left: 0;
    width: 9px;
    height: 9px;
    margin: -4.5px 0 0 -4.5px;
    border-radius: 50%;
    background: var(--color-text-accent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--color-text-accent) 64%, transparent);
    will-change: transform;
  }

  .cursor-trail {
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    margin: -2.5px 0 0 -2.5px;
    border-radius: 50%;
    background: var(--color-text-accent);
    box-shadow: 0 0 8px color-mix(in srgb, var(--color-text-accent) 45%, transparent);
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const CursorGlow = () => {
  const layerRef = useRef(null);
  const coreRef = useRef(null);
  const trailRefs = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let enabled = finePointer.matches && !reducedMotion.matches;
    let visible = false;
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let lastFrameAt = 0;
    let lastPointerAt = 0;
    let lastTrailAt = 0;
    const points = [];

    const stop = (hide = false) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      if (hide) {
        visible = false;
        points.length = 0;
        layerRef.current?.setAttribute('data-visible', 'false');
        trailRefs.current.forEach((node) => node?.style.setProperty('opacity', '0'));
      }
    };

    const tick = (now) => {
      frameRef.current = 0;
      if (!enabled || document.hidden) {
        stop(true);
        return;
      }

      const elapsed = lastFrameAt ? Math.min(now - lastFrameAt, 40) : 16;
      lastFrameAt = now;
      const follow = 1 - Math.exp(-elapsed / 350);
      const previousX = currentX;
      const previousY = currentY;
      currentX += (targetX - currentX) * follow;
      currentY += (targetY - currentY) * follow;
      coreRef.current?.style.setProperty('transform', `translate3d(${currentX}px, ${currentY}px, 0)`);

      if (Math.hypot(currentX - previousX, currentY - previousY) > 0.25 && now - lastTrailAt >= 18) {
        points.push({ x: currentX, y: currentY, at: now });
        if (points.length > TRAIL_COUNT) points.shift();
        lastTrailAt = now;
      }

      while (points.length && now - points[0].at > TRAIL_LIFETIME) points.shift();
      points.forEach((point, index) => {
        const node = trailRefs.current[index];
        if (!node) return;
        const age = now - point.at;
        node.style.setProperty('transform', `translate3d(${point.x}px, ${point.y}px, 0)`);
        node.style.setProperty('opacity', `${Math.max(0, 1 - age / TRAIL_LIFETIME) * ((index + 1) / points.length) * 0.62}`);
      });
      for (let i = points.length; i < TRAIL_COUNT; i += 1) {
        trailRefs.current[i]?.style.setProperty('opacity', '0');
      }

      const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.35;
      const keepFollowing = !settled || now - lastPointerAt < 200 || points.length > 0;
      if (keepFollowing) frameRef.current = requestAnimationFrame(tick);
      else lastFrameAt = 0;
    };

    const handlePointerMove = (event) => {
      if (!enabled || event.pointerType !== 'mouse' || document.hidden) return;
      targetX = event.clientX;
      targetY = event.clientY;
      lastPointerAt = performance.now();
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        coreRef.current?.style.setProperty('transform', `translate3d(${currentX}px, ${currentY}px, 0)`);
        lastFrameAt = performance.now();
        visible = true;
        layerRef.current?.setAttribute('data-visible', 'true');
      }
      if (!frameRef.current) frameRef.current = requestAnimationFrame(tick);
    };

    const handlePointerLeave = () => stop(true);
    const handleVisibilityChange = () => {
      if (document.hidden) stop(true);
    };
    const handleMotionChange = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      if (!enabled) stop(true);
    };
    const addMediaListener = (query, listener) => {
      if (query.addEventListener) query.addEventListener('change', listener);
      else query.addListener(listener);
    };
    const removeMediaListener = (query, listener) => {
      if (query.removeEventListener) query.removeEventListener('change', listener);
      else query.removeListener(listener);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    addMediaListener(finePointer, handleMotionChange);
    addMediaListener(reducedMotion, handleMotionChange);
    return () => {
      stop(true);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      removeMediaListener(finePointer, handleMotionChange);
      removeMediaListener(reducedMotion, handleMotionChange);
    };
  }, []);

  return (
    <CursorLayer ref={layerRef} aria-hidden='true' data-visible='false'>
      <span ref={coreRef} className='cursor-core' />
      {Array.from({ length: TRAIL_COUNT }, (_, index) => (
        <span
          // Stable fixed pool: nodes are reused as old samples expire.
          key={index}
          ref={(node) => { trailRefs.current[index] = node; }}
          className='cursor-trail'
          style={{ opacity: 0 }}
        />
      ))}
    </CursorLayer>
  );
};

export default CursorGlow;

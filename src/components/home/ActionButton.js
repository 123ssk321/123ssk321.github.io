import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Link = styled(motion.a)`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 278px;
  max-width: calc(100vw - 32px);
  min-height: 50px;
  margin-top: 1.5rem;
  padding: 0 1.25rem;
  border: 1px solid #fff;
  border-radius: 9999px;
  background: #d1d1d1;
  color: #5a250a;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;

  &:focus-visible {
    outline: 3px solid ${(props) => (props.theme === 'dark' ? '#ff9966' : '#B82B70')};
    outline-offset: 3px;
  }
`;

const Clip = styled.span`
  position: absolute;
  z-index: 1;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
`;

const LightGroup = styled(motion.span)`
  position: absolute;
  top: calc(50% - 48px);
  left: calc(50% - 105px + 20px);
  width: 210px;
  height: 96px;
  pointer-events: none;
`;

const CoreLight = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  width: 116px;
  height: 96px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 247, 0.94) 0%, rgba(255, 250, 218, 0.82) 34%, rgba(246, 220, 196, 0.34) 63%, rgba(246, 220, 196, 0) 100%);
  transform: translateX(-50%);
`;

const SoftLight = styled.span`
  position: absolute;
  top: 5px;
  left: 0;
  width: 210px;
  height: 86px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 247, 0.78) 12%, rgba(255, 250, 224, 0.66) 40%, rgba(242, 225, 213, 0.32) 69%, rgba(242, 225, 213, 0) 100%);
  filter: blur(8px);
`;

const Label = styled.span`
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  white-space: nowrap;
`;

const Arrow = () => (
  <svg aria-hidden="true" width="22" height="12" viewBox="0 0 22 12" fill="none">
    <path d="M1 6h19m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ActionButton = ({ theme }) => {
  const linkRef = useRef(null);
  const resetTimerRef = useRef(null);
  const travelRef = useRef(0);
  const hasMeasuredRef = useRef(false);
  const lastClientXRef = useRef(null);
  const interactionRef = useRef(null);
  const [springing, setSpringing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => (
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const targetX = useMotionValue(0);
  const springX = useSpring(targetX, {
    stiffness: springing ? 10000 : 100,
    damping: springing ? 500 : 20,
  });
  const lightX = reduceMotion ? targetX : springX;
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event) => setReduceMotion(event.matches);
    setReduceMotion(query.matches);
    if (query.addEventListener) {
      query.addEventListener('change', handleChange);
      return () => query.removeEventListener('change', handleChange);
    }
    query.addListener(handleChange);
    return () => query.removeListener(handleChange);
  }, []);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const setPointerTarget = useCallback((clientX) => {
    const link = linkRef.current;
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const travel = Math.min(30, rect.width * 0.11);
    travelRef.current = travel;
    lastClientXRef.current = clientX;
    targetX.set(Math.min(travel, Math.max(-travel, clientX - rect.left - rect.width / 2)));
  }, [targetX]);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return undefined;

    const measure = () => {
      const rect = link.getBoundingClientRect();
      travelRef.current = Math.min(30, rect.width * 0.11);
      if (interactionRef.current === 'pointer' && lastClientXRef.current !== null) {
        setPointerTarget(lastClientXRef.current);
      } else {
        targetX.set(interactionRef.current === 'keyboard' ? 0 : travelRef.current * 0.2);
      }
      if (!hasMeasuredRef.current) {
        hasMeasuredRef.current = true;
        const initialX = interactionRef.current === 'keyboard' ? 0 : travelRef.current * 0.2;
        targetX.jump(initialX);
        springX.jump(initialX);
      }
    };

    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(link);
    window.addEventListener('resize', measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      clearResetTimer();
    };
  }, [clearResetTimer, setPointerTarget, springX, targetX]);

  useEffect(() => {
    if (!reduceMotion || !hasMeasuredRef.current) return;
    clearResetTimer();
    interactionRef.current = null;
    lastClientXRef.current = null;
    setSpringing(false);
    targetX.jump(travelRef.current * 0.2);
    springX.jump(travelRef.current * 0.2);
  }, [clearResetTimer, reduceMotion, springX, targetX]);

  const handlePointerEnter = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    clearResetTimer();
    interactionRef.current = 'pointer';
    setSpringing(true);
    setPointerTarget(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch' || interactionRef.current !== 'pointer') return;
    setPointerTarget(event.clientX);
  };

  const handlePointerLeave = () => {
    if (interactionRef.current !== 'pointer') return;
    interactionRef.current = null;
    lastClientXRef.current = null;
    setSpringing(false);
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(() => {
      targetX.set(travelRef.current * 0.2);
      resetTimerRef.current = null;
    }, 1000);
  };

  const handleFocus = (event) => {
    if (!event.currentTarget.matches(':focus-visible')) return;
    clearResetTimer();
    if (reduceMotion) return;
    interactionRef.current = 'keyboard';
    setSpringing(true);
    targetX.set(0);
  };

  const handleBlur = () => {
    if (interactionRef.current !== 'keyboard') return;
    interactionRef.current = null;
    setSpringing(false);
    targetX.set(travelRef.current * 0.2);
  };

  return (
    <Link
      ref={linkRef}
      theme={theme}
      href="#projects"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Clip aria-hidden="true">
        <LightGroup className="action-light" style={{ x: lightX }}>
          <SoftLight />
          <CoreLight />
        </LightGroup>
      </Clip>
      <Label>See my work <Arrow /></Label>
    </Link>
  );
};

export default ActionButton;

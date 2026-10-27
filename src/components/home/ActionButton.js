import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Link = styled(motion.a)`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 1.5rem;
  padding: 0 1.35rem;
  border: 1px solid ${(props) => (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.78)' : 'rgba(8, 111, 131, 0.28)')};
  border-radius: 9999px;
  background: ${(props) => (props.theme === 'dark' ? 'rgba(248, 245, 244, 0.88)' : '#FFFFFF')};
  color: ${(props) => (props.theme === 'dark' ? '#382333' : '#086F83')};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;

  &:focus-visible {
    outline: 3px solid ${(props) => (props.theme === 'dark' ? '#ff9966' : '#B82B70')};
    outline-offset: 3px;
  }
`;

const Halo = styled(motion.span)`
  position: absolute;
  z-index: 0;
  inset: -5px;
  border: 1px solid transparent;
  border-radius: inherit;
  background: linear-gradient(103.7deg, rgba(188, 155, 143, 0.1) 38.66%, rgba(233, 132, 99, 0.1) 68.55%, #e98463 85.01%, #fff 92.12%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;

  &::before {
    position: absolute;
    inset: -2px;
    border: 2px solid transparent;
    border-radius: inherit;
    background: linear-gradient(91.96deg, rgba(255, 177, 153, 0) 6.11%, rgba(255, 177, 153, 0.2) 53.57%, #ff7950 93.6%) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    content: '';
    filter: blur(7px);
  }
`;

const AmbientHalo = styled.span`
  position: absolute;
  z-index: 0;
  inset: -2px;
  border: 2px solid transparent;
  border-radius: inherit;
  background: linear-gradient(97.68deg, transparent 38.1%, rgba(255, 177, 153, 0.2) 82.47%, #ff7950 93.3%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  filter: blur(2px);
  opacity: 0.65;
  pointer-events: none;
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
  top: calc(50% - 60.5px);
  left: calc(50% - 102px);
  width: 204px;
  height: 121px;
  pointer-events: none;
`;

const CoreLight = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  width: 121px;
  height: 121px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, #fffff5 3.5%, #ffaa81 26.5%, #ffda9f 37.5%, rgba(255, 170, 129, 0.5) 49%, rgba(210, 106, 58, 0) 92.5%);
  transform: translateX(-50%);
`;

const SoftLight = styled.span`
  position: absolute;
  top: 9px;
  left: 0;
  width: 204px;
  height: 103px;
  border-radius: 50%;
  background: radial-gradient(43.3% 44.23% at 50% 49.51%, #fffff7 29%, #fffacd 48.5%, #f4d2bf 60.71%, rgba(214, 211, 210, 0) 100%);
  filter: blur(5px);
`;

const Label = styled.span`
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
`;

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
  const rightOpacity = useTransform(lightX, (x) => {
    const travel = travelRef.current;
    return travel === 0 ? 1 : Math.min(1, Math.max(0, x / travel));
  });
  const leftOpacity = useTransform(lightX, (x) => {
    const travel = travelRef.current;
    return travel === 0 ? 0 : Math.min(1, Math.max(0, -x / travel));
  });

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
    const travel = Math.max(0, rect.width / 2 - 6);
    travelRef.current = travel;
    lastClientXRef.current = clientX;
    targetX.set(Math.min(travel, Math.max(-travel, clientX - rect.left - rect.width / 2)));
  }, [targetX]);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return undefined;

    const measure = () => {
      const rect = link.getBoundingClientRect();
      travelRef.current = Math.max(0, rect.width / 2 - 6);
      if (interactionRef.current === 'pointer' && lastClientXRef.current !== null) {
        setPointerTarget(lastClientXRef.current);
      } else {
        targetX.set(interactionRef.current === 'keyboard' ? 0 : travelRef.current);
      }
      if (!hasMeasuredRef.current) {
        hasMeasuredRef.current = true;
        const initialX = interactionRef.current === 'keyboard' ? 0 : travelRef.current;
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
    targetX.jump(travelRef.current);
    springX.jump(travelRef.current);
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
      targetX.set(travelRef.current);
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
    targetX.set(travelRef.current);
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
      <AmbientHalo aria-hidden="true" />
      <Halo className="action-halo action-halo-left" aria-hidden="true" style={{ opacity: leftOpacity, transform: 'scaleX(-1)' }} />
      <Halo className="action-halo action-halo-right" aria-hidden="true" style={{ opacity: rightOpacity }} />
      <Clip aria-hidden="true">
        <LightGroup className="action-light" style={{ x: lightX }}>
          <SoftLight />
          <CoreLight />
        </LightGroup>
      </Clip>
      <Label>See my work <span aria-hidden="true">→</span></Label>
    </Link>
  );
};

export default ActionButton;

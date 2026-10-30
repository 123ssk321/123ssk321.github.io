import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AtmosphereStage = styled.div`
  position: relative;
  isolation: isolate;
  background: var(--color-bg-primary);
`;

const AtmosphereLayers = styled.div`
  --undersea-wash: color-mix(in srgb, var(--color-text-accent) 6%, transparent);
  --undersea-wash-soft: color-mix(in srgb, var(--color-text-accent) 3%, transparent);
  --undersea-beam: color-mix(in srgb, var(--color-text-accent) 9%, transparent);

  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, #000 0%, #000 84%, transparent 100%);

  html.dark & {
    --undersea-wash: color-mix(in srgb, var(--color-text-accent) 4%, transparent);
    --undersea-wash-soft: color-mix(in srgb, var(--color-text-accent) 2%, transparent);
    --undersea-beam: color-mix(in srgb, var(--color-text-accent) 9%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .caustic-band {
      animation: none;
    }
  }
`;

const LightBeams = styled.div`
  position: absolute;
  inset: 0 0 auto;
  height: min(92vh, 56rem);
  background:
    linear-gradient(108deg, transparent 9%, var(--undersea-beam) 18%, transparent 27%),
    linear-gradient(108deg, transparent 31%, var(--undersea-wash-soft) 39%, transparent 47%),
    linear-gradient(108deg, transparent 59%, var(--undersea-beam) 67%, transparent 75%);
  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.65) 48%, transparent 100%);
`;

const CausticBand = styled.div`
  position: absolute;
  left: -14%;
  width: 128%;
  height: clamp(24rem, 52vw, 42rem);
  background: linear-gradient(
    108deg,
    transparent 18%,
    var(--undersea-wash-soft) 30%,
    var(--undersea-wash) 38%,
    transparent 48%,
    var(--undersea-wash-soft) 57%,
    transparent 68%
  );
  opacity: 0.76;
  transform: translate3d(0, 0, 0);
  animation: ${props => props.$motion} 46s ease-in-out infinite alternate;
  animation-play-state: paused;

  [data-active='true'] & {
    animation-play-state: running;
  }

  @keyframes drift-a {
    from { transform: translate3d(-1.5%, -1.5rem, 0); opacity: 0.56; }
    to { transform: translate3d(1.5%, 1.5rem, 0); opacity: 0.86; }
  }

  @keyframes drift-b {
    from { transform: translate3d(1.25%, 1.5rem, 0); opacity: 0.56; }
    to { transform: translate3d(-1.25%, -1.5rem, 0); opacity: 0.82; }
  }

  @keyframes drift-c {
    from { transform: translate3d(-1%, 1rem, 0); opacity: 0.52; }
    to { transform: translate3d(1%, -1rem, 0); opacity: 0.78; }
  }
`;

const AtmosphereContent = styled.div`
  position: relative;
  z-index: 1;
`;

export default function UnderseaAtmosphere({ children }) {
  const stageRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return undefined;

    let isIntersecting = false;
    const syncVisibility = () => {
      setIsActive(isIntersecting && document.visibilityState !== 'hidden');
    };
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      syncVisibility();
    });

    observer.observe(stage);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  return (
    <AtmosphereStage ref={stageRef} data-active={isActive}>
      <AtmosphereLayers aria-hidden="true">
        <LightBeams />
        <CausticBand className="caustic-band" $motion="drift-a" style={{ top: '10%' }} />
        <CausticBand className="caustic-band" $motion="drift-b" style={{ top: '42%' }} />
        <CausticBand className="caustic-band" $motion="drift-c" style={{ top: '74%' }} />
      </AtmosphereLayers>
      <AtmosphereContent>{children}</AtmosphereContent>
    </AtmosphereStage>
  );
}

import React from 'react';
import styled from 'styled-components';

const Artwork = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  svg .horizon-composition {
    transform: translateY(70px);
  }

  @media (max-width: 768px) {
    svg .horizon-composition {
      transform: translateY(95px);
    }
  }
`;

const HorizonGlow = styled.path`
  opacity: 0.65;
  animation: horizonGlow 12s ease-in-out infinite;
  animation-play-state: ${(props) => (props.$active ? 'running' : 'paused')};

  @keyframes horizonGlow {
    50% { opacity: 0.9; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.75;
  }
`;

const HorizonBackground = ({ theme, isMotionActive }) => {
  const isDark = theme === 'dark';
  const skyTop = isDark ? '#16012c' : '#F3FAFC';
  const skyBottom = isDark ? '#2b1055' : '#E7F2F6';
  const planet = isDark ? '#1b0a2d' : '#E4F0F4';
  const rimStart = isDark ? '#ff1b6b' : '#086F83';
  const rimEnd = isDark ? '#ff9966' : '#B82B70';
  const sunTop = isDark ? '#ff1b6b' : '#B82B70';
  const sunBottom = isDark ? '#ff9966' : '#F0A28D';
  const reflection = isDark ? '#ff5d9b' : '#086F83';

  return (
    <Artwork aria-hidden='true'>
      <svg viewBox='0 0 1440 900' preserveAspectRatio='xMidYMid slice'>
        <defs>
          <linearGradient id='horizon-sky' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={skyTop} />
            <stop offset='100%' stopColor={skyBottom} />
          </linearGradient>
          <linearGradient id='horizon-rim' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor={rimStart} stopOpacity='0.2' />
            <stop offset='50%' stopColor={rimEnd} />
            <stop offset='100%' stopColor={rimStart} stopOpacity='0.2' />
          </linearGradient>
          <linearGradient id='horizon-sunset' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={sunTop} />
            <stop offset='100%' stopColor={sunBottom} />
          </linearGradient>
          <linearGradient id='horizon-reflection' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor={reflection} stopOpacity='0' />
            <stop offset='50%' stopColor={reflection} stopOpacity={isDark ? '0.22' : '0.14'} />
            <stop offset='100%' stopColor={reflection} stopOpacity='0' />
          </linearGradient>
          <radialGradient id='horizon-halo' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor={isDark ? '#ff1b6b' : '#F0A7B9'} stopOpacity={isDark ? '0.16' : '0.1'} />
            <stop offset='100%' stopColor={isDark ? '#ff1b6b' : '#F0A7B9'} stopOpacity='0' />
          </radialGradient>
          <clipPath id='sunset-disc'>
            <circle cx='720' cy='655' r='78' />
          </clipPath>
        </defs>

        <rect width='1440' height='900' fill='url(#horizon-sky)' />
        <g className='horizon-composition'>
          <ellipse cx='720' cy='705' rx='440' ry='120' fill='url(#horizon-halo)' />
          <circle cx='720' cy='655' r='78' fill='url(#horizon-sunset)' />
          <g clipPath='url(#sunset-disc)' stroke={skyTop} strokeWidth='8' opacity='0.74'>
            <path d='M 630 618 H 810 M 620 635 H 820 M 615 652 H 825 M 620 669 H 820 M 630 686 H 810 M 646 703 H 794' />
          </g>
          <path d='M -100 705 C 280 625 1160 625 1540 705 V 920 H -100 Z' fill={planet} />
          <ellipse cx='720' cy='777' rx='460' ry='22' fill='url(#horizon-reflection)' />
          <path d='M -100 705 C 280 625 1160 625 1540 705' fill='none' stroke='url(#horizon-rim)' strokeWidth='3' />
          <HorizonGlow
            $active={isMotionActive}
            d='M 170 724 C 440 687 1000 687 1270 724'
            fill='none'
            stroke='url(#horizon-rim)'
            strokeWidth='2'
          />
          <path d='M 430 777 C 570 766 870 766 1010 777' fill='none' stroke='url(#horizon-reflection)' strokeWidth='4' />
        </g>
      </svg>
    </Artwork>
  );
};

export default HorizonBackground;

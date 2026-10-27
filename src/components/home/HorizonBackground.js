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
  opacity: 0.8;
  animation: horizonGlow 7s ease-in-out infinite;
  animation-play-state: ${(props) => (props.$active ? 'running' : 'paused')};

  @keyframes horizonGlow {
    50% { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.75;
  }
`;

const HorizonMotion = styled.g`
  animation: ${props => props.$kind === 'reflection' ? 'seaGlint 6s ease-in-out infinite' : 'sunBreath 8s ease-in-out infinite'};
  animation-play-state: ${(props) => (props.$active ? 'running' : 'paused')};

  @keyframes seaGlint {
    0%, 100% { transform: translateX(-24px); opacity: 0.8; }
    50% { transform: translateX(24px); opacity: 1; }
  }

  @keyframes sunBreath {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HorizonBackground = ({ theme, isMotionActive }) => {
  const isDark = theme === 'dark';
  const skyTop = isDark ? '#16012c' : '#F3FAFC';
  const skyBottom = isDark ? '#2b1055' : '#E7F2F6';
  const shore = isDark ? '#1b0a2d' : '#DCEBF0';
  const sea = isDark ? '#210b37' : '#EAF4F7';
  const rimStart = isDark ? '#ff1b6b' : '#086F83';
  const rimEnd = isDark ? '#ff9966' : '#B82B70';
  const sunTop = isDark ? '#ff1b6b' : '#B82B70';
  const sunBottom = isDark ? '#ff9966' : '#F0A28D';
  const reflection = isDark ? '#ff5d9b' : '#087D91';

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
          <linearGradient id='horizon-light-neon' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='#35D9E8' stopOpacity='0.25' />
            <stop offset='50%' stopColor='#FF42B0' />
            <stop offset='100%' stopColor='#35D9E8' stopOpacity='0.25' />
          </linearGradient>
          <linearGradient id='horizon-sunset' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={sunTop} />
            <stop offset='100%' stopColor={sunBottom} />
          </linearGradient>
          <linearGradient id='horizon-reflection' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor={reflection} stopOpacity='0' />
            <stop offset='50%' stopColor={reflection} stopOpacity={isDark ? '0.5' : '0.38'} />
            <stop offset='100%' stopColor={reflection} stopOpacity='0' />
          </linearGradient>
          <radialGradient id='horizon-halo' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor={isDark ? '#ff1b6b' : '#FF42B0'} stopOpacity={isDark ? '0.16' : '0.3'} />
            <stop offset='100%' stopColor={isDark ? '#ff1b6b' : '#F0A7B9'} stopOpacity='0' />
          </radialGradient>
          <clipPath id='sunset-disc'>
            <circle cx='720' cy='710' r='132' />
          </clipPath>
          <linearGradient id='horizon-sea' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={sea} />
            <stop offset='100%' stopColor={isDark ? '#160526' : '#DCEEF3'} />
          </linearGradient>
        </defs>

        <rect width='1440' height='900' fill='url(#horizon-sky)' />
        <g className='horizon-composition'>
          <HorizonMotion $kind='sun' $active={isMotionActive}>
            <ellipse cx='720' cy='710' rx='360' ry='185' fill='url(#horizon-halo)' />
          </HorizonMotion>
          <circle cx='720' cy='710' r='132' fill='url(#horizon-sunset)' />
          <g clipPath='url(#sunset-disc)' stroke={skyTop} strokeWidth='8' opacity='0.74'>
            <path d='M 560 640 H 880 M 550 665 H 890 M 545 690 H 895 M 545 715 H 895 M 550 740 H 890 M 560 765 H 880 M 580 790 H 860' />
          </g>
          <path d='M -100 720 C 280 652 1160 652 1540 720 V 920 H -100 Z' fill='url(#horizon-sea)' />
          <HorizonMotion $kind='reflection' $active={isMotionActive}>
            <ellipse cx='720' cy='770' rx='340' ry='24' fill='url(#horizon-reflection)' />
            <path d='M 520 795 C 610 786 830 786 920 795 M 585 818 C 660 810 780 810 855 818 M 645 839 C 690 835 750 835 795 839' fill='none' stroke='url(#horizon-reflection)' strokeWidth='6' />
          </HorizonMotion>
          <path d='M -80 762 L 105 781 L 248 778 L 365 756 L 493 730 L 630 710 L 662 719 L 585 920 H -100 Z' fill={shore} />
          <path d='M 1520 752 L 1332 762 L 1187 774 L 1058 750 L 940 728 L 825 712 L 790 721 L 862 920 H 1540 Z' fill={shore} />
          {!isDark && (
            <g fill='none' stroke='url(#horizon-light-neon)' strokeLinecap='round'>
              <path d='M -80 762 L 105 781 L 248 778 L 365 756 L 493 730 L 630 710 L 662 719 M 1520 752 L 1332 762 L 1187 774 L 1058 750 L 940 728 L 825 712 L 790 721' strokeWidth='16' opacity='0.1' />
              <path d='M -80 762 L 105 781 L 248 778 L 365 756 L 493 730 L 630 710 L 662 719 M 1520 752 L 1332 762 L 1187 774 L 1058 750 L 940 728 L 825 712 L 790 721' strokeWidth='8' opacity='0.18' />
            </g>
          )}
          <path d='M -80 762 L 105 781 L 248 778 L 365 756 L 493 730 L 630 710 L 662 719 M 1520 752 L 1332 762 L 1187 774 L 1058 750 L 940 728 L 825 712 L 790 721' fill='none' stroke='url(#horizon-rim)' strokeWidth='4' />
          <HorizonGlow
            $active={isMotionActive}
            d='M 493 730 L 630 710 M 940 728 L 825 712'
            fill='none'
            stroke='url(#horizon-rim)'
            strokeWidth='2'
          />
        </g>
      </svg>
    </Artwork>
  );
};

export default HorizonBackground;

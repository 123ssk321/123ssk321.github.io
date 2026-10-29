import React from 'react';
import styled from 'styled-components';

const Artwork = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  img {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1.35);
    transform-origin: 0% 30%;
    user-select: none;
  }

  @media (max-width: 768px) {
    img {
      inset: 40% 0 0;
      height: 60%;
      transform: none;
      object-position: 50% 50%;
      mask-image: linear-gradient(to bottom, transparent 0%, black 25%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%);
    }
  }
`;

const HorizonBackground = ({ theme }) => (
  <Artwork aria-hidden='true'>
    <img
      key={theme}
      src={theme === 'light' ? '/images/neon-shore-light-v4.webp' : '/images/neon-shore-v3.webp'}
      alt=''
      aria-hidden='true'
      draggable='false'
    />
  </Artwork>
);

export default HorizonBackground;

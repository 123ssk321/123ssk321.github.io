import React from 'react';
import styled from 'styled-components';
import SunsetCanvas from './SunsetCanvas';

const Artwork = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;

  img,
  canvas {
    display: block;
    position: absolute;
    top: 46%;
    left: 0;
    width: 100%;
    height: 54%;
    mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 100%);
  }

  img {
    object-fit: cover;
    object-position: center;
  }

  canvas {
    opacity: 0;
    transition: opacity 180ms ease-out;
  }

  canvas[data-ready='true'] {
    opacity: 1;
  }

  @media (max-width: 768px) {
    img,
    canvas {
      top: auto;
      bottom: 0;
      height: max(38vh, 340px);
      max-height: none;
      mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 100%);
    }
  }
`;

const HorizonBackground = ({ isMotionActive }) => (
  <Artwork aria-hidden='true'>
    <SunsetCanvas isMotionActive={isMotionActive} />
  </Artwork>
);

export default HorizonBackground;

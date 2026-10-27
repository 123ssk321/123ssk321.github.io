import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 44px;
  margin-top: 1.5rem;
  padding: 0 1.35rem;
  overflow: hidden;
  border: 1px solid ${(props) => (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.78)' : 'rgba(8, 111, 131, 0.28)')};
  border-radius: 9999px;
  background: ${(props) => (props.theme === 'dark' ? 'rgba(248, 245, 244, 0.88)' : '#FFFFFF')};
  box-shadow: 12px 0 25px rgba(255, 174, 145, 0.16);
  color: ${(props) => (props.theme === 'dark' ? '#382333' : '#086F83')};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  transition: box-shadow 500ms ease, border-color 500ms ease;

  &::before {
    position: absolute;
    z-index: 0;
    inset: -70% -30%;
    background: radial-gradient(ellipse at 76% 50%, rgba(255, 205, 178, 0.95), rgba(255, 205, 178, 0) 34%);
    content: '';
    transform: translateX(0);
    transition: transform 500ms ease;
  }

  > span {
    position: relative;
    z-index: 1;
  }

  &:focus-visible::before {
    transform: translateX(-22%);
  }

  &:focus-visible {
    box-shadow: 2px 0 18px rgba(255, 174, 145, 0.08);
  }

  @media (hover: hover) {
    &:hover::before {
      transform: translateX(-22%);
    }

    &:hover {
      box-shadow: 2px 0 18px rgba(255, 174, 145, 0.08);
    }
  }

  &:focus-visible {
    outline: 3px solid ${(props) => (props.theme === 'dark' ? '#ff9966' : '#B82B70')};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      transition: none;
    }

    &:hover::before,
    &:focus-visible::before {
      transform: translateX(0);
    }
  }
`;

const ActionButton = ({ theme }) => (
  <Link theme={theme} href='#projects'>
    <span>See my work <span aria-hidden='true'>→</span></span>
  </Link>
);

export default ActionButton;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
import HorizonBackground from './HorizonBackground';
import { useTheme } from '../../styles/ThemeContext';

const HeroContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  background: var(--color-hero-bg);
  color: var(--color-text-primary);

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 62% 88% at 14% 45%, color-mix(in srgb, var(--color-bg-primary) 64%, transparent) 0%, color-mix(in srgb, var(--color-bg-primary) 46%, transparent) 48%, transparent 100%),
      linear-gradient(90deg, color-mix(in srgb, var(--color-bg-primary) 32%, transparent), transparent 68%);
  }

  @media (max-width: 768px) {
    &::before {
      background:
        radial-gradient(ellipse 88% 48% at 50% 25%, color-mix(in srgb, var(--color-bg-primary) 46%, transparent) 0%, color-mix(in srgb, var(--color-bg-primary) 28%, transparent) 56%, transparent 100%),
        linear-gradient(180deg, color-mix(in srgb, var(--color-bg-primary) 28%, transparent), transparent 58%);
    }
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent, var(--color-bg-primary));
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    min-height: 100vh;
    min-height: 100svh;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  width: min(100% - 2 * clamp(1.5rem, 8vw, 8rem), 1320px);
  margin: 0 auto;
  padding-top: clamp(7.25rem, 17vh, 10rem);
  padding-bottom: 8rem;
  text-align: left;

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    margin-top: clamp(5.7rem, 13vh, 7.2rem);
    padding: 1.25rem 0 0;
    text-align: center;

  }
`;

const Title = styled(motion.h1)`
  max-width: 600px;
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.035em;
  margin: 0 0 1rem;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    max-width: 560px;
    margin: 0 auto 0.8rem;
    font-size: clamp(2.15rem, 9vw, 2.8rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 1.7vw, 1.5rem);
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 520px;

  @media (max-width: 768px) {
    max-width: 560px;
    margin: 0 auto;
    font-size: 1.05rem;
    line-height: 1.5;
  }
`;

const HeroSocialLinks = styled(SocialLinks)`
  justify-content: flex-start;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 1.25rem;
  }
`;

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);
    if (query.addEventListener) query.addEventListener('change', updatePreference);
    else query.addListener(updatePreference);
    return () => {
      if (query.removeEventListener) query.removeEventListener('change', updatePreference);
      else query.removeListener(updatePreference);
    };
  }, []);

  return prefersReducedMotion;
};

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => (
    typeof document !== 'undefined' && !document.hidden
  ));
  const isMotionActive = isHeroVisible && isDocumentVisible && !prefersReducedMotion;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
    });
    const updateDocumentVisibility = () => setIsDocumentVisible(!document.hidden);

    observer.observe(hero);
    document.addEventListener('visibilitychange', updateDocumentVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateDocumentVisibility);
    };
  }, []);

  return (
    <HeroContainer
      ref={heroRef}
      theme={theme}
      id='hero'
      data-motion-active={isMotionActive}
    >
      <HorizonBackground theme={theme} />
      <Content>
        <Title
          theme={theme}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Hello, I'm Sahil Kumar
        </Title>

        <Subtitle
          theme={theme}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          An AI Engineer | Data Scientist | Software Engineer passionate about solving problems. Always learning, always evolving.
        </Subtitle>

        <HeroSocialLinks theme={theme} />
      </Content>
    </HeroContainer>
  );
};

export default Hero;

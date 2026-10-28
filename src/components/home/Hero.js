import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
import HorizonBackground from './HorizonBackground';
import ActionButton from './ActionButton';
import { useTheme } from '../../styles/ThemeContext';

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background:var(--color-hero-bg);

  @media (max-width: 768px) {
    min-height: max(100vh, 900px);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  transform: translateY(-20vh);

  @media (max-width: 768px) {
    transform: translateY(-6vh);
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

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden);
  const isMotionActive = isHeroVisible && isDocumentVisible && !prefersReducedMotion;

  useEffect(() => {
    const hero = heroRef.current;
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
    <HeroContainer ref={heroRef} theme={theme} id='hero' data-motion-active={isMotionActive}>
      <HorizonBackground theme={theme} isMotionActive={isMotionActive} />
      <Content>
        <Title
          theme={theme}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        >
          Hello, I'm Sahil Kumar
        </Title>

        <Subtitle
          theme={theme}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          An AI Engineer | Data Scientist | Software Engineer passionate about
          solving problems <br />
          Always learning, always evolving
        </Subtitle>

        <SocialLinks theme={theme} />
        <ActionButton theme={theme} />
      </Content>
    </HeroContainer>
  );
};

export default Hero;

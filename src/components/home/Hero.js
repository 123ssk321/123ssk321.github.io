import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
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
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

const SkyGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--color-hero-sky);
  opacity: ${(props) => (props.theme === 'dark' ? 0.8 : 0.9)};
`;

const Mountains = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: var(--color-hero-mountains);
  clip-path: polygon(
    0% 100%,
    15% 65%,
    30% 85%,
    45% 55%,
    60% 80%,
    75% 45%,
    90% 70%,
    100% 35%,
    100% 100%
  );
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: var(--color-hero-mountains-after);
    clip-path: polygon(
      0% 100%,
      20% 75%,
      35% 90%,
      50% 70%,
      65% 85%,
      80% 60%,
      95% 75%,
      100% 45%,
      100% 100%
    );
  }
`;

const Sun = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: var(--color-hero-sun);
  border-radius: 50%;
  z-index: 1;
`;

const Grid = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-image: var(--color-hero-grid);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 40px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

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

  return (
    <HeroContainer theme={theme} id='hero'>
      <Background>
        <SkyGradient theme={theme} />
        <Sun
          theme={theme}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <Mountains theme={theme} />
        <Grid theme={theme} />
      </Background>
      <Content>
        <Title
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hello, I'm Sahil Kumar
        </Title>

        <Subtitle
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          An AI Engineer | Data Scientist | Software Engineer passionate about
          solving problems <br />
          Always learning, always evolving
        </Subtitle>

        <SocialLinks theme={theme} />
      </Content>
    </HeroContainer>
  );
};

export default Hero;

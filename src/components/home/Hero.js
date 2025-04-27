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
  background: ${props => props.theme === 'dark' ? '#16012c' : '#f0f7ff'};
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
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(180deg, #2b1055 0%, #7597de 60%, #ff1b6b 85%, #ff9966 100%)'
    : 'linear-gradient(180deg, #87CEEB 0%, #B5D8F7 60%, #FFB6C1 85%, #FFF0F5 100%)'};
  opacity: ${props => props.theme === 'dark' ? 0.8 : 0.9};
`;

const Mountains = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(-5deg, #1a0f2e 0%, #31165e 30%, #4b2395 60%, #6b30cc 100%)'
    : 'linear-gradient(-5deg, #a4c2f4 0%, #8ab4f8 30%, #709fee 60%, #5686e1 100%)'};
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
    background: ${props => props.theme === 'dark'
    ? 'linear-gradient(-5deg, #130b22 0%, #251147 30%, #371b72 60%, #4b249e 100%)'
    : 'linear-gradient(-5deg, #8ab4f8 0%, #709fee 30%, #5686e1 60%, #4072c4 100%)'};
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
  background: ${props => props.theme === 'dark'
    ? 'radial-gradient(circle, rgba(255, 99, 177, 1) 0%, rgba(255, 99, 177, 0.8) 50%, rgba(255, 99, 177, 0) 100%)'
    : 'radial-gradient(circle, rgba(255, 182, 193, 1) 0%, rgba(255, 182, 193, 0.8) 50%, rgba(255, 182, 193, 0) 100%)'};
  border-radius: 50%;
  z-index: 1;
`;

const Grid = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-image: ${props => props.theme === 'dark'
    ? `linear-gradient(0deg, rgba(255, 27, 107, 0.2) 1px, transparent 1px),
       linear-gradient(90deg, rgba(255, 27, 107, 0.2) 1px, transparent 1px)`
    : `linear-gradient(0deg, rgba(106, 154, 238, 0.2) 1px, transparent 1px),
       linear-gradient(90deg, rgba(106, 154, 238, 0.2) 1px, transparent 1px)`};
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
  color: ${props => props.theme === 'dark' ? '#fff' : '#2d3748'};
  text-shadow: ${props => props.theme === 'dark'
    ? '0 0 20px rgba(255, 27, 107, 0.5), 0 0 40px rgba(255, 27, 107, 0.3), 0 0 60px rgba(255, 27, 107, 0.2)'
    : '0 0 20px rgba(106, 154, 238, 0.5), 0 0 40px rgba(106, 154, 238, 0.3), 0 0 60px rgba(106, 154, 238, 0.2)'};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#fff' : '#4a5568'};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: ${props => props.theme === 'dark'
    ? '0 0 10px rgba(255, 27, 107, 0.3)'
    : '0 0 10px rgba(106, 154, 238, 0.3)'};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hero = () => {
  const { theme } = useTheme();

  return (
    <HeroContainer theme={theme} id="hero">
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
            ease: "easeInOut"
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
          Hello, I'm [Your Name]
        </Title>

        <Subtitle
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A Full Stack Developer passionate about creating seamless digital experiences
        </Subtitle>

        <SocialLinks theme={theme} />
      </Content>
    </HeroContainer>
  );
};

export default Hero; 
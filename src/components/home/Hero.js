import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme === 'dark' ? '#0a0a0a' : '#f8f9fa'};
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

const AnimatedGradient = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  background: ${props => props.theme === 'dark'
        ? 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
        : 'radial-gradient(circle at center, rgba(0, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
    };
  transform-origin: center;
`;

const PlanetEdge = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: ${props => props.theme === 'dark'
        ? 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)'
        : 'linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent)'
    };
  z-index: 2;
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
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: ${props => props.theme === 'dark'
        ? 'linear-gradient(90deg, #00ffff, #ff00ff)'
        : 'linear-gradient(90deg, #0066ff, #ff00ff)'
    };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hero = ({ theme }) => {
    const gradientRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (gradientRef.current) {
                const { clientX, clientY } = e;
                const { width, height } = gradientRef.current.getBoundingClientRect();
                const x = (clientX / window.innerWidth) * 100;
                const y = (clientY / window.innerHeight) * 100;

                gradientRef.current.style.transform = `translate(${-x}%, ${-y}%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <HeroContainer theme={theme}>
            <Background>
                <AnimatedGradient
                    ref={gradientRef}
                    theme={theme}
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <PlanetEdge
                    theme={theme}
                    animate={{
                        height: ['40%', '45%', '40%'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
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
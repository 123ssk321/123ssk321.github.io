import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/ThemeContext';


const gradients = {
  blue: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
  purple: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  orange: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
  green: 'linear-gradient(135deg, #00B09B 0%, #96C93D 100%)',
  pink: 'linear-gradient(135deg, #FF61D2 0%, #FE9090 100%)'
};

const getGradient = (index) => {
  const gradientKeys = Object.keys(gradients);
  return gradients[gradientKeys[index % gradientKeys.length]];
};

const Card = styled(motion.div)`
  position: relative;
  background: ${props => props.theme === 'dark' ? '#1A1A1A' : '#f4f4f5'};
  border-radius: 16px;
  aspect-ratio: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: ${props => props.gradient};
    border-radius: 16px;
    z-index: -1;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'dark' ? '#1A1A1A' : '#f4f4f5'};
    border-radius: 15px;
    z-index: -1;
    transition: background-color 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    
    &::before {
      opacity: 1;
    }

    &::after {
      background: ${props => props.theme === 'dark' ? '#000000' : '#ffffff'};
    }

    box-shadow: 0 4px 20px ${props => {
    const gradientColor = props.gradient.match(/#[A-Fa-f0-9]{6}/g)[0] + '40';
    return gradientColor;
  }};
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  opacity: 0.9;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 2rem;
  height: 2rem;

  ${Card}:hover & {
    transform: scale(1.1);
    opacity: 1;
  }

  .mono-icon {
    position: absolute;
    transition: opacity 0.3s ease;
    opacity: ${props => props.isHovered ? 0 : 1};
    width: 2rem;
    height: 2rem;
  }

  .color-icon {
    position: absolute;
    transition: opacity 0.3s ease;
    opacity: ${props => props.isHovered ? 1 : 0};
    width: 2rem;
    height: 2rem;
  }
`;

const SkillName = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
  text-align: center;
  opacity: 0.9;
  transition: all 0.3s ease;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  ${Card}:hover & {
    opacity: 1;
  }
`;

const HardSkillCard = ({ skill, index }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const MonoIcon = skill.monoIcon;
  const gradient = getGradient(index);

  return (
    <Card
      theme={theme}
      gradient={gradient}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(skill.url)}
    >
      <IconWrapper theme={theme} isHovered={isHovered}>
        <div className="mono-icon">
          <MonoIcon />
        </div>
        <img
          src={skill.colorIcon}
          alt={skill.name}
          className="color-icon"
          loading="lazy"
        />
      </IconWrapper>
      <SkillName theme={theme}>{skill.name}</SkillName>
    </Card>
  );
};

export default HardSkillCard; 
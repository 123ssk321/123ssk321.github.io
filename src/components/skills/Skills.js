import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HardSkillCard from './HardSkillCard';
import SoftSkillCard from './SoftSkillCard';
import Section from '../layout/Section';
import { skillsData } from '../../data/skills';
import { useTheme } from '../../styles/ThemeContext';

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const TabButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  background: ${props => props.active
    ? props.theme === 'dark'
      ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
      : '#FF6B6B'
    : props.theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : '#F1F5F9'
  };
  color: ${props => props.active ? 'white' : 'inherit'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark'
    ? '0 4px 12px rgba(255, 255, 255, 0.1)'
    : '0 4px 12px rgba(0, 0, 0, 0.1)'
  };
  }
`;

const SkillsGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  &.soft-skills {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    gap: 1rem;

    &.soft-skills {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const HardSkillWrapper = styled.div`
  width: 120px;
  
  @media (max-width: 768px) {
    width: 110px;
  }
`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('aiDataScience');
  const { theme } = useTheme();

  const categories = {
    aiDataScience: 'AI & Data Science',
    softwareEngineering: 'Software Engineering',
    softSkills: 'Soft Skills'
  };

  const getCurrentSkills = () => {
    return skillsData[activeCategory] || [];
  };

  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      showSubtitle={false}
    >
      <CategoryTabs>
        {Object.entries(categories).map(([key, label]) => (
          <TabButton
            key={key}
            active={activeCategory === key}
            theme={theme}
            onClick={() => setActiveCategory(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </TabButton>
        ))}
      </CategoryTabs>

      <AnimatePresence mode="wait">
        <SkillsGrid
          key={activeCategory}
          className={activeCategory === 'softSkills' ? 'soft-skills' : ''}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentSkills().map((skill, index) => (
            activeCategory === 'softSkills' ? (
              <SoftSkillCard key={skill.name} skill={skill} />
            ) : (
              <HardSkillWrapper key={skill.name}>
                <HardSkillCard skill={skill} index={index} />
              </HardSkillWrapper>
            )
          ))}
        </SkillsGrid>
      </AnimatePresence>
    </Section>
  );
};

export default Skills;

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HardSkillCard from './HardSkillCard';
import SoftSkillCard from './SoftSkillCard';
import { skillsData } from '../../data/skills';

const SkillsSection = styled.section`
  padding: var(--section-padding) 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text-primary);
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-full);
  background: ${props => props.active ? 'var(--color-text-primary)' : 'var(--color-bg-secondary)'};
  color: ${props => props.active ? 'var(--color-bg-primary)' : 'var(--color-text-primary)'};
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-2px);
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

  const categories = {
    aiDataScience: 'AI & Data Science',
    softwareEngineering: 'Software Engineering',
    softSkills: 'Soft Skills'
  };

  const getCurrentSkills = () => {
    return skillsData[activeCategory] || [];
  };

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </SectionTitle>

        <CategoryTabs>
          {Object.entries(categories).map(([key, label]) => (
            <TabButton
              key={key}
              active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
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
      </Container>
    </SkillsSection>
  );
};

export default Skills;

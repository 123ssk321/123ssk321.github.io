import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {getCurrentSkills().map((skill, index) => (
                            <SkillCard
                                key={skill.name}
                                skill={skill}
                                isSoftSkill={activeCategory === 'softSkills'}
                            />
                        ))}
                    </SkillsGrid>
                </AnimatePresence>
            </Container>
        </SkillsSection>
    );
};

export default Skills;

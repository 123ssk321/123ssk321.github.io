import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Card = styled(motion.div)`
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: all var(--transition-medium);
  border: 1px solid var(--color-border);
  box-shadow: ${props => props.theme === 'dark'
        ? '0 4px 8px rgba(255, 255, 255, 0.05)'
        : 'none'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark'
        ? `0 10px 20px rgba(255, 255, 255, 0.1),
       0 5px 12px rgba(255, 255, 255, 0.08),
       0 3px 6px rgba(255, 255, 255, 0.06)`
        : '0 10px 20px rgba(0, 0, 0, 0.1)'};
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const SkillName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
`;

const Description = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const StrengthsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
`;

const StrengthItem = styled.li`
  display: inline-block;
  background: var(--color-bg-primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  margin: 0.25rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`;

const SoftSkillCard = ({ skill }) => {
    const { theme } = useTheme();
    const Icon = skill.icon;

    return (
        <Card
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <IconWrapper>
                <Icon />
            </IconWrapper>
            <SkillName>{skill.name}</SkillName>
            <Description>{skill.description}</Description>
            {skill.strengths && (
                <StrengthsList>
                    {skill.strengths.map((strength, index) => (
                        <StrengthItem key={index}>{strength}</StrengthItem>
                    ))}
                </StrengthsList>
            )}
        </Card>
    );
};

export default SoftSkillCard; 
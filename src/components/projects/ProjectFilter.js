import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/ThemeContext';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  background: ${props => props.isActive
        ? props.theme === 'dark'
            ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
            : '#FF6B6B'
        : props.theme === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : '#F1F5F9'
    };
  color: ${props => props.isActive ? 'white' : 'inherit'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark'
        ? '0 4px 12px rgba(255, 255, 255, 0.1)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)'
    };
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 1.2rem;
  }
`;

const ProjectFilter = ({ activeFilter, setActiveFilter }) => {
    const { theme } = useTheme();

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'AI/ML', label: 'AI/ML' },
        { id: 'Data Science', label: 'Data Science' },
        { id: 'Software Engineering', label: 'Software' },
        { id: 'Finance', label: 'Finance' }
    ];

    return (
        <FilterContainer>
            {filters.map(filter => (
                <FilterButton
                    key={filter.id}
                    isActive={activeFilter === filter.id}
                    theme={theme}
                    onClick={() => setActiveFilter(filter.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </FilterContainer>
    );
};

export default ProjectFilter;

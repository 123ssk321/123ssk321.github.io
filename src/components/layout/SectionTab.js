import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const Tab = styled(motion.button)`
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

const SectionTab = ({ isActive, theme, onClick, children, ...props }) => {
    return (
        <Tab
            isActive={isActive}
            theme={theme}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </Tab>
    );
};

export default SectionTab; 
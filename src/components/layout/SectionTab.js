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
  background: ${(props) =>
    props.isActive
      ? 'var(--color-section-tab-active)'
      : 'var(--color-section-tab)'};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-section-tab-shadow);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
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

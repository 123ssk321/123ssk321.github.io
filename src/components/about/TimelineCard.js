import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(18, 24, 38, 0.03)'
    };
  border: 1px solid ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(18, 24, 38, 0.1)'
    };
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  width: 100%;
  cursor: pointer;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark'
        ? '0 10px 20px rgba(0, 0, 0, 0.3)'
        : '0 10px 20px rgba(0, 0, 0, 0.1)'
    };
    border-color: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(18, 24, 38, 0.2)'
    };
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
`;

const CardDate = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: block;
`;

const CardGrade = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#FFE66D' : '#FF6B6B'};
  font-weight: 500;
  display: block;
  margin-top: 0.25rem;
`;

const TimelineCard = ({ item, theme, onClick }) => {
    return (
        <Card
            theme={theme}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <CardTitle>{item.title}</CardTitle>
            <CardSubtitle>{item.subtitle}</CardSubtitle>
            <CardDate>{item.date}</CardDate>
            {item.grade && <CardGrade theme={theme}>{item.grade}</CardGrade>}
        </Card>
    );
};

export default TimelineCard;

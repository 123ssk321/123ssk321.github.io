import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineCard from './TimelineCard';

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-bottom: 4rem;
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  padding: ${props => props.align === 'left' ? '0 50% 0 0' : '0 0 0 50%'};
  padding-${props => props.align === 'left' ? 'right' : 'left'}: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme === 'dark'
    ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
    : '#FF6B6B'
  };
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: 0 0 0 2rem;
    justify-content: flex-start;

    &::before {
      left: 0;
      transform: translateY(-50%);
    }
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Timeline = ({ items, theme, onCardClick }) => {
  return (
    <TimelineContainer theme={theme}>
      <AnimatePresence mode="wait">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            theme={theme}
            align={index % 2 === 0 ? 'left' : 'right'}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            transition={{ duration: 0.5 }}
          >
            <CardWrapper>
              <TimelineCard
                item={item}
                theme={theme}
                onClick={() => onCardClick(item)}
              />
            </CardWrapper>
          </TimelineItem>
        ))}
      </AnimatePresence>
    </TimelineContainer>
  );
};

export default Timeline;
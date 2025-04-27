import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

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
  overflow: hidden;
  position: relative;

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

const CardContent = styled.div`
  padding-${props => props.align === 'left' ? 'right' : 'left'}: 2.5rem; /* Add space for the expand icon */
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

const ExpandIcon = styled(motion.div)`
  position: absolute;
  top: 1.5rem;
  ${props => props.align === 'left' ? 'right: 1.5rem' : 'left: 1.5rem'};
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    right: 1.5rem;
  }
`;

const CardDetails = styled(motion.div)`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(18, 24, 38, 0.1)'
  };
  color: var(--color-text-secondary);
  line-height: 1.6;
  will-change: transform, opacity;
`;

const TimelineCard = ({ item, theme, align = 'left' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      theme={theme}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ExpandIcon
        align={align}
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown size={20} />
      </ExpandIcon>

      <CardContent align={align}>
        <CardTitle>{item.title}</CardTitle>
        <CardSubtitle>{item.subtitle}</CardSubtitle>
        <CardDate>{item.date}</CardDate>
        {item.grade && <CardGrade theme={theme}>{item.grade}</CardGrade>}

        <AnimatePresence>
          {isExpanded && (
            <CardDetails
              theme={theme}
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.5,
                opacity: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
            >
              {item.details}
            </CardDetails>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;

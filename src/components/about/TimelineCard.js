import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import {
  MdSchool,
  MdLocationOn,
  MdCalendarToday,
  MdGrade,
  MdBusinessCenter,
  MdVolunteerActivism,
} from 'react-icons/md';

const Card = styled(motion.div)`
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  width: 100%;
  cursor: pointer;
  transition: all var(--transition-medium);
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--color-card-shadow);
    border-color: var(--color-border-hover);
  }
`;

const CardContent = styled.div`
  padding-right: 2.5rem; /* Add space for the expand icon */
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
  text-align: left;
`;

const CardSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const SubtitleItem = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
    color: var(--color-card-icon);
  }
`;

const CardDate = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
    color: var(--color-card-icon);
  }
`;

const CardGrade = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-accent);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;

  svg {
    font-size: 1.2rem;
    color: var(--color-card-icon);
  }
`;

const ExpandIcon = styled(motion.div)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
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
  border-top: 1px solid var(--color-text-primary);
  color: var(--color-text-secondary);
  line-height: 1.6;
  will-change: transform, opacity;
  text-align: left;
  align-items: flex-start;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    align-items: flex-start;
  }

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: left;
    align-items: flex-start;

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--color-card-icon);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TimelineCard = ({ item, theme, align = 'left', type }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      theme={theme}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ExpandIcon
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown size={20} />
      </ExpandIcon>

      <CardContent align={align}>
        <CardTitle>{item.title}</CardTitle>
        <CardSubtitle>
          <SubtitleItem theme={theme}>
            {type === 'education' && <MdSchool />}
            {type === 'work' && <MdBusinessCenter />}
            {type === 'extracurricular' && <MdBusinessCenter />}
            {item.institution}
          </SubtitleItem>
          <SubtitleItem theme={theme}>
            <MdLocationOn />
            {item.country}
          </SubtitleItem>
        </CardSubtitle>
        <CardDate theme={theme}>
          <MdCalendarToday />
          {item.date}
        </CardDate>
        {item.grade && (
          <CardGrade theme={theme}>
            <MdGrade />
            {item.grade}
          </CardGrade>
        )}

        <AnimatePresence>
          {isExpanded && (
            <CardDetails
              theme={theme}
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                mass: 0.5,
                opacity: {
                  duration: 0.2,
                  ease: 'easeOut',
                },
              }}
            >
              <ul>
                {item.details.split('\n').map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </CardDetails>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeContext';
import Section from '../layout/Section';
import Timeline from './Timeline';
import TimelinePopup from './TimelinePopup';
import { educationData, workData, extracurricularData } from '../../data/timeline';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
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
`;

const About = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('education');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const options = {
      threshold: 0.2
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting && selectedItem) {
          setSelectedItem(null);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    const aboutSection = document.getElementById('about');

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, [selectedItem]);

  const getData = () => {
    switch (activeTab) {
      case 'education':
        return educationData;
      case 'work':
        return workData;
      case 'extracurricular':
        return extracurricularData;
      default:
        return [];
    }
  };

  const handleCardClick = (item) => {
    if (isVisible) {
      setSelectedItem(item);
    }
  };

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="I'm a passionate developer with a love for creating elegant solutions to complex problems. With expertise in modern web technologies, I strive to build responsive and user-friendly applications."
    >
      <TabContainer>
        <Tab
          theme={theme}
          isActive={activeTab === 'education'}
          onClick={() => setActiveTab('education')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Education
        </Tab>
        <Tab
          theme={theme}
          isActive={activeTab === 'work'}
          onClick={() => setActiveTab('work')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Work
        </Tab>
        <Tab
          theme={theme}
          isActive={activeTab === 'extracurricular'}
          onClick={() => setActiveTab('extracurricular')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Extracurricular
        </Tab>
      </TabContainer>

      <Timeline items={getData()} theme={theme} onCardClick={handleCardClick} />

      <AnimatePresence>
        {selectedItem && isVisible && (
          <TimelinePopup
            item={selectedItem}
            theme={theme}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeContext';
import Section from '../layout/Section';
import SectionTab, { TabContainer } from '../layout/SectionTab';
import Timeline from './Timeline';
import TimelinePopup from './TimelinePopup';
import { educationData, workData, extracurricularData } from '../../data/timeline';

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
        <SectionTab
          theme={theme}
          isActive={activeTab === 'education'}
          onClick={() => setActiveTab('education')}
        >
          Education
        </SectionTab>
        <SectionTab
          theme={theme}
          isActive={activeTab === 'work'}
          onClick={() => setActiveTab('work')}
        >
          Work
        </SectionTab>
        <SectionTab
          theme={theme}
          isActive={activeTab === 'extracurricular'}
          onClick={() => setActiveTab('extracurricular')}
        >
          Extracurricular
        </SectionTab>
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

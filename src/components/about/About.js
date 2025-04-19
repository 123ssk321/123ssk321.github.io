import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import Timeline from './Timeline';
import TimelinePopup from './TimelinePopup';
import { educationData, workData, extracurricularData } from '../../data/timeline';

const AboutSection = styled.section`
  padding: var(--section-padding) 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
    : 'none'};
  -webkit-background-clip: ${props => props.theme === 'dark' ? 'text' : 'none'};
  -webkit-text-fill-color: ${props => props.theme === 'dark' ? 'transparent' : 'inherit'};
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Tabs = styled.div`
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

const Card = styled(motion.div)`
  background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.03)'
    : 'white'
  };
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark'
    ? '0 10px 20px rgba(0, 0, 0, 0.3)'
    : '0 10px 20px rgba(0, 0, 0, 0.1)'
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
`;

const Popup = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background: ${props => props.theme === 'dark'
    ? 'rgba(0, 0, 0, 0.9)'
    : 'white'
  };
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: ${props => props.theme === 'dark'
    ? '0 20px 40px rgba(0, 0, 0, 0.5)'
    : '0 20px 40px rgba(0, 0, 0, 0.1)'
  };

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.2)'
  };
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(0, 0, 0, 0.3)'
  };
    }
  }
`;

const PopupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const PopupSubtitle = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
`;

const PopupDate = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`;

const PopupContent = styled.div`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-medium);

  &:hover {
    background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark'
    ? 'rgba(0, 0, 0, 0.8)'
    : 'rgba(0, 0, 0, 0.5)'
  };
  z-index: 999;
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
    <AboutSection id="about" theme={theme}>
      <Container>
        <Title
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </Title>
        <Subtitle>
          I'm a passionate developer with a love for creating elegant solutions to complex problems. With expertise in modern web technologies, I strive to build responsive and user-friendly applications.
        </Subtitle>
        <Tabs>
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
        </Tabs>

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
      </Container>
    </AboutSection>
  );
};

export default About;

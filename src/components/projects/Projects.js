import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { useTheme } from '../../styles/ThemeContext';
import projects from '../../data/projects';

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ShowMoreButton = styled(motion.button)`
  display: block;
  margin: 3rem auto;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : '#F1F5F9'
    };
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : '#E2E8F0'
    };
  }
`;

const Projects = () => {
    const { theme } = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [showButton, setShowButton] = useState(false);

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const displayedProjects = filteredProjects.slice(0, visibleProjects);
    const hasMoreProjects = filteredProjects.length > visibleProjects;

    const handleShowMore = () => {
        setVisibleProjects(prev => prev + 6);
    };

    // Reset visible projects when filter changes
    useEffect(() => {
        setVisibleProjects(6);
        setShowButton(false);

        // Only show button if there are more projects to show
        if (filteredProjects.length > 6) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [activeFilter, filteredProjects.length]);

    return (
        <ProjectsSection id="projects">
            <Container>
                <Title
                    theme={theme}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </Title>
                <Subtitle>
                    A collection of projects that showcase my expertise in AI/ML, data science,
                    software engineering, and financial technology.
                </Subtitle>

                <ProjectFilter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                <AnimatePresence mode="wait">
                    <ProjectsGrid
                        key={activeFilter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {displayedProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </ProjectsGrid>
                </AnimatePresence>

                <AnimatePresence>
                    {hasMoreProjects && showButton && (
                        <ShowMoreButton
                            theme={theme}
                            onClick={handleShowMore}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Show More Projects
                        </ShowMoreButton>
                    )}
                </AnimatePresence>
            </Container>
        </ProjectsSection>
    );
};

export default Projects;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeContext';

const Card = styled(motion.div)`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'white'};
  border: 1px solid var(--color-border);
  height: 100%;
  transition: all var(--transition-medium);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark'
    ? '0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2)'
    : '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.05)'
  };
    border-color: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.1)'
  };

    .project-image {
      transform: scale(1.05);
    }
    
    .overlay {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
`;

const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-medium);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark'
    ? 'rgba(0, 0, 0, 0.7)'
    : 'rgba(255, 255, 255, 0.9)'
  };
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity var(--transition-medium);
  padding: 2rem;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tech = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : '#F1F5F9'
  };
  color: var(--color-text-secondary);
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const LinkButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? 'white' : 'inherit'};
  background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : '#F1F5F9'
  };
  text-decoration: none;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme === 'dark'
    ? 'rgba(255, 255, 255, 0.2)'
    : '#E2E8F0'
  };
  }

  svg {
    font-size: 1.1rem;
  }
`;

const Category = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
  color: white;
  z-index: 1;
`;

const ProjectCard = ({ project }) => {
  const { theme } = useTheme();

  return (
    <Card
      theme={theme}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {project.featured && <Category>Featured</Category>}
      <ImageContainer>
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="project-image"
        />
        <Overlay className="overlay" theme={theme}>
          <Description>{project.description}</Description>
          <Links>
            <LinkButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              theme={theme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub /> Source Code
            </LinkButton>
            <LinkButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              theme={theme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink /> Live Demo
            </LinkButton>
          </Links>
        </Overlay>
      </ImageContainer>
      <Content>
        <Title>{project.title}</Title>
        <Technologies>
          {project.technologies.map((tech, index) => (
            <Tech key={index} theme={theme}>{tech}</Tech>
          ))}
        </Technologies>
      </Content>
    </Card>
  );
};

export default ProjectCard;

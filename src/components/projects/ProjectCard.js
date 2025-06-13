import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../styles/ThemeContext';

const Card = styled(motion.div)`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--color-card-shadow), 0 6px 12px var(--color-card-shadow);
    border-color: var(--color-card-border-hover);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
  flex: 1;
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
  background: var(--color-project-card-tech-bg);
  color: var(--color-text-secondary);
`;

const Separator = styled.hr`
  border: none;
  height: 1px;
  background: var(--color-text-accent);
  margin: 0.5rem 0 1rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const LinkButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-project-card-link-btn-bg);
  text-decoration: none;
  transition: all var(--transition-medium);

  &:hover {
    transform: translateY(-2px);
    background: var(--color-project-card-link-btn-hover);
  }

  svg {
    font-size: 1.1rem;
  }
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
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <Technologies>
          {project.technologies.map((tech, idx) => (
            <Tech key={idx} theme={theme}>{tech}</Tech>
          ))}
        </Technologies>
        <Separator />
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
      </Content>
    </Card>
  );
};

export default ProjectCard;

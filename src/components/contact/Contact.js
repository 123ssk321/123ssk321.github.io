import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import ContactForm from './ContactForm';
import { useTheme } from '../../styles/ThemeContext';
import Section from '../layout/Section';
import SocialLinks from '../home/SocialLinks';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 500px;

  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: ${(props) =>
    props.theme === 'dark'
      ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
      : 'none'};
  -webkit-background-clip: ${(props) =>
    props.theme === 'dark' ? 'text' : 'none'};
  -webkit-text-fill-color: ${(props) =>
    props.theme === 'dark' ? 'transparent' : 'inherit'};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
`;

const SocialLinkss = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.theme === 'dark' ? '#00ffff' : '#0066ff')};
  }
`;

const FormWrapper = styled(motion.div)`
  background: ${(props) =>
    props.theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'white'};
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: ${(props) =>
    props.theme === 'dark'
      ? '0 4px 20px rgba(255, 255, 255, 0.05)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  border: 1px solid var(--color-border);
`;

const Contact = () => {
  const { theme } = useTheme();

  return (
    <Section id='contact' showTitle={false} showSubtitle={false}>
      <Grid>
        <ContentWrapper>
          <Title
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Work Together
          </Title>
          <Description>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out
            through the form or via social media.
          </Description>
          <SocialLinks theme={theme} />
        </ContentWrapper>
        <FormWrapper
          theme={theme}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </FormWrapper>
      </Grid>
    </Section>
  );
};

export default Contact;

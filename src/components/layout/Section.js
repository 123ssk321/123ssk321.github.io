import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/ThemeContext';

const StyledSection = styled.section`
  padding: var(--section-padding) 0;
  min-height: 100vh;
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
  margin-bottom: ${(props) => (props.hasSubtitle ? '1rem' : '3rem')};
  background: var(--color-section-title);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = ({
  id,
  title,
  subtitle,
  showTitle = true,
  showSubtitle = true,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledSection id={id}>
      <Container>
        {showTitle && (
          <Title
            theme={theme}
            hasSubtitle={showSubtitle && subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title}
          </Title>
        )}
        {showSubtitle && subtitle && <Subtitle>{subtitle}</Subtitle>}
        {children}
      </Container>
    </StyledSection>
  );
};

export default Section;

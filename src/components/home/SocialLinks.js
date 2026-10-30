import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { useReducedMotion } from 'framer-motion';
const SocialLinksContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--color-text-primary);
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-text-accent);
  }
`;

const SocialLinks = ({ theme, className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SocialLinksContainer
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
    >
      <SocialLink
        theme={theme}
        aria-label='GitHub profile'
        href='https://github.com/123ssk321'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
      >
        <BsGithub />
      </SocialLink>
      <SocialLink
        theme={theme}
        aria-label='LinkedIn profile'
        href='https://linkedin.com/in/sahilkumar5'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
      >
        <BsLinkedin />
      </SocialLink>
      <SocialLink
        theme={theme}
        aria-label='Email Sahil Kumar'
        href='mailto:sahilsatishkumar7@gmail.com'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
      >
        <FiMail />
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;

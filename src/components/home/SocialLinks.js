import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsMailbox2 } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
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
  return (
    <SocialLinksContainer
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <SocialLink
        theme={theme}
        href='https://github.com/123ssk321'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BsGithub />
      </SocialLink>
      <SocialLink
        theme={theme}
        href='https://linkedin.com/in/sahilkumar5'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BsLinkedin />
      </SocialLink>
      <SocialLink
        theme={theme}
        href='mailto:sahilsatishkumar7@gmail.com'
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMail />
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;

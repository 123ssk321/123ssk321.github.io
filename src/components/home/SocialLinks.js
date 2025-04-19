import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialLinksContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#00ffff' : '#0066ff'};
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
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaGithub />
            </SocialLink>
            <SocialLink
                theme={theme}
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaLinkedin />
            </SocialLink>
            <SocialLink
                theme={theme}
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaTwitter />
            </SocialLink>
        </SocialLinksContainer>
    );
};

export default SocialLinks; 
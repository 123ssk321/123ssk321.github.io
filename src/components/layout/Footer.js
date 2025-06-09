import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-8 bg-[var(--color-bg-secondary)]`}
    >
      <div className='container mx-auto px-4 h-full border-t-2 border-[var(--color-card-icon)]'>
        <div className='flex flex-col md:flex-row justify-center items-center py-4'>
          <div className='text-center md:text-left'>
            <p
              className={`text-sm text-[var(--color-text-accent)]`}
            >
              © {currentYear} Sahil Kumar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

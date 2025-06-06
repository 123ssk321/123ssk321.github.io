import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-8 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-[#F9FAFB]'}`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
          <div className='text-center md:text-left'>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-[#CBD5E1]' : 'text-[#7F8C8D]'
              }`}
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

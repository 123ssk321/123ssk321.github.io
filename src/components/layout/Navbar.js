import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [fullLogo, setFullLogo] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setFullLogo(window.scrollY <= 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <NavContainer
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                backgroundColor: isScrolled
                    ? theme === 'dark' ? 'rgba(17, 17, 17, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)'
                    : 'transparent'
            }}
        >
            <NavContent>
                <Logo>
                    <AnimatePresence mode="wait">
                        {fullLogo ? (
                            <motion.span
                                key="full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                YourName
                            </motion.span>
                        ) : (
                            <motion.span
                                key="short"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                YN
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Logo>

                <NavLinks>
                    <NavLink href="#about">About</NavLink>
                    <NavLink href="#projects">Projects</NavLink>
                    <NavLink href="#skills">Skills</NavLink>
                    <NavLink href="#contact">Contact</NavLink>
                    <NavLink
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CV
                    </NavLink>
                    <ThemeToggle onClick={toggleTheme}>
                        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </ThemeToggle>
                </NavLinks>
            </NavContent>
        </NavContainer>
    );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

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
  gap: 2rem;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-top: 4rem;
  color: inherit;
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: inherit;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark'
        ? 'rgba(17, 17, 17, 0.95)'
        : 'rgba(255, 255, 255, 0.95)'
    };
  padding: 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
  }
`;

const menuVariants = {
    closed: {
        opacity: 0,
        y: "-100%",
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [fullLogo, setFullLogo] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setFullLogo(window.scrollY <= 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
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
                    </NavLinks>

                    <RightSection>
                        <ThemeToggle onClick={toggleTheme}>
                            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </ThemeToggle>
                        <HamburgerButton
                            onClick={toggleMobileMenu}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </HamburgerButton>
                    </RightSection>
                </NavContent>
            </NavContainer>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        theme={theme}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <MobileNavLinks>
                            <MobileNavLink href="#about" onClick={handleMobileNavClick}>
                                About
                            </MobileNavLink>
                            <MobileNavLink href="#projects" onClick={handleMobileNavClick}>
                                Projects
                            </MobileNavLink>
                            <MobileNavLink href="#skills" onClick={handleMobileNavClick}>
                                Skills
                            </MobileNavLink>
                            <MobileNavLink href="#contact" onClick={handleMobileNavClick}>
                                Contact
                            </MobileNavLink>
                            <MobileNavLink
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleMobileNavClick}
                            >
                                CV
                            </MobileNavLink>
                        </MobileNavLinks>
                        <MobileThemeToggle
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
                        </MobileThemeToggle>
                    </MobileMenu>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

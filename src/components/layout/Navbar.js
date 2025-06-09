import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../styles/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  background: transparent;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-navbar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 100px;
  padding: 0.5rem;
  box-shadow: 0 0 20px var(--color-navbar-shadow);
  position: relative;
  width: fit-content;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const Logo = styled(motion.a)`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-navbar-logo);
  text-shadow: 0 0 10px var(--color-navbar-logo-shadow);
  text-decoration: none;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 0.5rem;
`;

const NavLink = styled(motion.a)`
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-text-accent);
  }

  &.active {
    background: var(--color-navlink-active-bg);
    color: var(--color-navlink-active-text);
    box-shadow: 0 0 20px var(--color-navlink-active-shadow);

    &::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: var(--color-navlink-bulb-bg);
      border-radius: 3px;
      box-shadow: 0 0 5px var(--color-navlink-bulb-shadow),
        0 0 10px var(--color-navlink-bulb-shadow),
        0 0 15px var(--color-navlink-bulb-shadow);
      opacity: ${(props) => (props.shouldglow ? 1 : 0)};
      transition: opacity 0.3s ease;
    }
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
  color: var(--color-text-primary);

  :hover {
    color: var(--color-text-accent);
  }

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
  :hover {
    color: var(--color-text-accent);
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#000')};

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
  background: ${(props) =>
    props.theme === 'dark'
      ? 'rgba(17, 17, 17, 0.95)'
      : 'rgba(255, 255, 255, 0.95)'};
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
    y: '-100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [fullLogo, setFullLogo] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
  const [shouldShowGlow, setShouldShowGlow] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  // Debounce function to limit the rate of scroll updates
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 50);
      setFullLogo(window.scrollY <= 50);
    }, 10),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setFullLogo(window.scrollY <= 50);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const options = {
      rootMargin: '-20% 0px -30% 0px',
      threshold: Array.from({ length: 100 }, (_, i) => i / 100),
    };

    let currentSection = '';
    const sectionRatios = new Map();

    const handleIntersect = (entries) => {
      // Don't update during programmatic scrolling
      if (isScrolling) return;

      entries.forEach((entry) => {
        sectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let maxSection = currentSection;

      sectionRatios.forEach((ratio, section) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxSection = section;
        }
      });

      if (maxRatio > 0.15) {
        if (maxSection !== currentSection) {
          currentSection = maxSection;
          setActiveLink(maxSection);
          setShouldShowGlow(maxSection !== 'hero');
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
      sectionRatios.set(section.id, 0);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isScrolling]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
      setActiveLink('hero');
      setShouldShowGlow(false);

      // Reset scrolling state after animation
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  const handleNavClick = (sectionId) => {
    // Set scrolling state
    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Immediately update active link and glow
    setActiveLink(sectionId);
    setShouldShowGlow(true);
    setIsMobileMenuOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // Reset scrolling state after animation
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <NavContainer initial={{ y: -100 }} animate={{ y: 0 }}>
        <NavContent>
          <LeftSection>
            <Logo
              theme={theme}
              href='#hero'
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode='wait'>
                {fullLogo ? (
                  <motion.span
                    key='full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sahil Kumar
                  </motion.span>
                ) : (
                  <motion.span
                    key='short'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    SK
                  </motion.span>
                )}
              </AnimatePresence>
            </Logo>
          </LeftSection>

          <CenterSection theme={theme}>
            <NavLinks>
              <NavLink
                href='#about'
                theme={theme}
                className={activeLink === 'about' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('about')}
                shouldglow={shouldShowGlow}
              >
                About
              </NavLink>
              <NavLink
                href='#projects'
                theme={theme}
                className={activeLink === 'projects' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('projects')}
                shouldglow={shouldShowGlow}
              >
                Projects
              </NavLink>
              <NavLink
                href='#skills'
                theme={theme}
                className={activeLink === 'skills' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('skills')}
                shouldglow={shouldShowGlow}
              >
                Skills
              </NavLink>
              <NavLink
                href='#contact'
                theme={theme}
                className={activeLink === 'contact' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('contact')}
                shouldglow={shouldShowGlow}
              >
                Contact
              </NavLink>
              <NavLink
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                theme={theme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CV
              </NavLink>
            </NavLinks>
          </CenterSection>

          <RightSection>
            <ThemeToggle onClick={toggleTheme} theme={theme}>
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </ThemeToggle>
            <HamburgerButton
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              theme={theme}
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
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
          >
            <MobileNavLinks>
              <MobileNavLink
                href='#about'
                onClick={() => handleNavClick('about')}
                theme={theme}
                className={activeLink === 'about' ? 'active' : ''}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href='#projects'
                onClick={() => handleNavClick('projects')}
                theme={theme}
                className={activeLink === 'projects' ? 'active' : ''}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink
                href='#skills'
                onClick={() => handleNavClick('skills')}
                theme={theme}
                className={activeLink === 'skills' ? 'active' : ''}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                href='#contact'
                onClick={() => handleNavClick('contact')}
                theme={theme}
                className={activeLink === 'contact' ? 'active' : ''}
              >
                Contact
              </MobileNavLink>
              <MobileNavLink
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                theme={theme}
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

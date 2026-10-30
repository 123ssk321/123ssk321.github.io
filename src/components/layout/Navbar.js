import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../styles/ThemeContext';
import { FiMenu, FiX } from 'react-icons/fi';

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
  position: relative;
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.12em;
    width: 1.1em;
    height: 1px;
    background: var(--color-text-accent);
    opacity: 0.9;
    transition: width 400ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover::after {
    width: 100%;
  }

  .collapsible {
    display: inline-block;
    overflow: hidden;
    white-space: pre;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition-duration: 0.01ms;
    }
  }

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
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 64px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    z-index: -1;
    border-radius: inherit;
    background: radial-gradient(ellipse, color-mix(in srgb, var(--color-text-accent) 35%, transparent), transparent 72%);
    filter: blur(6px);
    opacity: 0;
    transition: opacity 250ms ease-out;
    pointer-events: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
  }

  &:hover svg,
  &:focus-visible svg {
    filter: drop-shadow(0 0 5px color-mix(in srgb, var(--color-text-accent) 55%, transparent));
  }

  &:active svg {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--color-text-accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before { transition-duration: 0.01ms; }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileThemeToggle = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 64px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  margin-top: 4rem;
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    z-index: -1;
    border-radius: inherit;
    background: radial-gradient(ellipse, color-mix(in srgb, var(--color-text-accent) 35%, transparent), transparent 72%);
    filter: blur(6px);
    opacity: 0;
    transition: opacity 250ms ease-out;
    pointer-events: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
  }

  &:hover svg,
  &:focus-visible svg {
    filter: drop-shadow(0 0 5px color-mix(in srgb, var(--color-text-accent) 55%, transparent));
  }

  &:active svg {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--color-text-accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before { transition-duration: 0.01ms; }
  }
`;

const ThemeLandscape = ({ theme, motionActive }) => (
  <svg
    className='theme-landscape'
    data-theme={theme}
    data-motion-active={motionActive}
    viewBox='0 0 64 35'
    width='64'
    height='35'
    aria-hidden='true'
    focusable='false'
  >
    <rect className='sky' width='64' height='35' rx='17.5' />
    <g className='cloud cloud-one'>
      <path d='M15 13.4c.2-1.8 1.7-3.1 3.4-3.1 1.4 0 2.6.8 3.1 2.1.4-.3.9-.5 1.5-.5 1.5 0 2.7 1.2 2.7 2.7H15.6c-.4-.3-.6-.7-.6-1.2Z' />
    </g>
    <g className='cloud cloud-two'>
      <path d='M35.5 10.6c.2-1.4 1.4-2.5 2.9-2.5 1.2 0 2.2.7 2.6 1.7.4-.3.8-.4 1.3-.4 1.3 0 2.3 1 2.3 2.3h-8.6c-.3-.3-.5-.7-.5-1.1Z' />
    </g>
    <circle className='sun' cx='14' cy='17' r='6' />
    <path className='moon' d='M50.2 4.8a7.1 7.1 0 1 0 7.4 11.1 7.5 7.5 0 0 1-7.4-11.1Z' />
    <g className='stars'>
      <path d='m38 5.2.8 1.7 1.8.7-1.8.8-.8 1.7-.7-1.7-1.8-.8 1.8-.7.7-1.7Z' />
      <circle cx='44.5' cy='14.2' r='1' />
      <circle cx='33.5' cy='13.3' r='.8' />
    </g>
    <path className='hill hill-back' d='M0 27.8c7.1-4.6 11.7-5.1 17.7-2.3 4.2-5.8 11-7.1 16.5-2.2 5.4-4.5 12.8-4.7 18.1-.5 4.2-2.5 7.8-2.9 11.7-1.1V35H0V27.8Z' />
    <path className='hill hill-front' d='M0 30.5c7-3.8 13.1-4 19.5-1.1 5.4-3.7 11.9-4.1 18.2-1.3 6.8-3.8 14.1-3.7 20.2-.4 2.5-1.2 4.5-1.7 6.1-1.8V35H0v-4.5Z' />
    <style>{`
      .theme-landscape {
        display: block;
        overflow: hidden;
        border-radius: 999px;
        --toggle-day-sky: #67c8dc;
        --toggle-night-sky: #28134f;
        --toggle-cloud: #f5fcff;
        --toggle-sun: #ffe07c;
        --toggle-moon: #f7e8fa;
        --toggle-stars: #fff5c4;
        --toggle-day-hill-back: #168c91;
        --toggle-day-hill-front: #08636c;
        --toggle-night-hill-back: #251040;
        --toggle-night-hill-front: #130825;
      }
      .theme-landscape .sky { fill: var(--toggle-day-sky); transition: fill 700ms ease; }
      .theme-landscape .cloud { fill: var(--toggle-cloud); opacity: .96; transition: opacity 600ms ease; }
      .theme-landscape .sun, .theme-landscape .moon { transform-box: fill-box; transform-origin: center; transition: transform 800ms cubic-bezier(.6,.05,.3,1), opacity 600ms ease; }
      .theme-landscape .sun { fill: var(--toggle-sun); opacity: 1; transform: translateY(0); }
      .theme-landscape .moon { fill: var(--toggle-moon); opacity: 0; transform: translateY(-30px); transition-delay: 100ms; }
      .theme-landscape .stars { fill: var(--toggle-stars); opacity: 0; transition: opacity 600ms ease 300ms; animation: none; }
      .theme-landscape .hill { transition: fill 700ms ease; }
      .theme-landscape .hill-back { fill: var(--toggle-day-hill-back); }
      .theme-landscape .hill-front { fill: var(--toggle-day-hill-front); }
      .theme-landscape .cloud-one { animation: theme-cloud-drift-one 7s ease-in-out infinite alternate; }
      .theme-landscape .cloud-two { animation: theme-cloud-drift-two 9s ease-in-out infinite alternate; }
      .theme-landscape[data-theme='dark'] .sky { fill: var(--toggle-night-sky); }
      .theme-landscape[data-theme='dark'] .sun { opacity: 0; transform: translateY(30px); }
      .theme-landscape[data-theme='dark'] .moon { opacity: 1; transform: translateY(0); }
      .theme-landscape[data-theme='dark'] .stars { opacity: 1; animation: theme-stars-twinkle 1.6s ease-in-out infinite alternate; }
      .theme-landscape[data-theme='dark'] .cloud { opacity: 0; }
      .theme-landscape[data-theme='dark'] .hill-back { fill: var(--toggle-night-hill-back); }
      .theme-landscape[data-theme='dark'] .hill-front { fill: var(--toggle-night-hill-front); }
      .theme-landscape[data-motion-active='false'] .stars, .theme-landscape[data-motion-active='false'] .cloud-one, .theme-landscape[data-motion-active='false'] .cloud-two { animation: none; }
      @keyframes theme-cloud-drift-one { from { transform: translateX(3px); } to { transform: translateX(-5px); } }
      @keyframes theme-cloud-drift-two { from { transform: translateX(-3px); } to { transform: translateX(5px); } }
      @keyframes theme-stars-twinkle { from { opacity: .72; } to { opacity: 1; } }
      @media (prefers-reduced-motion: reduce) {
        .sun, .moon, .sky, .hill, .stars { transition-duration: .01ms; transition-delay: 0ms; }
        .stars, .cloud-one, .cloud-two { animation: none; }
      }
    `}</style>
  </svg>
);

const ThemeRipple = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  overflow: hidden;
  pointer-events: none;

  .theme-ripple-ring {
    position: fixed;
    width: 10px;
    height: 10px;
    margin: -5px 0 0 -5px;
    border-radius: 50%;
    background: radial-gradient(circle,
      transparent 0 37%,
      color-mix(in srgb, var(--color-text-accent) 16%, transparent) 41%,
      color-mix(in srgb, var(--color-text-accent) 52%, transparent) 45%,
      color-mix(in srgb, var(--color-text-accent) 78%, transparent) 48%,
      color-mix(in srgb, var(--color-text-accent) 70%, transparent) 51%,
      color-mix(in srgb, var(--color-text-accent) 38%, transparent) 57%,
      color-mix(in srgb, var(--color-text-accent) 13%, transparent) 66%,
      transparent 74%);
    opacity: 0;
    visibility: hidden;
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#000')};

  &:focus-visible {
    outline: 2px solid var(--color-text-accent);
    outline-offset: 4px;
    border-radius: 4px;
  }

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
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => !document.hidden);
  const [fullLogo, setFullLogo] = useState(() => window.scrollY <= 50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
  const [shouldShowGlow, setShouldShowGlow] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const mobileMenuOpenRef = useRef(false);
  const themeRippleRef = useRef(null);
  const themeRippleAnimationRef = useRef(null);
  const themeToggleMotionActive = !prefersReducedMotion && isDocumentVisible;

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => () => themeRippleAnimationRef.current?.cancel(), []);

  const closeMobileMenu = () => {
    mobileMenuOpenRef.current = false;
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = (event) => {
    const ring = themeRippleRef.current;
    const stopCurrentRipple = () => {
      themeRippleAnimationRef.current?.cancel();
      themeRippleAnimationRef.current = null;
      if (!ring) return;
      ring.style.visibility = 'hidden';
      ring.style.opacity = '0';
      ring.style.transform = '';
      ring.style.willChange = '';
    };
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const x = buttonRect.left + buttonRect.width / 2;
    const y = buttonRect.top + buttonRect.height / 2;
    const radius = Math.ceil(Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    ));
    toggleTheme();

    const reduceMotionNow = prefersReducedMotion
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotionNow || !ring || typeof ring.animate !== 'function') {
      stopCurrentRipple();
      return;
    }

    stopCurrentRipple();
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.visibility = 'visible';
    ring.style.opacity = '0.88';
    ring.style.willChange = 'transform, opacity';

    const endScale = (radius * 2.2) / 10;
    let animation;
    try {
      animation = ring.animate(
        [
          { transform: 'scale(0)', opacity: 0.95 },
          { transform: `scale(${endScale})`, opacity: 0 },
        ],
        { duration: 800, easing: 'ease-out', fill: 'forwards' },
      );
    } catch {
      stopCurrentRipple();
      return;
    }
    themeRippleAnimationRef.current = animation;
    animation.onfinish = () => {
      if (themeRippleAnimationRef.current !== animation) return;
      animation.cancel();
      themeRippleAnimationRef.current = null;
      ring.style.visibility = 'hidden';
      ring.style.opacity = '0';
      ring.style.transform = '';
      ring.style.willChange = '';
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setFullLogo(window.scrollY <= 50);
      if (mobileMenuOpenRef.current) {
        mobileMenuOpenRef.current = false;
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        mobileMenuOpenRef.current = false;
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    closeMobileMenu();
    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
    closeMobileMenu();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });

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
    const open = !mobileMenuOpenRef.current;
    mobileMenuOpenRef.current = open;
    setIsMobileMenuOpen(open);
  };
  const navVariants = prefersReducedMotion
    ? { closed: { opacity: 0, y: 0 }, open: { opacity: 1, y: 0 } }
    : menuVariants;

  return (
    <>
      <NavContainer initial={prefersReducedMotion ? false : { y: -100 }} animate={{ y: 0 }}>
        <NavContent>
          <LeftSection>
            <Logo
              theme={theme}
              href='#hero'
              aria-label='Sahil Kumar, home'
              onClick={handleLogoClick}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            >
              <span aria-hidden='true'>S</span>
              <motion.span
                className='collapsible'
                aria-hidden='true'
                animate={{ width: fullLogo ? 'auto' : 0, opacity: fullLogo ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >ahil </motion.span>
              <span aria-hidden='true'>K</span>
              <motion.span
                className='collapsible'
                aria-hidden='true'
                animate={{ width: fullLogo ? 'auto' : 0, opacity: fullLogo ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >umar</motion.span>
            </Logo>
          </LeftSection>

          <CenterSection theme={theme}>
            <NavLinks>
              <NavLink
                href='#about'
                theme={theme}
                className={activeLink === 'about' ? 'active' : ''}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => handleNavClick('about')}
                shouldglow={shouldShowGlow}
              >
                About
              </NavLink>
              <NavLink
                href='#projects'
                theme={theme}
                className={activeLink === 'projects' ? 'active' : ''}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => handleNavClick('projects')}
                shouldglow={shouldShowGlow}
              >
                Projects
              </NavLink>
              <NavLink
                href='#skills'
                theme={theme}
                className={activeLink === 'skills' ? 'active' : ''}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => handleNavClick('skills')}
                shouldglow={shouldShowGlow}
              >
                Skills
              </NavLink>
              <NavLink
                href='#contact'
                theme={theme}
                className={activeLink === 'contact' ? 'active' : ''}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => handleNavClick('contact')}
                shouldglow={shouldShowGlow}
              >
                Contact
              </NavLink>
              <NavLink
                href='/CV.pdf'
                target='_blank'
                rel='noopener noreferrer'
                theme={theme}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                CV
              </NavLink>
            </NavLinks>
          </CenterSection>

          <RightSection>
            <ThemeToggle
              onClick={handleThemeToggle}
              theme={theme}
              aria-label='Dark theme'
              aria-pressed={theme === 'dark'}
            >
              <ThemeLandscape theme={theme} motionActive={themeToggleMotionActive} />
            </ThemeToggle>
            <HamburgerButton
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-navigation'
              whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
              theme={theme}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </HamburgerButton>
          </RightSection>
        </NavContent>
      </NavContainer>

      <ThemeRipple aria-hidden='true'>
        <span ref={themeRippleRef} className='theme-ripple-ring' />
      </ThemeRipple>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            id='mobile-navigation'
            aria-label='Mobile navigation'
            role='navigation'
            theme={theme}
            initial='closed'
            animate='open'
            exit='closed'
            variants={navVariants}
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
                href='/CV.pdf'
                target='_blank'
                rel='noopener noreferrer'
                theme={theme}
              >
                CV
              </MobileNavLink>
            </MobileNavLinks>
            <MobileThemeToggle
              onClick={handleThemeToggle}
              aria-label='Dark theme'
              aria-pressed={theme === 'dark'}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
            >
              <ThemeLandscape theme={theme} motionActive={themeToggleMotionActive} />
            </MobileThemeToggle>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

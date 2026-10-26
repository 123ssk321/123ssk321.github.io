import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../styles/ThemeContext";
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <nav className="frame nav" aria-label="Main navigation">
        <a href="#hero" className="wordmark" onClick={() => setOpen(false)}>
          SK
          <span className="sun-mark" aria-hidden="true" />
        </a>
        <div className={`nav-links ${open ? "is-open" : ""}`} id="navigation">
          {["about", "projects", "skills", "contact"].map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </div>
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span>{theme === "dark" ? <FiSun /> : <FiMoon />}</span>
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

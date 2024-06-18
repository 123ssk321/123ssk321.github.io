import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Extracurricular from './sections/Extracurricular';
import Contact from './sections/Contact';
import './App.css';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle('dark-theme', !darkTheme);
  };

  return (
    <div className={`app ${darkTheme ? 'dark-theme' : ''}`}>
      <Navbar toggleTheme={toggleTheme} darkTheme={darkTheme} />
      <Hero />
      <About />
      <Projects />
      <Extracurricular />
      <Contact />
    </div>
  );
}

export default App;

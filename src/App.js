import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';
import Contact from './components/contact/Contact';

function App() {
    return (
        <ThemeProvider>
            <Layout>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
            </Layout>
        </ThemeProvider>
    );
}

export default App;

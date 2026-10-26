import React from "react";
import Layout from "./components/layout/Layout";
import Hero from "./components/home/Hero";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Contact from "./components/contact/Contact";
export default function App() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </Layout>
  );
}

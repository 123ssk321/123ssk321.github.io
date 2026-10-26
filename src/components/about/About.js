import React, { useState } from "react";
import Section from "../layout/Section";
import Timeline from "./Timeline";
import {
  educationData,
  workData,
  extracurricularData,
} from "../../data/timeline";
export default function About() {
  const [active, setActive] = useState("education");
  const data = {
    education: educationData,
    work: workData,
    extracurricular: extracurricularData,
  };
  return (
    <Section
      id="about"
      title="A little about me"
      subtitle="I'm passionate about AI, data science, and software engineering. I enjoy building models to learn complex patterns, extracting insights from data, and developing apps."
    >
      <div className="about-layout">
        <div className="about-statement">
          <p>Above all, I love solving problems.</p>
          <p className="body-copy">And continuously learning new things.</p>
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
            Read my CV
          </a>
        </div>
        <div className="experience">
          <div className="tab-list" aria-label="Experience categories">
            {Object.keys(data).map((key) => (
              <button
                key={key}
                aria-pressed={key === active}
                onClick={() => setActive(key)}
              >
                {key === "extracurricular"
                  ? "Extracurricular"
                  : key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <Timeline key={active} items={data[active]} activeTab={active} />
        </div>
      </div>
    </Section>
  );
}

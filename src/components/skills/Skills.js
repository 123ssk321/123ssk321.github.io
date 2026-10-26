import React, { useState } from "react";
import Section from "../layout/Section";
import { skillsData } from "../../data/skills";
export default function Skills() {
  const [active, setActive] = useState("aiDataScience");
  const categories = {
    aiDataScience: "AI & Data Science",
    softwareEngineering: "Software Engineering",
    softSkills: "Soft Skills",
  };
  return (
    <Section
      id="skills"
      title="Skills & expertise"
      subtitle="The tools and skills behind the work. Always learning and growing."
    >
      <div className="tab-list" aria-label="Skill categories">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            aria-pressed={active === key}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="skills-list">
        {skillsData[active].map((skill) => (
          <div className="skill" key={skill.name}>
            {skill.url ? (
              <a href={skill.url} target="_blank" rel="noopener noreferrer">
                {skill.name}
              </a>
            ) : (
              <span>{skill.name}</span>
            )}
            {skill.description && <p>{skill.description}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

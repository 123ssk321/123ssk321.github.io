import React, { useState } from "react";
import Section from "../layout/Section";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import projects from "../../data/projects";
export default function Projects() {
  const [activeFilter, setFilter] = useState("all");
  const [visible, setVisible] = useState(6);
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  const setActiveFilter = (value) => {
    setFilter(value);
    setVisible(6);
  };
  return (
    <Section
      id="projects"
      title="Selected work"
      subtitle="Exploring AI, data science, software engineering, and finance through working projects."
    >
      <ProjectFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="project-list" aria-live="polite">
        {filtered.slice(0, visible).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {visible < filtered.length && (
        <button
          className="primary-button show-more"
          onClick={() => setVisible((v) => v + 6)}
        >
          Show more projects
        </button>
      )}
    </Section>
  );
}

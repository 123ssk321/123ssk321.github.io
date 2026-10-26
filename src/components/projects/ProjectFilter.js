import React from "react";
import projects from "../../data/projects";
export default function ProjectFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="tab-list" aria-label="Filter projects">
      {["all", ...new Set(projects.map((p) => p.category))].map((category) => (
        <button
          key={category}
          aria-pressed={activeFilter === category}
          onClick={() => setActiveFilter(category)}
        >
          {category === "all" ? "All projects" : category}
        </button>
      ))}
    </div>
  );
}

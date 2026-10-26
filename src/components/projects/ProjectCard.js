import React from "react";

export default function ProjectCard({ project }) {
  return (
    <article className="project-row">
      <div className="project-title">
        <h3>{project.title}</h3>
        <p>{project.category}</p>
      </div>
      <div className="project-description">
        <p>{project.description}</p>
        <ul className="technology-list">
          {project.technologies.map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className="project-links">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          Source code
        </a>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          {project.liveUrl === "/coming-soon"
            ? "Demo coming soon"
            : "Live demo"}
        </a>
      </div>
    </article>
  );
}

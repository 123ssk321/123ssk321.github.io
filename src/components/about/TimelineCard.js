import React from "react";
import { FiPlus } from "react-icons/fi";
export default function TimelineCard({ item }) {
  return (
    <details className="experience-item">
      <summary>
        <span>
          <span className="experience-title">{item.title}</span>
          <span className="experience-place">{item.institution}</span>
          <span className="experience-date">
            {item.date} / {item.country}
          </span>
          {item.grade && <span className="experience-grade">{item.grade}</span>}
        </span>
        <FiPlus aria-hidden="true" />
      </summary>
      <div className="experience-details">
        {item.details
          .split("\n")
          .filter((line) => line.trim())
          .map((line, index) => (
            <p key={index}>{line.trim()}</p>
          ))}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Read the research
          </a>
        )}
      </div>
    </details>
  );
}

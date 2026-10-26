import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
export default function SocialLinks({ className = "" }) {
  return (
    <div className={`social-links ${className}`}>
      <a
        href="https://github.com/123ssk321"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiGithub aria-hidden="true" />
        <span>GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/sahilkumar5"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiLinkedin aria-hidden="true" />
        <span>LinkedIn</span>
      </a>
      <a href="mailto:sahilsatishkumar7@gmail.com">
        <FiMail aria-hidden="true" />
        <span>Email</span>
      </a>
    </div>
  );
}

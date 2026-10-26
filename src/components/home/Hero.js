import React from "react";

import { useTheme } from "../../styles/ThemeContext";
import SocialLinks from "./SocialLinks";
export default function Hero() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="hero">
      <div className="hero-landscape" aria-hidden="true">
        <img
          key={theme}
          src={`/images/horizon-${theme}.webp`}
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="hero-content frame">
        <h1>Sahil Kumar</h1>
        <div className="hero-intro">
          <p>
            AI engineer, data scientist
            <br />
            &amp; software engineer.
          </p>
          <a className="primary-button" href="#projects">
            Explore my work
          </a>
        </div>
        <div className="hero-bottom">
          <p>
            Always learning.
            <br />
            Always evolving.
          </p>
          <SocialLinks />
          <a href="#about" className="hero-about">
            Meet Sahil
          </a>
        </div>
      </div>
    </section>
  );
}

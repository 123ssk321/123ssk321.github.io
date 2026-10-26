import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("enter-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(
        ".section-heading h2,.section-heading p,.project-row,.about-statement,.experience,.skills-list,.contact-layout > div,.contact-form,.footer-name",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

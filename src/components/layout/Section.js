import React from "react";
export default function Section({
  id,
  title,
  subtitle,
  showTitle = true,
  showSubtitle = true,
  children,
}) {
  return (
    <section id={id} className="content-section">
      <div className="frame">
        {showTitle && (
          <div className="section-heading">
            <h2>{title}</h2>
            {showSubtitle && subtitle && <p>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

import React from "react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} Sahil Kumar</p>
          <div>
            <a href="/trading-lab/">Trading research reports</a>
            <a href="/trading-journal/">Journal insights demo</a>
            <a href="#hero">Back to top</a>
          </div>
        </div>
        <p className="footer-name" aria-hidden="true">
          Sahil Kumar
        </p>
      </div>
    </footer>
  );
}

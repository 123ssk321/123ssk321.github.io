import React, { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return ["dark", "light"].includes(saved) ? saved : systemTheme();
    } catch {
      return systemTheme();
    }
  });
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const change = () => {
      try {
        if (!["dark", "light"].includes(localStorage.getItem("theme")))
          setTheme(systemTheme());
      } catch {
        setTheme(systemTheme());
      }
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  function toggleTheme() {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        let savedTheme;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch {
            // Storage can be unavailable in restricted browser contexts.
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        return savedTheme === 'light' || savedTheme === 'dark'
            ? savedTheme
            : (prefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // The selected theme still applies for the current page session.
        }
        // Update document class for global theme switching
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

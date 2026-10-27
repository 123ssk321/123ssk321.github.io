import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const ThemeProbe = () => {
    const { theme, toggleTheme } = useTheme();
    return <button onClick={toggleTheme}>{theme}</button>;
};

beforeEach(() => {
    localStorage.clear();
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('ignores an invalid saved theme and uses the system preference', () => {
    localStorage.setItem('theme', 'sepia');

    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);

    expect(screen.getByRole('button').textContent).toBe('dark');
});

test('keeps theme switching available when storage reads and writes fail', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
    });

    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    expect(screen.getByRole('button').textContent).toBe('dark');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
});

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0F172A] text-[#F1F5F9]' : 'bg-white text-[#2C3E50]'
            }`}>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

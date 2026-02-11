import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('notcord_theme');
        return saved ? JSON.parse(saved) : {
            primaryBg: '#1e1f22',
            accentColor: '#5865f2',
            sidebarBg: '#2b2d31',
            textMain: '#dbdee1'
        };
    });

    useEffect(() => {
        localStorage.setItem('notcord_theme', JSON.stringify(theme));
        const root = document.documentElement;
        root.style.setProperty('--primary-bg', theme.primaryBg);
        root.style.setProperty('--accent-color', theme.accentColor);
        root.style.setProperty('--sidebar-bg', theme.sidebarBg);
        root.style.setProperty('--text-main', theme.textMain);
    }, [theme]);

    const updateTheme = (newValues) => {
        setTheme(prev => ({ ...prev, ...newValues }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

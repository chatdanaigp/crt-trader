'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    // Load saved theme preference
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('crt-trader-theme');
        if (saved && (saved === 'light' || saved === 'dark')) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Update theme
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('crt-trader-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const setThemeValue = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('crt-trader-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Provide context even before hydration to prevent errors
    // The actual theme will be applied after useEffect runs
    const value = {
        theme: mounted ? theme : 'dark',
        toggleTheme: mounted ? toggleTheme : () => { },
        setTheme: mounted ? setThemeValue : () => { },
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}

export default ThemeContext;


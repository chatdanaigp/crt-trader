'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import translations from '@/lib/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    // Load saved language preference
    useEffect(() => {
        const saved = localStorage.getItem('crt-trader-lang');
        if (saved && (saved === 'en' || saved === 'th')) {
            setLanguage(saved);
        }
    }, []);

    // Save language preference
    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('crt-trader-lang', lang);
    };

    // Translation function
    const t = (path) => {
        const keys = path.split('.');
        let value = translations;

        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                return path; // Return path if translation not found
            }
        }

        // Return the translation for current language or fallback to English
        if (value && typeof value === 'object') {
            return value[language] || value['en'] || path;
        }

        return path;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;

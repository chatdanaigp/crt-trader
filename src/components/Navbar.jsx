'use client';

import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Globe, Moon, Sun, Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.tools'), href: '/tools' },
        { name: t('nav.statistics'), href: '/statistics' },
        { name: t('nav.learn'), href: '/learn' },
        { name: language === 'th' ? 'คู่มือ' : 'How to', href: '/how-to' },
        { name: t('nav.contact'), href: '/contact' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'th' : 'en');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <TrendingUp className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="primary-gradient">crt</span>
                            <span className="text-foreground">.trader</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors duration-300 group ${isActive(link.href)
                                    ? 'text-primary'
                                    : 'text-text-secondary hover:text-foreground'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-9 h-9 rounded-lg glass hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-primary" />
                            ) : (
                                <Moon className="w-4 h-4 text-primary" />
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                        >
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-foreground">{language.toUpperCase()}</span>
                        </button>

                        <Link
                            href="/affiliate"
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105"
                        >
                            <Rocket className="w-4 h-4" />
                            {language === 'th' ? 'Affiliate' : 'Affiliate'}
                        </Link>

                        <Link
                            href="/join"
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                            {t('nav.joinCommunity')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Mobile Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-8 h-8 rounded-lg glass"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-primary" />
                            ) : (
                                <Moon className="w-4 h-4 text-primary" />
                            )}
                        </button>

                        {/* Mobile Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-sm font-medium"
                        >
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-foreground">{language.toUpperCase()}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-foreground hover:text-primary transition-colors duration-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="glass rounded-xl p-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-2 px-4 rounded-lg transition-colors duration-300 ${isActive(link.href)
                                    ? 'text-primary bg-primary/10 font-medium'
                                    : 'text-text-secondary hover:text-primary hover:bg-foreground/5'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/affiliate"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 text-white font-semibold rounded-lg"
                        >
                            <Rocket className="w-5 h-5" />
                            Affiliate
                        </Link>
                        <Link
                            href="/join"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-lg"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                            {t('nav.joinCommunity')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

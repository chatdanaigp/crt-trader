'use client';

import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();

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
        { name: t('nav.learn'), href: '/learn' },
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
                            <span className="text-white">.trader</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                        >
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-white">{language.toUpperCase()}</span>
                        </button>

                        <Link
                            href="/contact"
                            className="px-6 py-2.5 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
                        >
                            {t('nav.joinCommunity')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        {/* Mobile Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg glass text-sm font-medium"
                        >
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-white">{language.toUpperCase()}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white hover:text-primary transition-colors duration-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="glass rounded-xl p-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-300 hover:text-primary transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-center px-6 py-3 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-lg"
                        >
                            {t('nav.joinCommunity')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

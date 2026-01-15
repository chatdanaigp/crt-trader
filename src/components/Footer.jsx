'use client';

import { TrendingUp, Mail, MessageCircle, Twitter, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: t('nav.home'), href: '/' },
            { name: t('nav.tools'), href: '/tools' },
            { name: t('nav.contact'), href: '/contact' },
        ],
        support: [
            { name: 'FAQ', href: '#' },
            { name: t('nav.contact'), href: '/contact' },
            { name: 'Discord', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Risk Disclosure', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'YouTube' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: MessageCircle, href: '#', label: 'Discord' },
    ];

    return (
        <footer className="relative border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-7 h-7 text-primary" />
                            <span className="text-xl font-bold">
                                <span className="primary-gradient">crt</span>
                                <span className="text-white">.trader</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                            {t('footer.description')}
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-white/10 transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.resources')}</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="glass rounded-xl p-6 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h4 className="text-white font-semibold mb-1">Stay Updated</h4>
                            <p className="text-text-secondary text-sm">Get trading insights and updates directly to your inbox.</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative flex-1 md:w-64">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-secondary text-sm focus:outline-none focus:border-primary/50 transition-colors duration-300"
                                />
                            </div>
                            <button className="px-6 py-3 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-text-secondary text-sm">
                        © {currentYear} crt.trader. {t('footer.allRights')}
                    </p>
                    <p className="text-text-secondary text-xs">
                        Trading involves substantial risk. Past performance is not indicative of future results.
                    </p>
                </div>
            </div>
        </footer>
    );
}

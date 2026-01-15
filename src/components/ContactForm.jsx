'use client';

import { useState } from 'react';
import { Send, Mail, MessageSquare, MapPin, Phone, ExternalLink, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="relative min-h-screen py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{t('contact.badge')}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        <span className="primary-gradient">{t('contact.title')}</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="glass rounded-2xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            {t('contact.sendMessage')}
                        </h2>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mb-4 animate-pulse">
                                    <CheckCircle className="w-8 h-8 text-green" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{t('contact.sent')}</h3>
                                <p className="text-text-secondary text-center">
                                    {t('contact.sentDesc')}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                        {t('contact.yourName')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder={t('contact.enterName')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        {t('contact.email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder={t('contact.enterEmail')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                                        placeholder={t('contact.howCanWeHelp')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] group"
                                >
                                    {t('contact.send')}
                                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info & Social */}
                    <div className="space-y-6">
                        {/* Discord Card */}
                        <div className="glass rounded-2xl p-6 sm:p-8 primary-glow-hover transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-4">{t('contact.joinDiscord')}</h2>
                            <p className="text-text-secondary mb-6">
                                {t('contact.discordDesc')}
                            </p>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[#4752C4] hover:scale-105"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                </svg>
                                {t('contact.joinDiscordBtn')}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="glass rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-white mb-6">{t('contact.otherWays')}</h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:contact@crt-trader.com"
                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-text-secondary text-sm">{t('contact.email')}</p>
                                        <p className="text-white font-medium">contact@crt-trader.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-text-secondary text-sm">{t('contact.location')}</p>
                                        <p className="text-white font-medium">Bangkok, Thailand</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-text-secondary text-sm">{t('contact.supportHours')}</p>
                                        <p className="text-white font-medium">{t('contact.viaDiscord')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

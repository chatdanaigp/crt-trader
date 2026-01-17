'use client';

import { Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-pulse-primary">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{t('hero.badge')}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        <span className="primary-gradient">{t('hero.headline1')}</span>
                        <span className="text-foreground">{t('hero.headline2')}</span>
                        <br />
                        <span className="primary-gradient">{t('hero.headline3')}</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
                        <span className="text-primary font-semibold">{t('hero.subheadline')}</span>
                        <br />
                        {t('hero.subheadlineDesc')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 group"
                        >
                            {t('hero.cta')}
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/purchase"
                            className="inline-flex items-center gap-3 px-10 py-5 glass border border-primary/30 text-foreground font-bold text-lg rounded-xl transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 group"
                        >
                            {t('hero.buyTools')}
                            <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-text-secondary text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                            <span>1,500+ {t('hero.members')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                            <span>{t('hero.analysis')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                            <span>{t('hero.support')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
}

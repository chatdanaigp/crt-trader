'use client';

import { Youtube, Award, TrendingUp, Globe, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersSection() {
    const { t } = useLanguage();

    const partners = [
        {
            name: 'Wealthiness Academy',
            icon: Award,
            url: 'https://www.youtube.com/@BetterPrimetime',
            highlight: true
        },
        {
            name: 'ConnextFX',
            icon: Globe,
            url: '#',
            highlight: false
        },
        {
            name: 'TradingView',
            icon: TrendingUp,
            url: '#',
            highlight: false
        },
        {
            name: 'Master Signal',
            icon: Zap,
            url: '#',
            highlight: false
        },
        {
            name: 'Secure Trade',
            icon: Shield,
            url: '#',
            highlight: false
        }
    ];

    return (
        <section className="relative py-10 border-y border-white/5 bg-black/40 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mobile scroll container / Desktop grid */}
                <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto pb-4 md:pb-0 no-scrollbar mask-gradient">
                    {partners.map((partner, index) => (
                        <a
                            key={index}
                            href={partner.url}
                            target={partner.url.startsWith('http') ? "_blank" : "_self"}
                            rel={partner.url.startsWith('http') ? "noopener noreferrer" : ""}
                            className={`group flex items-center gap-3 flex-shrink-0 transition-all duration-300 ${partner.highlight ? 'opacity-100' : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}`}
                        >
                            <div className={`p-2 rounded-lg ${partner.highlight ? 'bg-primary/10 text-primary' : 'bg-white/5 text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors'}`}>
                                <partner.icon className="w-6 h-6" />
                            </div>
                            <span className={`font-semibold text-lg ${partner.highlight ? 'text-white' : 'text-text-secondary group-hover:text-white transition-colors'}`}>
                                {partner.name}
                            </span>
                        </a>
                    ))}

                    {/* Duplicate for infinite scroll effect on mobile if needed, or just static list */}
                </div>
            </div>
        </section>
    );
}

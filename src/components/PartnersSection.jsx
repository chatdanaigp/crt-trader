'use client';

import { Youtube, ExternalLink, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersSection() {
    const { t, language } = useLanguage();

    return (
        <section className="relative py-12 border-y border-white/5 bg-black/20 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Partner Text */}
                    <div className="text-center md:text-right">
                        <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">
                            {language === 'th' ? 'พาร์ทเนอร์อย่างเป็นทางการ' : 'Official Partner'}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center md:justify-end gap-2">
                            <Award className="w-6 h-6 text-primary" />
                            Wealthiness Academy
                        </h3>
                    </div>

                    {/* Divider (Hidden on mobile) */}
                    <div className="hidden md:block w-px h-12 bg-white/10"></div>

                    {/* Youtube Channel */}
                    <a
                        href="https://www.youtube.com/@BetterPrimetime"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 hover:border-red-600/40 p-4 rounded-xl transition-all duration-300"
                    >
                        <div className="p-3 bg-red-600 rounded-lg shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform duration-300">
                            <Youtube className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-red-100 text-xs font-medium mb-0.5">
                                {language === 'th' ? 'ติดตามบน YouTube' : 'Follow on YouTube'}
                            </p>
                            <p className="text-white font-bold flex items-center gap-2">
                                Better Primetime
                                <ExternalLink className="w-3 h-3 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

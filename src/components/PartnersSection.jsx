'use client';

import { Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersSection() {
    const { t } = useLanguage();

    const partners = [
        {
            name: 'Tong Wealthiness',
            logo: '/images/partners/tong.jpg',
            url: 'https://www.youtube.com/@tongwealthiness'
        },
        {
            name: 'Pok Innovest',
            logo: '/images/partners/pok.jpg',
            url: 'https://www.youtube.com/@Pokinnovest'
        },
        {
            name: 'Better Primetime',
            logo: '/images/partners/better.jpg',
            url: 'https://www.youtube.com/@BetterPrimetime'
        },
        {
            name: 'KNIGHTZME',
            logo: '/images/partners/knightz.jpg',
            url: 'https://www.youtube.com/@KNIGHTZME'
        },
        {
            name: 'Phonetradingzone',
            logo: '/images/partners/phone.jpg',
            url: 'https://www.youtube.com/@phonetradingzone'
        },
        {
            name: 'Max Investra',
            logo: '/images/partners/max.jpg',
            url: 'https://www.youtube.com/@MaxInvestra'
        },
        {
            name: 'Touch The Profit Room',
            logo: '/images/partners/touch.jpg',
            url: 'https://www.youtube.com/@Touch_TheProfitRoom'
        },
        {
            name: 'Rit Mindset',
            logo: '/images/partners/rit.jpg',
            url: 'https://www.youtube.com/@RitmindsetWN-b7z'
        },
        {
            name: 'Gold Mastery 168',
            logo: '/images/partners/gold.jpg',
            url: 'https://www.youtube.com/@GoldMastery168'
        },
        {
            name: 'Art Go for Gold',
            logo: '/images/partners/art.jpg',
            url: 'https://www.youtube.com/@Art-GoforGold43'
        }
    ];

    // Duplicate partners for seamless infinite scroll
    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="py-10 bg-black/40 border-y border-white/5 backdrop-blur-sm relative overflow-hidden">
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title - Centered on top */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-semibold text-white uppercase tracking-wider">
                        Official Partners
                    </h3>
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-primary rounded-full"></div>
                </div>

                {/* Partners Logo Strip */}
                <div className="w-full relative">
                    {/* Gradient Masks for scrolling effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none"></div>

                    {/* Auto-scrolling Container */}
                    <div className="overflow-hidden">
                        <div className="flex items-center gap-6 md:gap-8 animate-scroll" style={{ width: 'max-content' }}>
                            {duplicatedPartners.map((partner, index) => (
                                <a
                                    key={index}
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 min-w-max border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 group/item"
                                >
                                    {/* Partner Avatar - Larger size */}
                                    <div className="relative">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-primary/60 transition-all shadow-lg">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Youtube Icon Badge */}
                                        <div className="absolute -bottom-1 -right-1 bg-red-600 rounded-full p-1 shadow-md ring-2 ring-black/50">
                                            <Youtube className="w-3 h-3 text-white fill-current" />
                                        </div>
                                    </div>

                                    {/* Partner Name */}
                                    <span className="font-semibold text-base text-text-primary group-hover/item:text-white transition-colors whitespace-nowrap">
                                        {partner.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

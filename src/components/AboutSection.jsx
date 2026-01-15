'use client';

import { Users, Wrench, GraduationCap, MessageSquare, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
    const { t } = useLanguage();

    const offerings = [
        {
            icon: Users,
            title: t('about.community'),
            description: t('about.communityDesc'),
            color: 'primary',
        },
        {
            icon: Wrench,
            title: t('about.tools'),
            description: t('about.toolsDesc'),
            color: 'accent',
        },
        {
            icon: GraduationCap,
            title: t('about.privateClass'),
            description: t('about.privateClassDesc'),
            color: 'primary',
        },
        {
            icon: MessageSquare,
            title: t('about.discord'),
            description: t('about.discordDesc'),
            color: 'accent',
        },
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{t('about.badge')}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="primary-gradient">{t('about.title')}</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
                        {t('about.description')}
                    </p>
                </div>

                {/* Key Offerings Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offerings.map((offering, index) => {
                        const IconComponent = offering.icon;
                        const isPrimary = offering.color === 'primary';

                        return (
                            <div
                                key={index}
                                className="group glass rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg primary-glow-hover"
                            >
                                <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${isPrimary
                                        ? 'bg-gradient-to-br from-primary-dark to-primary group-hover:shadow-lg group-hover:shadow-primary/30'
                                        : 'bg-gradient-to-br from-accent-dark to-accent group-hover:shadow-lg group-hover:shadow-accent/30'
                                    }`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {offering.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {offering.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Value Props */}
                <div className="mt-16 grid sm:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{t('about.riskManagement')}</h4>
                        <p className="text-text-secondary text-sm">{t('about.riskManagementDesc')}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-green" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{t('about.consistentGrowth')}</h4>
                        <p className="text-text-secondary text-sm">{t('about.consistentGrowthDesc')}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                            <Users className="w-8 h-8 text-accent" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{t('about.strongCommunity')}</h4>
                        <p className="text-text-secondary text-sm">{t('about.strongCommunityDesc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

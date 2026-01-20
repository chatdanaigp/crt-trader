'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Crown,
    TrendingUp,
    Users,
    ArrowRight,
    Sparkles,
    Star
} from 'lucide-react';

const discordOptions = [
    {
        id: 'crt-trader',
        name: 'crt.trader Community',
        description: {
            en: 'Join our Discord for chat, trading signals, and support on various topics',
            th: 'เข้าร่วม Discord ของเราสำหรับพูดคุย รับสัญญาณเทรด และรับการสนับสนุนเกี่ยวกับด้านต่างๆ'
        },
        features: [
            { en: 'Exclusive Support', th: 'เข้าถึงการดูแลแบบ Exclusive' },
            { en: 'Trading Signals', th: 'ซิกแนลเทรด' },
            { en: 'Various Support', th: 'สนับสนุนด้านต่างๆ' },
        ],
        link: '/register',
        isExternal: false,
        icon: Crown,
        color: '#5865F2',
        gradient: 'from-[#5865F2] to-[#7289DA]',
        hasVIP: false,
    },
    {
        id: 'master-signal',
        name: 'Master Signal',
        description: {
            en: 'Join Wealthiness Master Signal group for real-time gold trading signals',
            th: 'เข้าร่วมกลุ่ม Wealthiness Master Signal รับสัญญาณเทรดทองคำแบบเรียลไทม์'
        },
        features: [
            { en: 'Real-Time Signals', th: 'สัญญาณเรียลไทม์' },
            { en: 'Expert Analysis', th: 'วิเคราะห์จากผู้เชี่ยวชาญ' },
            { en: '24/7 Support', th: 'ซัพพอร์ต 24/7' },
        ],
        link: '/join-master-signal',
        isExternal: false,
        icon: TrendingUp,
        color: '#8B5CF6',
        gradient: 'from-[#8B5CF6] to-[#A855F7]',
        hasVIP: true,
    },
];

export default function JoinPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-sm text-accent font-medium">
                                    {language === 'th' ? 'เลือกกลุ่มที่ต้องการ' : 'Choose Your Community'}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'เข้าร่วม Discord Community' : 'Join Discord Community'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'เลือกกลุ่ม Discord ที่เหมาะกับคุณ เพื่อรับสัญญาณเทรดและสิทธิพิเศษมากมาย'
                                    : 'Choose the Discord group that suits you to receive trading signals and many exclusive benefits'}
                            </p>
                        </div>

                        {/* Discord Options Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {discordOptions.map((option) => (
                                <Link
                                    key={option.id}
                                    href={option.link}
                                    className="group glass rounded-3xl p-8 border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                                    style={{
                                        '--hover-color': option.color,
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <option.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                        {option.name}
                                        {option.hasVIP && (
                                            <span className="px-2 py-1 text-xs bg-green/20 text-green rounded-full">
                                                VIP
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-text-secondary mb-6">
                                        {option.description[language]}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {option.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <Star className="w-4 h-4" style={{ color: option.color }} />
                                                <span className="text-white">{feature[language]}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <div
                                        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r ${option.gradient} text-white font-semibold group-hover:shadow-lg transition-all duration-300`}
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                        </svg>
                                        <span>
                                            {language === 'th' ? 'เข้าร่วมกลุ่ม' : 'Join Now'}
                                        </span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Info Section */}
                        <div className="glass rounded-2xl p-6 text-center">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <Users className="w-6 h-6 text-primary" />
                                <span className="text-white font-semibold text-lg">
                                    {language === 'th' ? 'เข้าร่วมกับเทรดเดอร์กว่า 2,500+ คน' : 'Join 2,500+ Traders'}
                                </span>
                            </div>
                            <p className="text-text-secondary">
                                {language === 'th'
                                    ? 'ร่วมเป็นส่วนหนึ่งของชุมชนเทรดเดอร์ที่เติบโตเร็วที่สุดในประเทศไทย'
                                    : 'Be part of the fastest growing trading community in Thailand'}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

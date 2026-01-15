'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    MessageSquare,
    Users,
    TrendingUp,
    Shield,
    ArrowRight,
    CheckCircle,
    DollarSign,
    Smartphone,
    Crown,
    Zap,
    ExternalLink
} from 'lucide-react';

const benefits = [
    {
        icon: TrendingUp,
        title: { en: 'Real-Time Signals', th: 'สัญญาณเรียลไทม์' },
        desc: { en: 'Get trading signals as they happen', th: 'รับสัญญาณเทรดแบบเรียลไทม์' }
    },
    {
        icon: Users,
        title: { en: 'Expert Community', th: 'ชุมชนผู้เชี่ยวชาญ' },
        desc: { en: 'Learn from experienced traders', th: 'เรียนรู้จากเทรดเดอร์มืออาชีพ' }
    },
    {
        icon: Shield,
        title: { en: 'Risk Management', th: 'บริหารความเสี่ยง' },
        desc: { en: 'Proper SL/TP guidance included', th: 'มี SL/TP ให้ทุกสัญญาณ' }
    },
    {
        icon: MessageSquare,
        title: { en: '24/7 Support', th: 'ซัพพอร์ต 24/7' },
        desc: { en: 'Always someone to help', th: 'มีทีมช่วยเหลือตลอด' }
    },
];

export default function ContactPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6" style={{ borderColor: '#5865F2' }}>
                                <MessageSquare className="w-4 h-4" style={{ color: '#5865F2' }} />
                                <span className="text-sm font-medium" style={{ color: '#5865F2' }}>Discord Community</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'เข้าร่วมกลุ่ม Master Signal' : 'Join Master Signal Group'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'รับสัญญาณเทรดทองคำแบบเรียลไทม์จากผู้เชี่ยวชาญบน Discord'
                                    : 'Get real-time gold trading signals from experts on Discord'}
                            </p>
                        </div>

                        {/* Discord Preview Card */}
                        <div className="glass rounded-3xl p-8 sm:p-10 mb-12 border-2" style={{ borderColor: 'rgba(88, 101, 242, 0.3)' }}>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Discord Icon */}
                                <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: '#5865F2' }}>
                                    <svg className="w-14 h-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Wealthiness Master Signal
                                    </h2>
                                    <p className="text-text-secondary mb-4">
                                        {language === 'th'
                                            ? 'กลุ่ม Discord สำหรับเทรดเดอร์ที่ต้องการสัญญาณเทรดทองคำคุณภาพสูง'
                                            : 'Discord group for traders who want high-quality gold trading signals'}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-green">
                                            <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                                            <span>1,500+ Members</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-text-secondary">
                                            <Zap className="w-4 h-4 text-yellow-500" />
                                            <span>Active Daily</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="glass rounded-xl p-5 text-center hover:border-primary/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3">
                                        <benefit.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="text-white font-semibold mb-1">{benefit.title[language]}</h4>
                                    <p className="text-text-secondary text-sm">{benefit.desc[language]}</p>
                                </div>
                            ))}
                        </div>

                        {/* Requirements Section */}
                        <div className="glass rounded-2xl p-8 mb-10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Crown className="w-6 h-6 text-accent" />
                                {language === 'th' ? 'เงื่อนไขการเข้ากลุ่ม' : 'Entry Requirements'}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-green" />
                                            {language === 'th' ? 'เปิดพอร์ต ConnextFX' : 'Open ConnextFX Account'}
                                        </h4>
                                        <p className="text-text-secondary text-sm">
                                            {language === 'th'
                                                ? 'สมัครและเปิดบัญชีเทรดกับโบรคเกอร์ ConnextFX'
                                                : 'Register and open trading account with ConnextFX broker'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-green" />
                                            {language === 'th' ? 'ฝากเงิน $1,000' : 'Deposit $1,000'}
                                        </h4>
                                        <p className="text-text-secondary text-sm">
                                            {language === 'th'
                                                ? 'ฝากเงินขั้นต่ำ 1,000 USD เข้าบัญชีเทรด'
                                                : 'Deposit minimum $1,000 USD to your trading account'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                                            <Smartphone className="w-4 h-4 text-green" />
                                            {language === 'th' ? 'แอดไลน์ยืนยัน' : 'Add Line for Verification'}
                                        </h4>
                                        <p className="text-text-secondary text-sm">
                                            {language === 'th'
                                                ? 'แอดไลน์ส่งเลข 5 หลักและสลิปยืนยัน เพื่อขอรับไลน์ Admin Wealthiness'
                                                : 'Add Line, send 5-digit code and slip to receive Admin Wealthiness Line'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <Link
                                href="/master-signal"
                                className="inline-flex items-center gap-3 px-10 py-5 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 group"
                                style={{ background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)', boxShadow: '0 10px 40px rgba(88, 101, 242, 0.3)' }}
                            >
                                <MessageSquare className="w-6 h-6" />
                                {language === 'th' ? 'ดูขั้นตอนการเข้ากลุ่มอย่างละเอียด' : 'View Detailed Entry Steps'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="text-text-secondary text-sm mt-4">
                                {language === 'th'
                                    ? '📋 คลิกเพื่อดูขั้นตอนการสมัครแบบ Step-by-Step'
                                    : '📋 Click to view step-by-step registration guide'}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

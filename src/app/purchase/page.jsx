'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Gift, ShoppingCart, CheckCircle } from 'lucide-react';

const ALGOPRIME_LINK = 'https://algoprime.co/sign-up/?ref=e49746c2-3690-475f-ba82-0c4c58b9eac0';

const stepImages = [
    '/images/tools/algoprime-1.png',
    '/images/tools/algoprime-2.png',
    '/images/tools/algoprime-3.png',
    '/images/tools/algoprime-4.png',
    '/images/tools/algoprime-5.png',
];

export default function PurchasePage() {
    const { t, language } = useLanguage();

    const stepTitles = {
        en: [
            'Go to AlgoPrime Website',
            'How to Purchase via Credit/Debit Card (Visa/MasterCard)',
            'How to Purchase via Crypto USDT',
            'How to Claim Your Purchased Tools',
            'How to Activate Tools in TradingView',
        ],
        th: [
            'ไปที่เว็บ AlgoPrime',
            'วิธีซื้อเครื่องมือผ่านบัตร Credit/Debit Visa และ Master Card',
            'วิธีซื้อเครื่องมือผ่านคริปโต USDT',
            'วิธีกดรับเครื่องมือที่ซื้อแล้ว',
            'วิธีเปิดใช้งานเครื่องมือใน Trading View',
        ],
    };

    const stepDescriptions = {
        en: [
            'Go to the AlgoPrime website using the link below and fill in the information to register.',
            'Select your desired package. For card payments, click "Subscribe".',
            'Select your desired package. For crypto USDT payments, click "Buy".',
            'Claim your purchased tools to install them in TradingView.',
            'Select the tool obtained from AlgoPrime.',
        ],
        th: [
            'ไปที่เว็บไซต์ AlgoPrime จากลิงก์ด้านล่างกรอกข้อมูลเพื่อสมัครสมาชิก',
            'เลือกแพ็คเกจที่ต้องการ สำหรับซื้อผ่านบัตร จะขึ้นว่า "Subscribe"',
            'เลือกแพ็คเกจที่ต้องการ สำหรับซื้อผ่านคริปโต USDT จะขึ้นว่า "Buy"',
            'กดรับเครื่องมือที่ซื้อแล้ว เพื่อติดตั้งเข้า Trading View',
            'เลือกเครื่องมือที่ได้รับจาก AlgoPrime',
        ],
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                {/* Hero Section */}
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('tools.purchase.backToTools')}
                        </Link>

                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <ShoppingCart className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">AlgoPrime</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">{t('tools.purchase.title')}</span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {t('tools.purchase.subtitle')}
                            </p>
                        </div>

                        {/* Register Button */}
                        <div className="flex justify-center mb-12">
                            <a
                                href={ALGOPRIME_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                            >
                                <ExternalLink className="w-5 h-5" />
                                {t('tools.purchase.registerBtn')}
                            </a>
                        </div>

                        {/* Bundle Pricing Section - Moved to top for visibility */}
                        <div className="mb-12 glass rounded-2xl p-8 border-2 border-accent/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Gift className="w-8 h-8 text-accent" />
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {t('tools.purchase.bundleTitle')}
                                    </h2>
                                </div>
                                <p className="text-text-secondary text-lg mb-6">
                                    {t('tools.purchase.bundleDesc')}
                                </p>

                                {/* Bundle Features */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-green" />
                                        <span className="text-white">GSS - Gold Swing Strategy</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-green" />
                                        <span className="text-white">TTS - Trend Tunnel Strategy</span>
                                    </div>
                                </div>

                                {/* Bundle Poster Image */}
                                <div className="rounded-xl overflow-hidden border border-accent/30">
                                    <img
                                        src="/images/tools/bundle-pricing.png"
                                        alt="Bundle Pricing"
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* CTA Button */}
                                <div className="flex justify-center mt-8">
                                    <a
                                        href={ALGOPRIME_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-dark via-accent to-primary text-white font-semibold rounded-xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 hover:scale-105"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {t('tools.purchase.registerBtn')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {stepImages.map((img, index) => (
                                <div key={index} className="glass rounded-2xl p-6 sm:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="text-primary text-sm font-medium mb-1">
                                                {t('tools.purchase.step')} {index + 1}
                                            </p>
                                            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                                                {stepTitles[language][index]}
                                            </h3>
                                            <p className="text-text-secondary">
                                                {stepDescriptions[language][index]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-primary/20">
                                        <img
                                            src={img}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

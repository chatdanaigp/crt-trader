'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ShoppingCart,
    GraduationCap,
    Globe,
    ArrowRight,
    BookOpen
} from 'lucide-react';

export default function HowToPage() {
    const { language } = useLanguage();

    const guideOptions = [
        {
            href: '/purchase',
            icon: ShoppingCart,
            color: 'text-primary',
            bg: 'bg-primary/20',
            title: { en: 'Purchase Tools', th: 'ซื้อเครื่องมือ' },
            description: {
                en: 'Guide for purchasing GSS/TTS trading tools',
                th: 'วิธีการสั่งซื้อเครื่องมือเทรด GSS/TTS'
            }
        },
        {
            href: '/private-class',
            icon: GraduationCap,
            color: 'text-accent',
            bg: 'bg-accent/20',
            title: { en: 'Private Class', th: 'สมัคร Private Class' },
            description: {
                en: 'Register for exclusive private trading classes',
                th: 'วิธีการสมัครเรียนคลาสส่วนตัวแบบ Exclusive'
            }
        },
        {
            href: '/connext-guide',
            icon: Globe,
            color: 'text-green',
            bg: 'bg-green/20',
            title: { en: 'Open ConnextFX Account', th: 'เปิดพอร์ต ConnextFX' },
            description: {
                en: 'Step-by-step guide to open trading account',
                th: 'คู่มือการเปิดบัญชีและสมัครโบรคเกอร์ ConnextFX'
            }
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-white/10">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-white">Knowledge Base</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'คู่มือการใช้งาน' : 'How to'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'รวบรวมวิธีการใช้งานและการสมัครบริการต่างๆ ของเราไว้ในที่เดียว'
                                    : 'Comprehensive guides for all our services and tools in one place'}
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                            {guideOptions.map((option, index) => (
                                <Link
                                    key={index}
                                    href={option.href}
                                    className="group glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${option.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <option.icon className={`w-7 h-7 ${option.color}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {option.title[language]}
                                    </h3>

                                    <p className="text-text-secondary mb-8 h-12">
                                        {option.description[language]}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-primary transition-colors">
                                        <span>{language === 'th' ? 'ดูขั้นตอน' : 'View Guide'}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

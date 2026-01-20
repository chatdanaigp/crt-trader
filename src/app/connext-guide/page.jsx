'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Globe,
    ExternalLink,
    ArrowRight,
    MessageSquare
} from 'lucide-react';

const CONNEXT_TH = 'https://clients.svg.connextfx.com/links/go/1544';
const CONNEXT_GLOBAL = 'https://clients.svg.connextfx.com/links/go/2172';

export default function ConnextGuidePage() {
    const { language } = useLanguage();

    const steps = [
        {
            title: {
                en: 'Step 1: Register with ConnextFX Broker',
                th: 'ขั้นตอนที่ 1 กดลิงค์สมัครใช้งานโบรคเกอร์ ConnextFX'
            },
            content: {
                en: 'Choose the link that matches your region',
                th: 'เลือกลิงก์ที่ตรงกับภูมิภาคของคุณ'
            },
            links: [
                { label: { en: '🇹🇭 For Thai', th: '🇹🇭 สำหรับคนไทย' }, url: CONNEXT_TH },
                { label: { en: '🌍 For Global', th: '🌍 สำหรับต่างชาติ (Global)' }, url: CONNEXT_GLOBAL },
            ],
            image: '/images/tools/connext-1.png'
        },
        {
            title: {
                en: 'Step 2: Broker Account Type Recommendation',
                th: 'ขั้นตอนที่ 2 วิธีเปิดพอร์ตเทรด มือใหม่แนะนำ บัญชี Standard'
            },
            image: '/images/regis/regis-1.png'
        },
        {
            title: {
                en: 'Step 3: Connect Account to MT5',
                th: 'ขั้นตอนที่ 3 เชื่อมพอร์ตเข้า MT5'
            },
            image: '/images/regis/regis-2.png'
        },
        {
            title: {
                en: 'Step 4: Deposit Funds',
                th: 'ขั้นตอนที่ 4 ฝากเงิน เข้าพอร์ตเทรด'
            },
            images: [
                { src: '/images/regis/regis-3.png', caption: { en: 'Deposit Options', th: 'ช่องทางการฝากเงิน' } },
                { src: '/images/regis/regis-4.png', caption: { en: 'Deposit USDT', th: 'ฝากเงิน USDT' } }
            ]
        },
        {
            title: {
                en: 'Step 5: Withdraw Funds',
                th: 'ขั้นตอนที่ 5 ถอนเงินเข้าธนาคาร'
            },
            images: [
                { src: '/images/regis/regis-5.png', caption: { en: 'Withdraw to Bank', th: 'ถอนเงินเข้าธนาคาร' } },
                { src: '/images/regis/regis-6.png', caption: { en: 'Withdraw USDT', th: 'ถอนเงิน USDT' } }
            ]
        },
        {
            title: {
                en: 'Step 6: How to Redeem Rewards',
                th: 'ขั้นตอนที่ 6 วิธีกดแลกของรางวัล'
            },
            image: '/images/regis/regis-7.png'
        },
        {
            title: {
                en: 'Step 7: View 5-Digit Connext Code',
                th: 'ขั้นตอนที่ 7 ดูเลข 5 หลัก Connext'
            },
            image: '/images/regis/regis-8.png'
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16">
                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <Link href="/join-master-signal" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-6">
                                <ArrowRight className="w-4 h-4 rotate-180" />
                                <span>{language === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
                            </Link>

                            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'วิธีการสมัครเปิดพอร์ต ConnextFX' : 'How to open ConnextFX account'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg">
                                {language === 'th' ? 'ขั้นตอนโดยละเอียดสำหรับมือใหม่' : 'Detailed guide for beginners'}
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div key={index} className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>

                                    {/* Step Header */}
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                            {index + 1}
                                        </div>
                                        {step.title[language]}
                                    </h2>

                                    {/* Step Content */}
                                    <div className="pl-12">
                                        {step.content && (
                                            <p className="text-text-secondary mb-6">{step.content[language]}</p>
                                        )}

                                        {/* Links for Step 1 */}
                                        {step.links && (
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                {step.links.map((link, i) => (
                                                    <a
                                                        key={i}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                                                    >
                                                        <Globe className="w-4 h-4" />
                                                        {link.label[language]}
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {/* Single Image */}
                                        {step.image && (
                                            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={step.image}
                                                    alt={`Step ${index + 1}`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        )}

                                        {/* Multiple Images */}
                                        {step.images && (
                                            <div className="space-y-6">
                                                {step.images.map((img, i) => (
                                                    <div key={i}>
                                                        {img.caption && (
                                                            <div className="text-sm text-text-secondary mb-2 font-medium">
                                                                {img.caption[language]}
                                                            </div>
                                                        )}
                                                        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                                            <img
                                                                src={img.src}
                                                                alt={`Step ${index + 1} - ${i + 1}`}
                                                                className="w-full h-auto"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-16 text-center">
                            <Link
                                href="/join-master-signal"
                                className="inline-flex items-center gap-2 px-8 py-4 glass text-primary font-bold rounded-xl hover:bg-primary/10 transition-all"
                            >
                                <ArrowRight className="w-5 h-5 rotate-180" />
                                {language === 'th' ? 'กลับไปหน้าเข้าร่วมกลุ่ม' : 'Back to Join Group'}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ArrowLeft,
    MessageSquare,
    CreditCard,
    FileText,
    ExternalLink,
    MessageCircle,
    Users,
    CheckCircle,
    Globe
} from 'lucide-react';

const CRT_LINE = 'https://lin.ee/6a3YGpI';
const CONNEXT_TH = 'https://clients.svg.connextfx.com/links/go/1544';
const CONNEXT_GLOBAL = 'https://clients.svg.connextfx.com/links/go/2172';

const steps = [
    {
        image: '/images/tools/connext-1.png',
        title: {
            en: 'Step 1: Register with ConnextFX Broker',
            th: 'ขั้นตอนที่ 1 กดลิงค์สมัครใช้งานโบรคเกอร์ ConnextFX'
        },
        description: {
            en: 'Choose the link that matches your region',
            th: 'เลือกลิงก์ที่ตรงกับภูมิภาคของคุณ'
        },
        links: [
            { label: { en: '🇹🇭 For Thai', th: '🇹🇭 สำหรับคนไทย' }, url: CONNEXT_TH },
            { label: { en: '🌍 For Global', th: '🌍 สำหรับต่างชาติ (Global)' }, url: CONNEXT_GLOBAL },
        ],
        hasGuide: true,
        icon: Globe,
    },
    {
        image: '/images/tools/master-signal-1.jpg',
        title: {
            en: 'Step 2: Prepare Important Information',
            th: 'ขั้นตอนที่ 2 เตรียมข้อมูลสำคัญ'
        },
        description: {
            en: 'Prepare your information and add Line crt.trader, send verification slip to receive Admin Wealthiness Line for the next step',
            th: 'เตรียมข้อมูลสำคัญและแอดไลน์ crt.trader ส่งสลิปยืนยัน เพื่อขอรับไลน์ Admin Wealthiness สำหรับขั้นตอนถัดไป'
        },
        link: CRT_LINE,
        linkText: { en: 'Add Line crt.trader', th: 'แอดไลน์ crt.trader' },
        icon: MessageCircle,
    },
    {
        image: '/images/tools/master-signal-2.jpg',
        title: {
            en: 'Step 3: How to Join Master Signal Group',
            th: 'ขั้นตอนที่ 3 วิธีการเข้ากลุ่ม Master Signal'
        },
        description: {
            en: 'Add Line Admin Wealthiness (receive from Step 2)',
            th: 'แอดไลน์ Admin Wealthiness (ขอรับได้จากขั้นตอนที่ 2)'
        },
        icon: Users,
    },
    {
        image: '/images/tools/master-signal-3.jpg',
        title: {
            en: 'Step 4: Fill in the Information',
            th: 'ขั้นตอนที่ 4 กรอกข้อมูล'
        },
        description: {
            en: 'Referrer Name: Tiew\nReferrer 5-digit Code: 78619',
            th: 'ชื่อผู้แนะนำ : ติ้ว\nเลข 5 หลัก ผู้แนะนำ : 78619'
        },
        icon: FileText,
    },
];

export default function MasterSignalPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === 'th' ? 'กลับไปหน้าเข้าร่วมกลุ่ม' : 'Back to Join Group'}
                        </Link>

                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold mb-6" style={{ background: '#5865F2' }}>
                                <MessageSquare className="w-4 h-4" />
                                <span>Master Signal</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'ขั้นตอนการเข้ากลุ่ม Master Signal' : 'Master Signal Entry Steps'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'ทำตามขั้นตอนเหล่านี้เพื่อเข้าร่วมกลุ่ม Discord Master Signal'
                                    : 'Follow these steps to join the Discord Master Signal group'}
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="glass rounded-2xl p-6 sm:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)' }}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <step.icon className="w-5 h-5" style={{ color: '#5865F2' }} />
                                                <span className="text-sm font-medium" style={{ color: '#5865F2' }}>
                                                    {language === 'th' ? `ขั้นตอนที่ ${index + 1}` : `Step ${index + 1}`}
                                                </span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                                                {step.title[language]}
                                            </h3>
                                            <p className="text-text-secondary whitespace-pre-line">
                                                {step.description[language]}
                                            </p>

                                            {/* Multiple Links for Step 1 */}
                                            {step.links && (
                                                <div className="flex flex-wrap gap-3 mt-4">
                                                    {step.links.map((link, i) => (
                                                        <a
                                                            key={i}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                                                        >
                                                            {link.label[language]}
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Optional Guide Button */}
                                            {step.hasGuide && (
                                                <Link
                                                    href="/connext-guide"
                                                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 glass text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-all"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    {language === 'th'
                                                        ? 'ดูวิธีการสมัครใช้งานโบรคเกอร์ ConnextFX'
                                                        : 'View ConnextFX registration guide'}
                                                </Link>
                                            )}

                                            {/* Single Link */}
                                            {step.link && (
                                                <a
                                                    href={step.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-green to-green/80 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-105"
                                                >
                                                    <MessageCircle className="w-5 h-5" />
                                                    {step.linkText[language]}
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(88, 101, 242, 0.2)' }}>
                                        <img
                                            src={step.image}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Important Note */}
                        <div className="mt-10 glass rounded-2xl p-6 border border-yellow-500/30 bg-yellow-500/5">
                            <h4 className="text-yellow-500 font-semibold text-lg mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                {language === 'th' ? 'สิ่งสำคัญ' : 'Important'}
                            </h4>
                            <ul className="space-y-2 text-yellow-500/90">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                                    <span>
                                        {language === 'th'
                                            ? 'กรุณาระบุชื่อผู้แนะนำ "ติ้ว" และเลข 5 หลัก "78619" ให้ถูกต้อง'
                                            : 'Please enter referrer name "Tiew" and code "78619" correctly'}
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                                    <span>
                                        {language === 'th'
                                            ? 'ต้องเปิดพอร์ตและฝากเงินขั้นต่ำ $1,000 USD ก่อนจึงจะเข้ากลุ่มได้'
                                            : 'You must open an account and deposit minimum $1,000 USD before joining'}
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                                    <span>
                                        {language === 'th'
                                            ? 'หลังทำครบทุกขั้นตอน Admin จะส่งลิงก์เข้ากลุ่ม Discord ให้'
                                            : 'After completing all steps, Admin will send you the Discord invite link'}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Final CTA */}
                        <div className="mt-10 text-center">
                            <a
                                href={CRT_LINE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                                style={{ background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)', boxShadow: '0 10px 40px rgba(88, 101, 242, 0.3)' }}
                            >
                                <MessageCircle className="w-6 h-6" />
                                {language === 'th' ? 'แอดไลน์เพื่อเริ่มสมัคร' : 'Add Line to Start'}
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

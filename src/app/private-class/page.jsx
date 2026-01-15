'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ArrowLeft,
    Crown,
    CreditCard,
    MessageCircle,
    FileText,
    CheckCircle,
    ExternalLink,
    Users,
    Clock,
    BookOpen
} from 'lucide-react';

const LINE_LINK = 'https://lin.ee/6a3YGpI';

const steps = [
    {
        image: '/images/tools/private-class-2.png',
        title: {
            en: 'Apply for Private Class: SMC Hawk Trader',
            th: 'สมัคร Private Class : SMC Hawk Trader'
        },
        description: {
            en: 'Trading course for beginners, easy to understand, hands-on learning "Full 1 Year Course"',
            th: 'เรียนเทรดสำหรับมือใหม่ สอนเข้าใจง่าย ฉบับจับมือทำ "เรียน 1 ปีเต็ม"'
        },
        content: {
            en: 'Payment via Kasikorn Bank Account: Wealthiness Trading Co., Ltd.\nAccount Number: 175-3-50574-8',
            th: 'ชำระเงินผ่านบัญชี ธ.กสิกรไทย : บจก.เวลธ์ติเนส เทรดดิ้ง\nเลขบัญชี 175-3-50574-8'
        },
        icon: CreditCard,
    },
    {
        image: '/images/tools/private-class-3.png',
        title: {
            en: 'How to Apply for Private Class: SMC Hawk Trader',
            th: 'วิธีขอสมัครเรียน Private Class : SMC Hawk Trader'
        },
        description: {
            en: 'Add Line crt.trader and send payment slip to receive Admin Wealthiness Line for the next steps',
            th: 'แอดไลน์ crt.trader และส่งสลิปการโอนเงิน เพื่อรับไลน์ Admin Wealthiness สำหรับดำเนินการขั้นถัดไป'
        },
        link: LINE_LINK,
        linkText: { en: 'Add Line crt.trader', th: 'แอดไลน์ crt.trader' },
        icon: MessageCircle,
    },
    {
        image: '/images/tools/private-class-4.png',
        title: {
            en: 'Fill in the Information',
            th: 'กรอกข้อมูล'
        },
        description: {
            en: 'Referrer Name: Tiew\nReferrer 5-digit Code: 78619',
            th: 'ชื่อผู้แนะนำ : ติ้ว\nเลข 5 หลัก ผู้แนะนำ : 78619'
        },
        icon: FileText,
    },
];

export default function PrivateClassPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            href="/learn"
                            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === 'th' ? 'กลับไปหน้าเรียนฟรี' : 'Back to Free Learning'}
                        </Link>

                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white text-sm font-semibold mb-6">
                                <Crown className="w-4 h-4" />
                                <span>Private Class</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'สมัคร Private Class' : 'Apply for Private Class'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'ขั้นตอนการสมัครและชำระเงินเพื่อเข้าเรียน'
                                    : 'Steps to apply and pay for enrollment'}
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className="mb-12 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-xl shadow-accent/10">
                            <img
                                src="/images/tools/private-class-1.png"
                                alt="Private Class"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Course Highlights */}
                        <div className="grid sm:grid-cols-3 gap-4 mb-12">
                            <div className="glass rounded-xl p-5 text-center">
                                <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-1">
                                    {language === 'th' ? 'เรียน 1 ปีเต็ม' : 'Full 1 Year'}
                                </h4>
                                <p className="text-text-secondary text-sm">
                                    {language === 'th' ? 'คอร์สเต็มรูปแบบ' : 'Complete course'}
                                </p>
                            </div>
                            <div className="glass rounded-xl p-5 text-center">
                                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-1">
                                    {language === 'th' ? 'สอนตัวต่อตัว' : '1-on-1 Teaching'}
                                </h4>
                                <p className="text-text-secondary text-sm">
                                    {language === 'th' ? 'จับมือทำจริง' : 'Hands-on learning'}
                                </p>
                            </div>
                            <div className="glass rounded-xl p-5 text-center">
                                <Clock className="w-8 h-8 text-green mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-1">
                                    {language === 'th' ? 'เหมาะสำหรับมือใหม่' : 'For Beginners'}
                                </h4>
                                <p className="text-text-secondary text-sm">
                                    {language === 'th' ? 'สอนเข้าใจง่าย' : 'Easy to understand'}
                                </p>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="glass rounded-2xl p-6 sm:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <step.icon className="w-5 h-5 text-accent" />
                                                <span className="text-accent text-sm font-medium">
                                                    {language === 'th' ? `ขั้นตอนที่ ${index + 1}` : `Step ${index + 1}`}
                                                </span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                                                {step.title[language]}
                                            </h3>
                                            <p className="text-text-secondary whitespace-pre-line">
                                                {step.description[language]}
                                            </p>
                                            {step.content && (
                                                <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-xl">
                                                    <p className="text-white font-medium whitespace-pre-line">
                                                        {step.content[language]}
                                                    </p>
                                                </div>
                                            )}
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
                                    <div className="rounded-xl overflow-hidden border border-accent/20">
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
                                            ? 'หลังชำระเงินแล้ว ส่งสลิปให้ Admin ผ่าน Line เพื่อยืนยัน'
                                            : 'After payment, send the slip to Admin via Line for confirmation'}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Final CTA */}
                        <div className="mt-10 text-center">
                            <a
                                href={LINE_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-lg rounded-2xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 hover:scale-105"
                            >
                                <MessageCircle className="w-6 h-6" />
                                {language === 'th' ? 'แอดไลน์สมัครเรียนเลย' : 'Add Line to Apply Now'}
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

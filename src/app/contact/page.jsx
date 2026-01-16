'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    MessageCircle,
    Phone,
    Send,
    ExternalLink,
    Youtube,
    Instagram
} from 'lucide-react';

const socialLinks = [
    {
        name: 'YouTube',
        handle: 'crt.trader',
        url: 'https://www.youtube.com/@tiw.crt.trader',
        icon: Youtube,
        color: '#FF0000',
        bgGradient: 'from-red-600 to-red-700',
        desc: { en: 'Watch trading tutorials & analysis', th: 'ดูวิดีโอสอนเทรดและวิเคราะห์ตลาด' }
    },
    {
        name: 'TikTok',
        handle: 'crt.trader',
        url: 'https://www.tiktok.com/@tixwz',
        icon: () => (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.33 6.33 0 0 0 10.86-4.43V9.84a8.16 8.16 0 0 0 4.77 1.52V8a4.85 4.85 0 0 1-1.04-.31z" />
            </svg>
        ),
        color: '#000000',
        bgGradient: 'from-gray-800 to-black',
        desc: { en: 'Short trading tips & insights', th: 'เคล็ดลับเทรดสั้นๆ และ insights' }
    },
    {
        name: 'Instagram',
        handle: 'crt.trader.official',
        url: 'https://www.instagram.com/crt.trader.official/',
        icon: Instagram,
        color: '#E4405F',
        bgGradient: 'from-pink-500 via-red-500 to-yellow-500',
        desc: { en: 'Daily updates & behind the scenes', th: 'อัพเดทรายวันและเบื้องหลัง' }
    },
    {
        name: 'Line OA',
        handle: 'crt.trader',
        url: 'https://lin.ee/CPrLL9Q',
        icon: () => (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
        ),
        color: '#00B900',
        bgGradient: 'from-green-500 to-green-600',
        desc: { en: 'Chat with us directly', th: 'แชทกับเราโดยตรง' }
    },
    {
        name: 'Telegram',
        handle: '@crttradersig',
        url: 'https://t.me/crttradersig',
        icon: Send,
        color: '#0088CC',
        bgGradient: 'from-blue-500 to-blue-600',
        desc: { en: 'Join our signal channel', th: 'เข้าร่วมช่องสัญญาณเทรด' }
    },
    {
        name: 'WhatsApp',
        handle: '+66 89 369 7951',
        url: 'https://wa.me/66893697951',
        icon: () => (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        color: '#25D366',
        bgGradient: 'from-green-400 to-green-500',
        desc: { en: 'Quick support & inquiries', th: 'สอบถามและติดต่อเร็ว' }
    }
];

export default function ContactPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <MessageCircle className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">
                                    {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'ช่องทางติดต่อ' : 'Get In Touch'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {language === 'th'
                                    ? 'ติดตามข่าวสาร เทคนิคการเทรด และติดต่อเราผ่านช่องทางต่างๆ ได้เลย'
                                    : 'Follow us for trading tips, updates, and connect with us through various platforms'}
                            </p>
                        </div>

                        {/* Social Media Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-transparent hover:border-white/10"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div
                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.bgGradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}
                                            >
                                                <IconComponent className="w-7 h-7" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-white font-bold text-lg">{social.name}</h3>
                                                    <ExternalLink className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <p className="text-primary font-medium text-sm truncate">@{social.handle}</p>
                                                <p className="text-text-secondary text-sm mt-1">{social.desc[language]}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Quick Contact CTA */}
                        <div className="glass rounded-3xl p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <Phone className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                {language === 'th' ? 'ต้องการความช่วยเหลือ?' : 'Need Help?'}
                            </h2>
                            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                                {language === 'th'
                                    ? 'ทีมงานพร้อมช่วยเหลือคุณตลอด 24/7 ติดต่อเราผ่าน Line หรือ WhatsApp ได้เลย'
                                    : 'Our team is available 24/7 to help you. Contact us via Line or WhatsApp'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="https://lin.ee/CPrLL9Q"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                    {language === 'th' ? 'แชทผ่าน Line' : 'Chat on Line'}
                                </Link>
                                <Link
                                    href="https://wa.me/66893697951"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 glass border border-green-500/30 text-white font-bold rounded-xl hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {language === 'th' ? 'แชทผ่าน WhatsApp' : 'Chat on WhatsApp'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

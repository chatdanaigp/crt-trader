'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Users,
    TrendingUp,
    DollarSign,
    Gift,
    ArrowRight,
    Sparkles,
    CheckCircle,
    Rocket
} from 'lucide-react';

const reasons = [
    {
        icon: Users,
        title: { en: 'Solving Pain Points', th: 'แก้ 4 ปัญหาใหญ่ให้นักเทรด' },
        description: {
            en: 'Help traders overcome lack of knowledge, tools, and mentors.',
            th: 'ช่วยนักเทรดก้าวข้ามปัญหาขาดความรู้ ขาดเครื่องมือ และขาดพี่เลี้ยง'
        },
        points: {
            en: [
                'Wealthinet Academy: Education system',
                'Algo Prime: Analytics tools (GSS, TTS)',
                'ConnextFX: Trusted Partner Broker',
                'Mentorship system'
            ],
            th: [
                'Wealthinet Academy: ระบบการสอนครบวงจร',
                'Algo Prime: เครื่องมือช่วยวิเคราะห์ (GSS, TTS)',
                'ConnextFX: โบรกเกอร์ที่ปลอดภัย',
                'ระบบพี่เลี้ยงดูแลใกล้ชิด'
            ]
        }
    },
    {
        icon: TrendingUp,
        title: { en: 'Sustainable Business Model', th: 'โมเดลธุรกิจที่ใหญ่และยั่งยืน' },
        description: {
            en: 'Low risk, no stock required, and passive income opportunities.',
            th: 'ความเสี่ยงต่ำ ไม่ต้องสต๊อกของ และมีโอกาสสร้างรายได้แบบ Passive'
        },
        points: {
            en: [
                'Platform Business: Digital Nomad lifestyle',
                'Digital Product: No stock, Cloud-based',
                'Big Market: Forex & Gold are huge',
                'Recurring Income with no earning ceiling'
            ],
            th: [
                'ธุรกิจ Platform: เชื่อมคนเทรดกับบริการ Digital Nomad ทำงานที่ไหนเมื่อไหร่ก็ได้',
                'ไร้ภาระ: สินค้า Digital ไม่ต้องส่งของ',
                'ตลาดใหญ่: Forex & ทองคำ อยู่ได้ยาว',
                'รายได้ต่อเนื่อง (Recurring Income) และไม่มีเพดานรายได้'
            ]
        }
    },
    {
        icon: CheckCircle,
        title: { en: 'Strong Ecosystem', th: 'ระบบนิเวศ 4 Partners สุดแกร่ง' },
        description: {
            en: 'Comprehensive support system for all aspects of success.',
            th: 'ระบบสนับสนุนครบวงจรทั้ง 4 ด้านเพื่อความสำเร็จ'
        },
        points: {
            en: [
                'Academy: Trading education & signals',
                'Algo Prime: Production & Tools',
                'ConnextFX: Everyone Win Broker Model',
                'ABA 100x: Business Platform'
            ],
            th: [
                'Academy: สถาบันสอนเทรด',
                'Algo Prime: ผู้ผลิตเครื่องมือ',
                'ConnextFX: โบรกเกอร์ "Everyone Win"',
                'ABA 100x: แพลตฟอร์มสอนทำธุรกิจ'
            ]
        }
    },
    {
        icon: DollarSign,
        title: { en: 'Proven Results', th: 'ผลลัพธ์ที่จับต้องได้' },
        description: {
            en: 'Multiple income streams and real success stories.',
            th: 'ช่องทางรายได้หลากหลายและตัวอย่างความสำเร็จจริง'
        },
        points: {
            en: [
                '5 Income Channels',
                'Success stories from Gen Z to Business owners',
                'From trading alone to Community Builder',
                'Win-Win-Win Model'
            ],
            th: [
                'รายได้ 5 ช่องทาง',
                'ตัวอย่างความสำเร็จหลากหลายอาชีพ',
                'เปลี่ยนจาก "เทรดเดอร์เดี่ยว" เป็น "ผู้สร้างชุมชน"',
                'โมเดล Win-Win-Win'
            ]
        }
    },
];

export default function AffiliatePage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                <section className="relative py-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <Sparkles className="w-4 h-4 text-green" />
                                <span className="text-sm text-green font-medium">
                                    {language === 'th' ? 'โปรแกรม Affiliate' : 'Affiliate Program'}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'ร่วมเป็น Affiliate กับเรา' : 'Join Our Affiliate Program'}
                                </span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-5xl mx-auto">
                                {language === 'th'
                                    ? 'สร้างรายได้ Passive Income ด้วยการเปลี่ยนจากเทรดเดอร์มาเป็นนักธุรกิจเต็มตัว ร่วมสร้างสิ่งดีๆให้สังคม'
                                    : 'Create Passive Income by transforming from a trader into a full-time entrepreneur, creating value for society together.'}
                            </p>
                        </div>

                        {/* Video Section */}
                        <div className="glass rounded-3xl p-6 sm:p-8 mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                                <Rocket className="w-6 h-6 text-green" />
                                {language === 'th' ? 'เรียนรู้เพิ่มเติม' : 'Learn More'}
                            </h2>
                            <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/2BgErmbnFq0"
                                    title="Affiliate Program Introduction"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Why Join Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                                <span className="primary-gradient">
                                    {language === 'th' ? 'ทำไมต้องเข้าร่วม?' : 'Why Join?'}
                                </span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {reasons.map((reason, index) => (
                                    <div
                                        key={index}
                                        className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-green/20 flex items-center justify-center flex-shrink-0">
                                                <reason.icon className="w-6 h-6 text-green" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {reason.title[language]}
                                                </h3>
                                                <p className="text-text-secondary text-sm">
                                                    {reason.description[language]}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pl-2">
                                            {reason.points[language].map((point, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green/70 flex-shrink-0 mt-1" />
                                                    <span className="text-sm text-gray-300">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <div className="glass rounded-2xl p-8 inline-block">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {language === 'th' ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {language === 'th'
                                        ? 'ติดต่อเราเพื่อสมัครเป็น Affiliate วันนี้'
                                        : 'Contact us to become an Affiliate today'}
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green/30 hover:scale-105 transition-all duration-300"
                                >
                                    {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                                    <ArrowRight className="w-5 h-5" />
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

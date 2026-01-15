'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Play,
    BookOpen,
    Users,
    Target,
    Clock,
    MessageCircle,
    Trophy,
    Star,
    Sparkles,
    ArrowRight,
    CheckCircle,
    Zap,
    TrendingUp,
    Crown
} from 'lucide-react';

// Sample video data - You can replace with actual YouTube video IDs
const videos = [
    {
        id: 'video1',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'basics',
        title: { en: 'Introduction to Gold Trading', th: 'บทนำการเทรดทอง' },
        description: { en: 'Learn the fundamentals of gold trading and market analysis', th: 'เรียนรู้พื้นฐานการเทรดทองและการวิเคราะห์ตลาด' },
        duration: '15:30',
    },
    {
        id: 'video2',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'basics',
        title: { en: 'Understanding Candlestick Patterns', th: 'เข้าใจรูปแบบแท่งเทียน' },
        description: { en: 'Master the art of reading candlestick charts', th: 'เชี่ยวชาญการอ่านกราฟแท่งเทียน' },
        duration: '22:45',
    },
    {
        id: 'video3',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'basics',
        title: { en: 'Support and Resistance Basics', th: 'พื้นฐาน Support และ Resistance' },
        description: { en: 'Identify key price levels for better entries', th: 'ระบุระดับราคาสำคัญเพื่อจุดเข้าที่ดีกว่า' },
        duration: '18:20',
    },
    {
        id: 'video4',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'advanced',
        title: { en: 'Smart Money Concept (SMC)', th: 'แนวคิด Smart Money (SMC)' },
        description: { en: 'Trade like institutional traders with SMC', th: 'เทรดเหมือนสถาบันด้วย SMC' },
        duration: '35:15',
    },
    {
        id: 'video5',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'advanced',
        title: { en: 'Order Block Trading Strategy', th: 'กลยุทธ์ Order Block' },
        description: { en: 'Find high-probability entry zones', th: 'หาโซนเข้าที่มีโอกาสสูง' },
        duration: '28:40',
    },
    {
        id: 'video6',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        category: 'advanced',
        title: { en: 'Risk Management Masterclass', th: 'การจัดการความเสี่ยงมืออาชีพ' },
        description: { en: 'Protect your capital like a pro', th: 'ปกป้องเงินทุนของคุณอย่างมืออาชีพ' },
        duration: '25:10',
    },
];

function VideoCard({ video, language, onClick }) {
    return (
        <div
            onClick={onClick}
            className="glass rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-sm font-medium">
                    {video.duration}
                </div>
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${video.category === 'basics'
                        ? 'bg-green/20 text-green border border-green/30'
                        : 'bg-accent/20 text-accent border border-accent/30'
                        }`}>
                        {video.category === 'basics' ? 'พื้นฐาน' : 'ขั้นสูง'}
                    </span>
                </div>
            </div>
            {/* Content */}
            <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {video.title[language]}
                </h3>
                <p className="text-text-secondary text-sm">
                    {video.description[language]}
                </p>
            </div>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, description }) {
    return (
        <div className="glass rounded-xl p-6 hover:border-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-accent" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">{title}</h4>
            <p className="text-text-secondary text-sm">{description}</p>
        </div>
    );
}

export default function LearnPage() {
    const { t, language } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    const filteredVideos = filter === 'all'
        ? videos
        : videos.filter(v => v.category === filter);

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

                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Free Education</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                <span className="primary-gradient">{t('tools.learning.title')}</span>
                            </h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {t('tools.learning.subtitle')}
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex justify-center gap-3 mb-10">
                            {[
                                { key: 'all', label: { en: 'All Videos', th: 'ทั้งหมด' } },
                                { key: 'basics', label: { en: 'Basics', th: 'พื้นฐาน' } },
                                { key: 'advanced', label: { en: 'Advanced', th: 'ขั้นสูง' } },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === tab.key
                                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30'
                                        : 'glass text-text-secondary hover:text-white hover:border-primary/50'
                                        }`}
                                >
                                    {tab.label[language]}
                                </button>
                            ))}
                        </div>

                        {/* Video Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                            {filteredVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    language={language}
                                    onClick={() => setSelectedVideo(video)}
                                />
                            ))}
                        </div>

                        {/* ============================================ */}
                        {/* PRIVATE CLASS UPSELL SECTION */}
                        {/* ============================================ */}
                        <div className="relative">
                            <div className="glass rounded-3xl p-8 sm:p-12 border-2 border-accent/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>

                                <div className="relative z-10">
                                    {/* Header with Limited Badge */}
                                    <div className="text-center mb-10">
                                        {/* Limited Badge - centered */}
                                        <div className="flex justify-center mb-6">
                                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-base font-bold animate-pulse shadow-lg shadow-red-500/30">
                                                <Sparkles className="w-5 h-5" />
                                                🔥 {t('tools.learning.limited')}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                            {t('tools.learning.privateTitle')}
                                        </h2>
                                        <p className="text-xl text-accent font-medium mb-4">
                                            {t('tools.learning.privateSubtitle')}
                                        </p>
                                        <p className="text-text-secondary max-w-2xl mx-auto">
                                            {t('tools.learning.privateDesc')}
                                        </p>
                                    </div>

                                    {/* Pain Points */}
                                    <div className="glass rounded-2xl p-6 mb-8 border border-yellow-500/20 bg-yellow-500/5">
                                        <h3 className="text-yellow-500 font-semibold text-lg mb-4 flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5" />
                                            {language === 'th' ? 'คุณเคยรู้สึกแบบนี้ไหม?' : 'Do you feel this way?'}
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {[
                                                { th: 'เทรดไปเรื่อยๆ แต่ไม่เห็นผลลัพธ์ที่ชัดเจน', en: 'Trading aimlessly without clear results' },
                                                { th: 'ไม่มีคนคอยแนะนำเมื่อเจอปัญหา', en: 'No one to guide you when problems arise' },
                                                { th: 'ดูวิดีโอมากมาย แต่ยังไม่รู้จะเริ่มยังไง', en: 'Watched many videos but still confused' },
                                                { th: 'อยากมีระบบที่ชัดเจนและทำได้จริง', en: 'Want a clear, actionable system' },
                                            ].map((point, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                                                    <span className="text-yellow-500/90 text-sm">{point[language]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Benefits Grid */}
                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        <BenefitCard
                                            icon={Users}
                                            title={t('tools.learning.benefit1')}
                                            description={t('tools.learning.benefit1Desc')}
                                        />
                                        <BenefitCard
                                            icon={Target}
                                            title={t('tools.learning.benefit2')}
                                            description={t('tools.learning.benefit2Desc')}
                                        />
                                        <BenefitCard
                                            icon={MessageCircle}
                                            title={t('tools.learning.benefit3')}
                                            description={t('tools.learning.benefit3Desc')}
                                        />
                                        <BenefitCard
                                            icon={TrendingUp}
                                            title={t('tools.learning.benefit4')}
                                            description={t('tools.learning.benefit4Desc')}
                                        />
                                    </div>

                                    {/* What You Get */}
                                    <div className="glass rounded-2xl p-6 mb-8">
                                        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-primary" />
                                            {language === 'th' ? 'สิ่งที่คุณจะได้รับ' : 'What You Get'}
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {[
                                                { th: 'เรียน 1-on-1 ผ่าน Video Call', en: '1-on-1 Video Call Sessions' },
                                                { th: 'วิเคราะห์ปัญหาการเทรดของคุณ', en: 'Analyze your trading problems' },
                                                { th: 'แผนการเทรดส่วนตัว', en: 'Personalized trading plan' },
                                                { th: 'ติดตามผลและ feedback ต่อเนื่อง', en: 'Continuous follow-up & feedback' },
                                                { th: 'กลุ่ม VIP สำหรับถามตอบ', en: 'VIP Q&A group access' },
                                                { th: 'สอนจนกว่าจะทำกำไรได้', en: 'Training until profitability' },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                                    <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                                                    <span className="text-white text-sm">{item[language]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial Teaser */}
                                    <div className="text-center mb-8">
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-text-secondary italic">
                                            "{language === 'th'
                                                ? 'จากคนที่เคยขาดทุนมาตลอด ตอนนี้ทำกำไรได้สม่ำเสมอแล้ว ขอบคุณพี่มากครับ!'
                                                : 'From constant losses to consistent profits. Thank you so much!'}"
                                        </p>
                                        <p className="text-text-secondary text-sm mt-2">- {language === 'th' ? 'คุณ A. นักเรียน Private Class' : 'Mr. A, Private Class Student'}</p>
                                    </div>

                                    {/* CTA */}
                                    <div className="text-center">
                                        <Link
                                            href="/private-class"
                                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent via-accent to-primary text-white font-bold text-lg rounded-2xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 hover:scale-105 group"
                                        >
                                            <Crown className="w-6 h-6" />
                                            {language === 'th' ? 'สมัคร Private Class' : 'Apply for Private Class'}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <p className="text-text-secondary text-sm mt-4">
                                            {language === 'th'
                                                ? '💬 คลิกเพื่อดูรายละเอียดและขั้นตอนการสมัคร'
                                                : '💬 Click to view details and enrollment steps'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                            title={selectedVideo.title[language]}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

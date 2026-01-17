'use client';

import { Play, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// 3 sample videos for homepage preview
const previewVideos = [
    {
        id: 'video1',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        title: { en: 'Introduction to Gold Trading', th: 'บทนำการเทรดทอง' },
        duration: '15:30',
    },
    {
        id: 'video2',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        title: { en: 'Understanding Candlestick Patterns', th: 'เข้าใจรูปแบบแท่งเทียน' },
        duration: '22:45',
    },
    {
        id: 'video3',
        youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
        title: { en: 'Smart Money Concept (SMC)', th: 'แนวคิด Smart Money (SMC)' },
        duration: '35:15',
    },
];

export default function FreeVideosPreview() {
    const { language } = useLanguage();

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">
                            {language === 'th' ? 'เรียนฟรี' : 'Free Education'}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="primary-gradient">
                            {language === 'th' ? 'ตัวอย่างคลิปเรียนฟรี' : 'Free Tutorial Previews'}
                        </span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {language === 'th'
                            ? 'เริ่มต้นเรียนรู้การเทรดกับวิดีโอสอนฟรีของเรา'
                            : 'Start learning to trade with our free tutorial videos'}
                    </p>
                </div>

                {/* Video Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {previewVideos.map((video) => (
                        <Link
                            key={video.id}
                            href="/learn"
                            className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                    alt={video.title[language]}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                                    {video.duration}
                                </div>
                            </div>
                            {/* Title */}
                            <div className="p-4">
                                <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors line-clamp-2">
                                    {video.title[language]}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link
                        href="/learn"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group"
                    >
                        <BookOpen className="w-5 h-5" />
                        {language === 'th' ? 'ดูคลิปเรียนฟรีทั้งหมด' : 'View All Free Tutorials'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

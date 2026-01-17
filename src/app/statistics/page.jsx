'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PerformanceChart from '@/components/PerformanceChart';
import DiscordStatsSection from '@/components/DiscordStatsSection';
import { BarChart3, TrendingUp, Users, Shield } from 'lucide-react';

export default function StatisticsPage() {
    const { language } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-sm text-text-secondary">
                                {language === 'th' ? 'ข้อมูลแบบเรียลไทม์' : 'Real-time Data'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">
                                {language === 'th' ? 'สถิติ' : 'Trading '}
                            </span>
                            <span className="primary-gradient">
                                {language === 'th' ? 'การเทรด' : 'Statistics'}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                            {language === 'th'
                                ? 'ติดตามผลการเทรดแบบเรียลไทม์จากกองทุนหลัก (Google Sheet)'
                                : 'Track real-time trading performance from main fund (Google Sheet)'}
                        </p>

                        {/* Stats Highlights */}
                        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                            <div className="glass rounded-xl p-4 text-center">
                                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-white font-semibold text-sm">
                                    {language === 'th' ? 'ข้อมูลสด' : 'Live Data'}
                                </p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                                <p className="text-white font-semibold text-sm">
                                    {language === 'th' ? 'ชุมชน' : 'Community'}
                                </p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Shield className="w-6 h-6 text-green mx-auto mb-2" />
                                <p className="text-white font-semibold text-sm">
                                    {language === 'th' ? 'โปร่งใส' : 'Transparent'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Fund Performance Chart (Google Sheets) */}
                <PerformanceChart />

                {/* Discord Community Stats Section */}
                <DiscordStatsSection />

                {/* Additional Info Section */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                {language === 'th' ? 'เกี่ยวกับข้อมูลสถิติ' : 'About Our Statistics'}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {language === 'th'
                                    ? 'ข้อมูลสถิติกองทุนหลักถูกดึงแบบเรียลไทม์จาก Google Sheets ส่วนสถิติชุมชนถูกรวบรวมจากห้อง Discord โดย Bot อัตโนมัติ'
                                    : 'Main fund statistics are fetched in real-time from Google Sheets. Community stats are aggregated from Discord channel by our automated bot.'}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

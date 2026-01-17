'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Trophy, Target, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

// Discord Logo SVG Component
const DiscordLogo = ({ className }) => (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

// Single Channel Stats Card Component
function ChannelStatsCard({ channel, language }) {
    const stats = channel.summary;

    if (stats.totalTrades === 0) {
        return (
            <div className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
                        <DiscordLogo className="w-5 h-5 text-[#5865F2]" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">{channel.name[language]}</h3>
                        <p className="text-text-secondary text-xs">{channel.hashtag}</p>
                    </div>
                </div>
                <p className="text-text-secondary text-sm text-center py-4">
                    {language === 'th' ? 'ยังไม่มีข้อมูล' : 'No data yet'}
                </p>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-[#5865F2]/30 transition-all">
            {/* Channel Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
                    <DiscordLogo className="w-5 h-5 text-[#5865F2]" />
                </div>
                <div>
                    <h3 className="text-white font-semibold text-sm">{channel.name[language]}</h3>
                    <p className="text-[#5865F2] text-xs font-medium">{channel.hashtag}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                {/* Total Points */}
                <div className="glass rounded-xl p-4 text-center border border-accent/10">
                    <p className={`text-xl font-bold ${stats.totalPoints >= 0 ? 'text-accent' : 'text-red-500'}`}>
                        {stats.totalPoints >= 0 ? '+' : ''}{stats.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-text-secondary text-xs mt-1">
                        {language === 'th' ? 'TP/SL' : 'TP/SL'}
                    </p>
                </div>

                {/* Win Rate */}
                <div className="glass rounded-xl p-4 text-center border border-primary/10">
                    <p className="text-xl font-bold text-primary">
                        {stats.winRate}%
                    </p>
                    <p className="text-text-secondary text-xs mt-1">
                        {language === 'th' ? 'Win Rate' : 'Win Rate'}
                    </p>
                </div>

                {/* Wins */}
                <div className="glass rounded-xl p-4 text-center border border-green/10">
                    <p className="text-xl font-bold text-green">
                        {stats.wins}
                    </p>
                    <p className="text-text-secondary text-xs mt-1">
                        {language === 'th' ? 'Win' : 'Wins'}
                    </p>
                </div>

                {/* Losses */}
                <div className="glass rounded-xl p-4 text-center border border-red-500/10">
                    <p className="text-xl font-bold text-red-500">
                        {stats.losses}
                    </p>
                    <p className="text-text-secondary text-xs mt-1">
                        {language === 'th' ? 'Lose' : 'Losses'}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <p className="text-text-secondary text-xs text-center mt-4">
                {language === 'th'
                    ? `${stats.totalTrades} ออเดอร์`
                    : `${stats.totalTrades} trades`}
            </p>
        </div>
    );
}

export default function DiscordStatsSection() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchDiscordStats = async () => {
            try {
                const response = await fetch('/api/discord-stats');
                const result = await response.json();

                if (result.success) {
                    setChannels(result.channels || []);
                } else {
                    setError('Failed to load Discord stats');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscordStats();
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 text-[#5865F2] animate-spin" />
                        <span className="ml-3 text-text-secondary">
                            {language === 'th' ? 'กำลังโหลดสถิติ Discord...' : 'Loading Discord stats...'}
                        </span>
                    </div>
                </div>
            </section>
        );
    }

    if (error || channels.length === 0) {
        return null;
    }

    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#5865F2]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full mb-4 border border-[#5865F2]/30">
                        <DiscordLogo className="w-5 h-5 text-[#5865F2]" />
                        <span className="text-sm text-[#5865F2] font-semibold">
                            Discord Community
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                        <span className="text-white">{language === 'th' ? 'สถิติ' : 'Discord '}</span>
                        <span className="text-[#5865F2]">{language === 'th' ? 'ชุมชน Discord' : 'Community Stats'}</span>
                    </h2>
                    <p className="text-text-secondary text-sm max-w-lg mx-auto">
                        {language === 'th'
                            ? 'สถิติการเทรดจากห้องต่างๆ ใน Discord อัปเดตอัตโนมัติ'
                            : 'Trading statistics from multiple Discord channels, auto-updated'}
                    </p>
                </div>

                {/* Channels Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {channels.map((channel, index) => (
                        <ChannelStatsCard
                            key={channel.id || index}
                            channel={channel}
                            language={language}
                        />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green animate-pulse"></div>
                        <p className="text-text-secondary text-xs">
                            {language === 'th'
                                ? 'อัปเดตอัตโนมัติจาก Discord Bot'
                                : 'Auto-updated from Discord Bot'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState } from 'react';
import { Play, Lock, Crown, BookOpen, Clock, Star, ArrowRight } from 'lucide-react';

const freeVideos = [
    {
        id: 1,
        title: 'Introduction to Forex Trading',
        description: 'Learn the basics of forex trading and market fundamentals',
        duration: '15:30',
        thumbnail: 'https://placehold.co/640x360/141414/D4AF37?text=Forex+Basics',
        views: '12.5K',
    },
    {
        id: 2,
        title: 'Understanding Gold (XAUUSD)',
        description: 'Deep dive into gold trading and its market dynamics',
        duration: '22:15',
        thumbnail: 'https://placehold.co/640x360/141414/D4AF37?text=Gold+Trading',
        views: '8.2K',
    },
    {
        id: 3,
        title: 'Basic Chart Patterns',
        description: 'Master the essential chart patterns every trader must know',
        duration: '18:45',
        thumbnail: 'https://placehold.co/640x360/141414/D4AF37?text=Chart+Patterns',
        views: '15.3K',
    },
    {
        id: 4,
        title: 'Risk Management 101',
        description: 'Protect your capital with proper risk management',
        duration: '20:00',
        thumbnail: 'https://placehold.co/640x360/141414/D4AF37?text=Risk+Management',
        views: '9.8K',
    },
];

const proVideos = [
    {
        id: 5,
        title: 'Advanced SMC Strategy',
        description: 'Master Smart Money Concepts for institutional-level trading',
        duration: '45:30',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=SMC+Strategy',
        views: '5.2K',
        isPro: true,
    },
    {
        id: 6,
        title: 'Sniper Entry Technique',
        description: 'Learn the exact technique for perfect market entries',
        duration: '38:15',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=Sniper+Entry',
        views: '4.8K',
        isPro: true,
    },
    {
        id: 7,
        title: 'Live Trading Session #1',
        description: 'Watch real trades being executed with full analysis',
        duration: '1:15:00',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=Live+Trading',
        views: '7.1K',
        isPro: true,
    },
    {
        id: 8,
        title: 'Psychology of Winning Traders',
        description: 'Develop the mindset of consistently profitable traders',
        duration: '32:45',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=Trading+Psychology',
        views: '6.3K',
        isPro: true,
    },
    {
        id: 9,
        title: 'Multi-Timeframe Analysis Mastery',
        description: 'Combine timeframes for high-probability setups',
        duration: '42:20',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=MTF+Analysis',
        views: '4.5K',
        isPro: true,
    },
    {
        id: 10,
        title: 'Exclusive Trading Signals Decoded',
        description: 'Understand how our signals are generated',
        duration: '28:30',
        thumbnail: 'https://placehold.co/640x360/141414/22C55E?text=Signals+Decoded',
        views: '3.9K',
        isPro: true,
    },
];

function VideoCard({ video, isProMode }) {
    const isLocked = video.isPro && !isProMode;

    return (
        <div className="group relative glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isLocked ? 'blur-sm' : ''
                        }`}
                />

                {/* Play Overlay */}
                {!isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                        </div>
                    </div>
                )}

                {/* Lock Overlay */}
                {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                        <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-3 border border-gold/30">
                            <Lock className="w-6 h-6 text-gold" />
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 flex items-center gap-2">
                            Upgrade to Watch
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                </div>

                {/* Pro Badge */}
                {video.isPro && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-gold-dark to-gold rounded text-xs text-black font-semibold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        PRO
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h4 className={`font-semibold mb-1 transition-colors duration-300 ${isLocked ? 'text-text-secondary' : 'text-white group-hover:text-gold'}`}>
                    {video.title}
                </h4>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {video.views} views
                    </span>
                    {video.isPro && (
                        <span className="flex items-center gap-1 text-gold">
                            <Star className="w-3 h-3" />
                            Premium
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PrivateClass() {
    const [isProMode, setIsProMode] = useState(false);

    const displayedVideos = isProMode ? proVideos : freeVideos;

    return (
        <section id="private-class" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-green/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <BookOpen className="w-4 h-4 text-gold" />
                        <span className="text-sm text-gold font-medium">Learning Center</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Master Trading with Our</span>
                        <br />
                        <span className="gold-gradient">Private Class</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Access our comprehensive video library to transform your trading skills from beginner to professional.
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="glass p-1.5 rounded-xl inline-flex">
                        <button
                            onClick={() => setIsProMode(false)}
                            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${!isProMode
                                    ? 'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black'
                                    : 'text-text-secondary hover:text-white'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Free Mode
                        </button>
                        <button
                            onClick={() => setIsProMode(true)}
                            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${isProMode
                                    ? 'bg-gradient-to-r from-green/80 via-green to-green-light text-black'
                                    : 'text-text-secondary hover:text-white'
                                }`}
                        >
                            <Crown className="w-4 h-4" />
                            Pro Mode
                        </button>
                    </div>
                </div>

                {/* Mode Description */}
                <div className="text-center mb-8">
                    {isProMode ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green/10 border border-green/20">
                            <Crown className="w-4 h-4 text-green" />
                            <span className="text-green text-sm">Viewing Premium Content - Full Access Unlocked</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
                            <BookOpen className="w-4 h-4 text-gold" />
                            <span className="text-gold text-sm">Free Content - Upgrade to unlock Pro videos</span>
                        </div>
                    )}
                </div>

                {/* Videos Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} isProMode={isProMode} />
                    ))}
                </div>

                {/* Pro Videos Preview (when in Free Mode) */}
                {!isProMode && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Crown className="w-6 h-6 text-gold" />
                                    Pro Content Preview
                                </h3>
                                <p className="text-text-secondary text-sm mt-1">Upgrade to unlock these premium lessons</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {proVideos.slice(0, 3).map((video) => (
                                <VideoCard key={video.id} video={video} isProMode={false} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Upgrade CTA */}
                {!isProMode && (
                    <div className="mt-16 text-center">
                        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
                            <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Unlock All Pro Content</h3>
                            <p className="text-text-secondary mb-6">
                                Get lifetime access to 50+ premium lessons, live trading sessions, and exclusive strategies.
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 hover:scale-105 flex items-center gap-2 mx-auto">
                                Upgrade to Pro - $149
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

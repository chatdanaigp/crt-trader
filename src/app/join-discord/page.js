'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    MessageCircle,
    Users,
    Bell,
    TrendingUp,
    Shield,
    Gift,
    CheckCircle2,
    Sparkles,
    Crown,
    Zap,
    ExternalLink,
    Copy,
    Check
} from 'lucide-react';

const benefits = [
    {
        icon: TrendingUp,
        title: 'Daily Gold Signals',
        description: 'Receive high-precision XAUUSD trading signals every day from our expert analysts.',
    },
    {
        icon: Bell,
        title: 'Real-Time Alerts',
        description: 'Get instant notifications for entry points, stop loss, and take profit levels.',
    },
    {
        icon: Users,
        title: 'Community Support',
        description: 'Connect with 1,500+ traders, share ideas, and learn from experienced mentors.',
    },
    {
        icon: Shield,
        title: 'Risk Management',
        description: 'Every signal includes proper risk management guidelines to protect your capital.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Open ConnectFX Account',
        description: 'Register for a trading account with our partner broker ConnectFX.',
        action: 'Open Account',
        link: '#',
    },
    {
        number: '02',
        title: 'Deposit $1,000 Minimum',
        description: 'Fund your account with at least $1,000 to qualify for VIP signals.',
        action: 'Fund Account',
        link: '#',
    },
    {
        number: '03',
        title: 'Submit Verification',
        description: 'Send your account number and deposit proof to our admin.',
        action: 'Contact Admin',
        link: '#',
    },
    {
        number: '04',
        title: 'Get Discord Access',
        description: 'Receive your exclusive invite link and join the community!',
        action: 'Join Discord',
        link: 'https://discord.gg/crttrader',
    },
];

const testimonials = [
    {
        name: 'Alex T.',
        role: 'Trader since 2024',
        content: 'The signals are incredibly accurate. I made back my deposit in the first month!',
        avatar: 'A',
    },
    {
        name: 'Sarah M.',
        role: 'Full-time Trader',
        content: 'Best trading community I\'ve ever joined. The support is amazing.',
        avatar: 'S',
    },
    {
        name: 'Mike K.',
        role: 'Part-time Trader',
        content: 'Clear signals, no confusion. Perfect for beginners like me.',
        avatar: 'M',
    },
];

export default function JoinDiscordPage() {
    const [copied, setCopied] = useState(false);
    const discordLink = 'https://discord.gg/crttrader';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(discordLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-gold" />
                            <span className="text-xl font-bold">
                                <span className="gold-gradient">crt</span>
                                <span className="text-white">.trader</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5865F2]/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Discord Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/30 mb-8">
                        <MessageCircle className="w-5 h-5 text-[#5865F2]" fill="currentColor" />
                        <span className="text-sm text-[#5865F2] font-medium">Discord Community</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="text-white">Join Our Exclusive</span>
                        <br />
                        <span className="text-[#5865F2]">Master Signal Discord</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                        Get access to premium Gold (XAUUSD) trading signals, real-time market analysis,
                        and a community of successful traders.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gold">1,500+</p>
                            <p className="text-text-secondary text-sm">Active Traders</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-green">85%</p>
                            <p className="text-text-secondary text-sm">Win Rate</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-[#5865F2]">24/7</p>
                            <p className="text-text-secondary text-sm">Support</p>
                        </div>
                    </div>

                    {/* Discord Link Card */}
                    <div className="glass rounded-2xl p-6 max-w-lg mx-auto gold-glow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-[#5865F2] flex items-center justify-center">
                                <MessageCircle className="w-8 h-8 text-white" fill="currentColor" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-white">crt.trader Community</h3>
                                <p className="text-green text-sm flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green rounded-full animate-pulse"></span>
                                    1,247 members online
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 px-4 py-3 bg-white/5 rounded-lg text-text-secondary text-sm truncate">
                                {discordLink}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 flex items-center gap-2"
                            >
                                {copied ? (
                                    <Check className="w-5 h-5 text-green" />
                                ) : (
                                    <Copy className="w-5 h-5 text-white" />
                                )}
                            </button>
                            <a
                                href={discordLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[#5865F2] rounded-lg hover:bg-[#4752C4] transition-colors duration-300 flex items-center gap-2 font-semibold text-white"
                            >
                                <span className="hidden sm:inline">Join</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Gift className="w-4 h-4 text-gold" />
                            <span className="text-sm text-gold font-medium">Member Benefits</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            What You'll Get
                        </h2>
                        <p className="text-text-secondary max-w-xl mx-auto">
                            Exclusive perks and tools available only to our Discord community members.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 hover:border-gold/30"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                                    <benefit.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                                <p className="text-text-secondary text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Join Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Zap className="w-4 h-4 text-gold" />
                            <span className="text-sm text-gold font-medium">How to Join</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            4 Simple Steps to Get Access
                        </h2>
                        <p className="text-text-secondary max-w-xl mx-auto">
                            Follow these steps to become a VIP member of our trading community.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 relative overflow-hidden group hover:border-gold/30 transition-all duration-300"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 -right-4 text-8xl font-bold text-white/5 select-none">
                                    {step.number}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-dark to-gold flex items-center justify-center text-black font-bold">
                                            {step.number}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-text-secondary text-sm mb-4">{step.description}</p>
                                    <a
                                        href={step.link}
                                        target={step.link.startsWith('http') ? '_blank' : undefined}
                                        rel={step.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors duration-300 text-sm font-medium"
                                    >
                                        {step.action}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Sparkles className="w-4 h-4 text-gold" />
                            <span className="text-sm text-gold font-medium">Testimonials</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            What Our Traders Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-dark to-gold flex items-center justify-center text-black font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{testimonial.name}</p>
                                        <p className="text-text-secondary text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm italic">"{testimonial.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="glass rounded-2xl p-10 gold-glow">
                        <Crown className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to Start Winning?
                        </h2>
                        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                            Join 1,500+ successful traders and start receiving high-precision signals today.
                            Your journey to consistent profits starts here.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#"
                                className="px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Open ConnectFX Account
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <a
                                href={discordLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-[#5865F2] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#4752C4] hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" fill="currentColor" />
                                Join Discord Now
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-text-secondary text-xs">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green" />
                                <span>Verified Community</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green" />
                                <span>Secure & Private</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-green" />
                                <span>Active 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-text-secondary text-sm">
                        © {new Date().getFullYear()} crt.trader. All rights reserved.
                    </p>
                    <p className="text-text-secondary text-xs mt-2">
                        Trading involves substantial risk. Past performance is not indicative of future results.
                    </p>
                </div>
            </footer>
        </main>
    );
}

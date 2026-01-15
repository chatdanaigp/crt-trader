'use client';

import { Check, Zap, Target, TrendingUp, ArrowRight } from 'lucide-react';

const products = [
    {
        id: 'gss',
        name: 'GSS System',
        tagline: 'Gold Sniper Signal',
        description: 'Precision sniper entry tool for capturing perfect market entries with laser accuracy.',
        price: '$299',
        originalPrice: '$499',
        features: [
            'Sniper Entry Alerts',
            'Real-time Market Analysis',
            'Multi-timeframe Support',
            'Mobile Notifications',
            'Lifetime Updates',
            'Discord Support Access',
        ],
        icon: Target,
        gradient: 'from-gold-dark via-gold to-gold-light',
        popular: true,
    },
    {
        id: 'tts',
        name: 'TTS System',
        tagline: 'Trend Trading System',
        description: 'Professional trend trading system designed to ride major market moves for maximum profit.',
        price: '$399',
        originalPrice: '$599',
        features: [
            'Trend Detection Algorithm',
            'Entry & Exit Signals',
            'Risk Management Built-in',
            'Backtested Strategy',
            'Video Tutorials Included',
            'Priority Support',
        ],
        icon: TrendingUp,
        gradient: 'from-green/80 via-green to-green-light',
        popular: false,
    },
];

function ProductCard({ product }) {
    const IconComponent = product.icon;

    return (
        <div
            className={`relative glass rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${product.popular ? 'gold-glow' : ''
                }`}
        >
            {/* Popular Badge */}
            {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black text-xs font-bold rounded-full">
                        MOST POPULAR
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${product.gradient}`}>
                            <IconComponent className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-text-secondary text-sm">{product.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                </div>
                <Zap className="w-6 h-6 text-gold animate-pulse" />
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-6 leading-relaxed">{product.description}</p>

            {/* Product Image Placeholder */}
            <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-card-bg to-transparent aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`p-6 rounded-2xl bg-gradient-to-r ${product.gradient} opacity-20`}>
                        <IconComponent className="w-16 h-16 text-white" />
                    </div>
                </div>
                <div className="absolute inset-0 shimmer"></div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-white">{product.price}</span>
                <span className="text-text-secondary line-through">{product.originalPrice}</span>
                <span className="px-2 py-0.5 bg-green/20 text-green text-xs font-medium rounded">SAVE 40%</span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
                {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green" />
                        </div>
                        <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${product.popular
                        ? 'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black hover:shadow-lg hover:shadow-gold/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
            >
                Buy Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    );
}

export default function TradingTools() {
    return (
        <section id="trading-tools" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-green/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Zap className="w-4 h-4 text-gold" />
                        <span className="text-sm text-gold font-medium">Premium Trading Tools</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Power Up Your Trading with</span>
                        <br />
                        <span className="gold-gradient">Professional Indicators</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Battle-tested trading systems designed to give you an edge in the markets.
                        Used by professional traders worldwide.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bottom Trust Bar */}
                <div className="mt-16 text-center">
                    <div className="glass inline-flex items-center gap-6 sm:gap-12 px-8 py-4 rounded-full">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gold">500+</p>
                            <p className="text-xs text-text-secondary">Happy Traders</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green">98%</p>
                            <p className="text-xs text-text-secondary">Satisfaction</p>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">24/7</p>
                            <p className="text-xs text-text-secondary">Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

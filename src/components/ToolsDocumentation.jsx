'use client';

import { useState } from 'react';
import {
    ChevronDown,
    Target,
    TrendingUp,
    BarChart3,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Zap,
    Activity,
    Gauge,
    Info,
    Shield,
    LineChart,
    Layers,
    ShoppingCart
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

function TabButton({ tool, isActive, onClick }) {
    const IconComponent = tool.icon;
    const isPrimary = tool.color === 'primary';

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${isActive
                ? isPrimary
                    ? 'bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white shadow-lg shadow-primary/30'
                    : 'bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white shadow-lg shadow-accent/30'
                : 'glass text-white hover:bg-white/10'
                }`}
        >
            <IconComponent className="w-5 h-5" />
            <div className="text-left">
                <div className="font-bold">{tool.name}</div>
                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-text-secondary'}`}>
                    {tool.fullName}
                </div>
            </div>
        </button>
    );
}

function FeatureCard({ title, description, icon: Icon, color = 'primary' }) {
    const isPrimary = color === 'primary';
    return (
        <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.07]">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isPrimary ? 'bg-primary/20' : 'bg-accent/20'}`}>
                    <Icon className={`w-5 h-5 ${isPrimary ? 'text-primary' : 'text-accent'}`} />
                </div>
                <div>
                    <h5 className={`font-semibold mb-2 ${isPrimary ? 'text-primary' : 'text-accent'}`}>
                        {title}
                    </h5>
                    <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

function StrategyItem({ icon: Icon, label, value, color = 'primary' }) {
    const isPrimary = color === 'primary';
    return (
        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isPrimary ? 'text-primary' : 'text-accent'}`} />
            <div>
                <p className="text-white font-medium text-sm">{label}</p>
                {value && <p className="text-text-secondary text-xs mt-1">{value}</p>}
            </div>
        </div>
    );
}

function GSSContent({ t }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const exampleImages = [
        '/images/tools/gss-example-1.png',
        '/images/tools/gss-example-2.png',
        '/images/tools/gss-example-3.png'
    ];

    return (
        <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn">
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-full sm:w-48 flex-shrink-0">
                    <img
                        src="/images/tools/gss-logo.jpg"
                        alt="GSS Logo"
                        className="w-full h-auto rounded-2xl border border-primary/30 shadow-lg shadow-primary/20"
                    />
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{t('tools.gss.fullName')}</h3>
                    <p className="text-text-secondary mt-2 leading-relaxed">{t('tools.gss.description')}</p>
                </div>
            </div>

            {/* Example Images Gallery */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    {t('tools.gss.name')} {t('tools.examples')}
                </h4>
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative rounded-xl overflow-hidden border border-primary/30">
                        <img
                            src={exampleImages[selectedImage]}
                            alt={`GSS Example ${selectedImage + 1}`}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-3">
                        {exampleImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                    ? 'border-primary shadow-lg shadow-primary/30 scale-[1.02]'
                                    : 'border-white/10 hover:border-primary/50'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`GSS Thumbnail ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicators Section */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    {t('tools.indicators')}
                </h4>
                <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-5 border border-primary/20">
                    <p className="text-text-secondary leading-relaxed">{t('tools.gss.indicatorsDesc')}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">RSI</span>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">Stochastic</span>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">Bollinger Bands</span>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    {t('tools.keyFeatures')}
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FeatureCard
                        title={t('tools.gss.borderLines')}
                        description={t('tools.gss.borderLinesDesc')}
                        icon={Layers}
                        color="primary"
                    />
                    <FeatureCard
                        title={t('tools.gss.signals')}
                        description={t('tools.gss.signalsDesc')}
                        icon={Target}
                        color="accent"
                    />
                    <FeatureCard
                        title={t('tools.gss.benefit')}
                        description={t('tools.gss.benefitDesc')}
                        icon={Shield}
                        color="primary"
                    />
                </div>
            </div>

            {/* Strategy & Risk Management */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-accent" />
                    {t('tools.strategy')}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                    <StrategyItem icon={Target} label={t('tools.gss.rr')} value={t('tools.gss.rrDesc')} color="primary" />
                    <StrategyItem icon={Shield} label={t('tools.gss.risk')} value={t('tools.gss.riskDesc')} color="accent" />
                </div>
            </div>

            {/* Performance */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green" />
                    {t('tools.performance')}
                </h4>
                <div className="bg-green/10 rounded-xl p-5 border border-green/20">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-green">57%</div>
                        <div>
                            <p className="text-white font-medium">{t('tools.gss.winRate')}</p>
                            <p className="text-text-secondary text-sm">{t('tools.gss.winRateDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    {t('tools.warnings')}
                </h4>
                <div className="bg-yellow-500/10 rounded-xl p-5 border border-yellow-500/20">
                    <p className="text-yellow-500 font-medium">{t('tools.gss.warning')}</p>
                    <p className="text-yellow-500/80 text-sm mt-1">{t('tools.gss.warningDesc')}</p>
                </div>
            </div>

            {/* Buy Button */}
            <div className="flex justify-center pt-4">
                <Link
                    href="/purchase"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-dark via-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {t('tools.buyNow')}
                </Link>
            </div>
        </div>
    );
}

function TTSContent({ t }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const exampleImages = [
        '/images/tools/tts-example-1.png',
        '/images/tools/tts-example-2.png',
        '/images/tools/tts-example-3.png'
    ];

    return (
        <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn">
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-full sm:w-48 flex-shrink-0">
                    <img
                        src="/images/tools/tts-logo.jpg"
                        alt="TTS Logo"
                        className="w-full h-auto rounded-2xl border border-accent/30 shadow-lg shadow-accent/20"
                    />
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{t('tools.tts.fullName')}</h3>
                    <p className="text-text-secondary mt-2 leading-relaxed">{t('tools.tts.description')}</p>
                    <div className="flex items-center gap-3 mt-4">
                        <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full font-medium">Smart Money Concept (SMC)</span>
                    </div>
                </div>
            </div>

            {/* Example Images Gallery */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-accent" />
                    {t('tools.tts.name')} {t('tools.examples')}
                </h4>
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative rounded-xl overflow-hidden border border-accent/30">
                        <img
                            src={exampleImages[selectedImage]}
                            alt={`TTS Example ${selectedImage + 1}`}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-3">
                        {exampleImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                    ? 'border-accent shadow-lg shadow-accent/30 scale-[1.02]'
                                    : 'border-white/10 hover:border-accent/50'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`TTS Thumbnail ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    {t('tools.keyFeatures')}
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FeatureCard
                        title={t('tools.tts.tunnelLine')}
                        description={t('tools.tts.tunnelLineDesc')}
                        icon={Activity}
                        color="accent"
                    />
                    <FeatureCard
                        title={t('tools.tts.structure')}
                        description={t('tools.tts.structureDesc')}
                        icon={Layers}
                        color="primary"
                    />
                    <FeatureCard
                        title={t('tools.tts.rule')}
                        description={t('tools.tts.ruleDesc')}
                        icon={Target}
                        color="accent"
                    />
                </div>
            </div>

            {/* Strategy */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    {t('tools.strategy')}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                    <StrategyItem icon={Clock} label={t('tools.tts.timeframe')} value={t('tools.tts.timeframeDesc')} color="accent" />
                    <StrategyItem icon={Target} label={t('tools.tts.target')} value={t('tools.tts.targetDesc')} color="primary" />
                </div>
            </div>

            {/* Performance */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green" />
                    {t('tools.performance')}
                </h4>
                <div className="bg-green/10 rounded-xl p-5 border border-green/20">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-green">83.33%</div>
                        <div>
                            <p className="text-white font-medium">{t('tools.tts.winRate')}</p>
                            <p className="text-text-secondary text-sm">{t('tools.tts.winRateDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    {t('tools.warnings')}
                </h4>
                <div className="bg-yellow-500/10 rounded-xl p-5 border border-yellow-500/20">
                    <p className="text-yellow-500 font-medium">{t('tools.tts.warning')}</p>
                    <p className="text-yellow-500/80 text-sm mt-1">{t('tools.tts.warningDesc')}</p>
                </div>
            </div>

            {/* Buy Button */}
            <div className="flex justify-center pt-4">
                <Link
                    href="/purchase"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-dark via-accent to-primary text-white font-semibold rounded-xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 hover:scale-105"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {t('tools.buyNow')}
                </Link>
            </div>
        </div>
    );
}

function DZVContent({ t }) {
    return (
        <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-dark to-primary">
                    <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{t('tools.dzv.fullName')}</h3>
                    <p className="text-text-secondary mt-2 leading-relaxed">{t('tools.dzv.description')}</p>
                </div>
            </div>

            {/* 3 Zones */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    {t('tools.dzv.zones')}
                </h4>
                <div className="grid gap-4">
                    <div className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <p className="text-blue-400 font-semibold">{t('tools.dzv.zone1')}</p>
                        </div>
                        <p className="text-text-secondary text-sm">{t('tools.dzv.zone1Desc')}</p>
                    </div>
                    <div className="bg-green/10 rounded-xl p-5 border border-green/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green"></div>
                            <p className="text-green font-semibold">{t('tools.dzv.zone2')}</p>
                        </div>
                        <p className="text-text-secondary text-sm">{t('tools.dzv.zone2Desc')}</p>
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <p className="text-red-400 font-semibold">{t('tools.dzv.zone3')}</p>
                        </div>
                        <p className="text-text-secondary text-sm">{t('tools.dzv.zone3Desc')}</p>
                    </div>
                </div>
            </div>

            {/* Dashboard */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-accent" />
                    {t('tools.dzv.dashboard')}
                </h4>
                <div className="bg-accent/10 rounded-xl p-5 border border-accent/20">
                    <p className="text-text-secondary leading-relaxed">{t('tools.dzv.dashboardDesc')}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full font-medium">Trend</span>
                        <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full font-medium">RSI</span>
                        <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full font-medium">Stochastic</span>
                    </div>
                </div>
            </div>

            {/* Trading Approaches */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    {t('tools.dzv.approach')}
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-accent" />
                            <p className="text-accent font-semibold text-sm">{t('tools.dzv.aggressive')}</p>
                        </div>
                        <p className="text-text-secondary text-sm">{t('tools.dzv.aggressiveDesc')}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <p className="text-primary font-semibold text-sm">{t('tools.dzv.conservative')}</p>
                        </div>
                        <p className="text-text-secondary text-sm">{t('tools.dzv.conservativeDesc')}</p>
                    </div>
                </div>
            </div>

            {/* Daily Reset */}
            <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {t('tools.dzv.dailyReset')}
                </h4>
                <div className="bg-primary/10 rounded-xl p-5 border border-primary/20">
                    <p className="text-text-secondary leading-relaxed">{t('tools.dzv.dailyResetDesc')}</p>
                </div>
            </div>
        </div>
    );
}

// Accordion for mobile
function AccordionItem({ tool, isOpen, onToggle, content }) {
    const IconComponent = tool.icon;
    const isPrimary = tool.color === 'primary';

    return (
        <div className="glass rounded-2xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 sm:p-6"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isPrimary
                        ? 'bg-gradient-to-br from-primary-dark to-primary'
                        : 'bg-gradient-to-br from-accent-dark to-accent'
                        }`}>
                        <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white">{tool.name}</h3>
                        <p className="text-text-secondary text-sm">{tool.fullName}</p>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                    }`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="p-4 sm:p-6 pt-0">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default function ToolsDocumentation() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('gss');
    const [openAccordion, setOpenAccordion] = useState('gss');

    const tools = [
        {
            id: 'gss',
            name: t('tools.gss.name'),
            fullName: t('tools.gss.fullName'),
            icon: Target,
            color: 'primary'
        },
        {
            id: 'tts',
            name: t('tools.tts.name'),
            fullName: t('tools.tts.fullName'),
            icon: TrendingUp,
            color: 'accent'
        },
        {
            id: 'dzv',
            name: t('tools.dzv.name'),
            fullName: t('tools.dzv.fullName'),
            icon: BarChart3,
            color: 'primary'
        }
    ];

    const renderContent = (id) => {
        switch (id) {
            case 'gss': return <GSSContent t={t} />;
            case 'tts': return <TTSContent t={t} />;
            case 'dzv': return <DZVContent t={t} />;
            default: return null;
        }
    };

    const renderMobileContent = (id) => {
        switch (id) {
            case 'gss': return (
                <div className="space-y-6">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="/images/tools/gss-logo.jpg"
                            alt="GSS Logo"
                            className="w-full max-w-[200px] h-auto rounded-xl border border-primary/30 shadow-lg shadow-primary/20 mb-4"
                        />
                        <p className="text-text-secondary leading-relaxed">{t('tools.gss.description')}</p>
                    </div>

                    {/* Example Images */}
                    <div>
                        <p className="text-white font-semibold mb-3">{t('tools.examples')}:</p>
                        <div className="space-y-3">
                            <img src="/images/tools/gss-example-1.png" alt="GSS Example 1" className="w-full rounded-xl border border-primary/20 shadow-md" />
                            <div className="grid grid-cols-2 gap-3">
                                <img src="/images/tools/gss-example-2.png" alt="GSS Example 2" className="w-full rounded-xl border border-primary/20" />
                                <img src="/images/tools/gss-example-3.png" alt="GSS Example 3" className="w-full rounded-xl border border-primary/20" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/10 p-5 rounded-xl border border-primary/20">
                        <p className="text-primary font-bold mb-2 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            {t('tools.indicators')}
                        </p>
                        <p className="text-text-secondary text-sm">{t('tools.gss.indicatorsDesc')}</p>
                    </div>

                    <div className="space-y-3">
                        <FeatureCard title={t('tools.gss.borderLines')} description={t('tools.gss.borderLinesDesc')} icon={Layers} color="primary" />
                        <FeatureCard title={t('tools.gss.signals')} description={t('tools.gss.signalsDesc')} icon={Target} color="accent" />
                        <FeatureCard title={t('tools.gss.benefit')} description={t('tools.gss.benefitDesc')} icon={Shield} color="primary" />
                    </div>

                    <div className="bg-green/10 p-5 rounded-xl border border-green/20">
                        <p className="text-green font-bold text-2xl mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6" />
                            57%
                        </p>
                        <p className="text-white font-medium">{t('tools.gss.winRate')}</p>
                        <p className="text-text-secondary text-sm">{t('tools.gss.winRateDesc')}</p>
                    </div>

                    <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-500 font-medium mb-1">{t('tools.gss.warning')}</p>
                                <p className="text-yellow-500/80 text-sm">{t('tools.gss.warningDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buy Button */}
                    <div className="pt-2">
                        <Link
                            href="/purchase"
                            className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary via-primary to-accent text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {t('tools.buyNow')}
                        </Link>
                    </div>
                </div>
            );
            case 'tts': return (
                <div className="space-y-6">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="/images/tools/tts-logo.jpg"
                            alt="TTS Logo"
                            className="w-full max-w-[200px] h-auto rounded-xl border border-accent/30 shadow-lg shadow-accent/20 mb-4"
                        />
                        <p className="text-text-secondary leading-relaxed">{t('tools.tts.description')}</p>
                        <div className="inline-block mt-3 px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                            Smart Money Concept (SMC)
                        </div>
                    </div>

                    {/* Example Images */}
                    <div>
                        <p className="text-white font-semibold mb-3">{t('tools.examples')}:</p>
                        <div className="space-y-3">
                            <img src="/images/tools/tts-example-1.png" alt="TTS Example 1" className="w-full rounded-xl border border-accent/20 shadow-md" />
                            <div className="grid grid-cols-2 gap-3">
                                <img src="/images/tools/tts-example-2.png" alt="TTS Example 2" className="w-full rounded-xl border border-accent/20" />
                                <img src="/images/tools/tts-example-3.png" alt="TTS Example 3" className="w-full rounded-xl border border-accent/20" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <FeatureCard title={t('tools.tts.tunnelLine')} description={t('tools.tts.tunnelLineDesc')} icon={Activity} color="accent" />
                        <FeatureCard title={t('tools.tts.structure')} description={t('tools.tts.structureDesc')} icon={Layers} color="primary" />
                        <FeatureCard title={t('tools.tts.rule')} description={t('tools.tts.ruleDesc')} icon={Target} color="accent" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-accent/10 p-4 rounded-xl text-center border border-accent/20">
                            <p className="text-accent text-sm mb-1">{t('tools.tts.timeframe')}</p>
                            <p className="text-white font-bold text-lg">M5</p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20">
                            <p className="text-primary text-sm mb-1">Risk:Reward</p>
                            <p className="text-white font-bold text-lg">1:2</p>
                        </div>
                    </div>

                    <div className="bg-green/10 p-5 rounded-xl border border-green/20">
                        <p className="text-green font-bold text-2xl mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6" />
                            83.33%
                        </p>
                        <p className="text-white font-medium">{t('tools.tts.winRate')}</p>
                        <p className="text-text-secondary text-sm">{t('tools.tts.winRateDesc')}</p>
                    </div>

                    <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-500 font-medium mb-1">{t('tools.tts.warning')}</p>
                                <p className="text-yellow-500/80 text-sm">{t('tools.tts.warningDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buy Button */}
                    <div className="pt-2">
                        <Link
                            href="/purchase"
                            className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-accent via-accent to-primary text-white font-bold rounded-xl shadow-lg shadow-accent/30 hover:scale-[1.02] transition-all"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {t('tools.buyNow')}
                        </Link>
                    </div>
                </div>
            );
            case 'dzv': return (
                <div className="space-y-6">
                    <p className="text-text-secondary leading-relaxed">{t('tools.dzv.description')}</p>

                    <div className="space-y-3">
                        <p className="text-white font-semibold">{t('tools.dzv.zones')}:</p>
                        <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <div className="w-4 h-4 rounded-full bg-blue-500 shadow shadow-blue-500/50"></div>
                            <div>
                                <span className="text-blue-400 font-bold block">{t('tools.dzv.zone1')}</span>
                                <span className="text-text-secondary text-sm">Sideway Market</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-green/10 rounded-xl border border-green/20">
                            <div className="w-4 h-4 rounded-full bg-green shadow shadow-green/50"></div>
                            <div>
                                <span className="text-green font-bold block">{t('tools.dzv.zone2')}</span>
                                <span className="text-text-secondary text-sm">Trend Trading</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                            <div className="w-4 h-4 rounded-full bg-red-500 shadow shadow-red-500/50"></div>
                            <div>
                                <span className="text-red-400 font-bold block">{t('tools.dzv.zone3')}</span>
                                <span className="text-text-secondary text-sm">News / High Volatility</span>
                            </div>
                        </div>
                    </div>

                    <FeatureCard title={t('tools.dzv.dashboard')} description={t('tools.dzv.dashboardDesc')} icon={Gauge} color="accent" />

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-accent/10 p-4 rounded-xl text-center border border-accent/20">
                            <Zap className="w-5 h-5 text-accent mx-auto mb-2" />
                            <p className="text-accent text-sm font-semibold">{t('tools.dzv.aggressive')}</p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20">
                            <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-primary text-sm font-semibold">{t('tools.dzv.conservative')}</p>
                        </div>
                    </div>

                    <div className="bg-primary/10 p-5 rounded-xl border border-primary/20">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-primary font-bold mb-1">{t('tools.dzv.dailyReset')}</p>
                                <p className="text-text-secondary text-sm">{t('tools.dzv.dailyResetDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buy Button */}
                    <div className="pt-2">
                        <Link
                            href="/purchase"
                            className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {t('tools.buyNow')}
                        </Link>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{t('tools.badge')}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="primary-gradient">{t('tools.title')}</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {t('tools.subtitle')}
                    </p>
                </div>

                {/* Desktop Tabs */}
                <div className="hidden md:block">
                    <div className="flex justify-center gap-4 mb-8">
                        {tools.map(tool => (
                            <TabButton
                                key={tool.id}
                                tool={tool}
                                isActive={activeTab === tool.id}
                                onClick={() => setActiveTab(tool.id)}
                            />
                        ))}
                    </div>
                    {renderContent(activeTab)}
                </div>

                {/* Mobile Accordions */}
                <div className="md:hidden space-y-4">
                    {tools.map(tool => (
                        <AccordionItem
                            key={tool.id}
                            tool={tool}
                            isOpen={openAccordion === tool.id}
                            onToggle={() => setOpenAccordion(openAccordion === tool.id ? null : tool.id)}
                            content={renderMobileContent(tool.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

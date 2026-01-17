'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight, TrendingUp, Target, DollarSign, Calendar, Trophy, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, language }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass rounded-xl p-4 border border-primary/30 min-w-[160px]">
                <p className="text-foreground font-semibold mb-2">{data.date}</p>
                <div className="space-y-1 text-sm">
                    <p className={`font-bold text-lg ${data.profit >= 0 ? 'text-green' : 'text-red-500'}`}>
                        {data.profit >= 0 ? '+' : ''}{data.profit.toFixed(2)}$
                    </p>
                    <p className="text-text-secondary">
                        {data.trades} {language === 'th' ? 'เทรด' : 'trades'}
                    </p>
                    <p className="text-green text-xs">
                        Win: {data.wins}
                    </p>
                    <p className="text-red-500 text-xs">
                        Lose: {data.losses}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function PerformanceChart() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    // Fetch trading stats from API (Google Sheets only)
    const fetchStats = async (monthKey) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/trading-stats?month=${encodeURIComponent(monthKey)}`);
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch data');
            }

            setData(result.data);
            if (result.availableMonths) {
                setAvailableMonths(result.availableMonths);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchStats('มกราคม2026');
    }, []);

    const handlePrevMonth = () => {
        if (currentMonthIndex < availableMonths.length - 1) {
            const newIndex = currentMonthIndex + 1;
            setCurrentMonthIndex(newIndex);
            fetchStats(availableMonths[newIndex].key);
        }
    };

    const handleNextMonth = () => {
        if (currentMonthIndex > 0) {
            const newIndex = currentMonthIndex - 1;
            setCurrentMonthIndex(newIndex);
            fetchStats(availableMonths[newIndex].key);
        }
    };

    const canGoPrev = currentMonthIndex < availableMonths.length - 1;
    const canGoNext = currentMonthIndex > 0;

    // Use daily data directly from API
    const chartData = data?.dailyData || [];

    return (
        <section className="relative py-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="text-foreground">{language === 'th' ? 'สถิติ' : 'Trading'} </span>
                        <span className="primary-gradient">{language === 'th' ? 'การเทรด' : 'Statistics'}</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {language === 'th'
                            ? 'ติดตามการเติบโตของพอร์ตในแต่ละเดือน (Real-time จาก Google Sheet)'
                            : "Track portfolio growth each month (Real-time from Google Sheet)"}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="ml-3 text-text-secondary">
                            {language === 'th' ? 'กำลังโหลดข้อมูล...' : 'Loading data...'}
                        </span>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="glass rounded-xl p-8 text-center max-w-lg mx-auto">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">
                            {language === 'th' ? 'ไม่สามารถโหลดข้อมูลได้' : 'Failed to load data'}
                        </p>
                        <p className="text-text-secondary text-sm mb-4">{error}</p>
                        <button
                            onClick={() => fetchStats(availableMonths[currentMonthIndex]?.key || 'มกราคม2026')}
                            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary transition-colors"
                        >
                            {language === 'th' ? 'ลองใหม่' : 'Try Again'}
                        </button>
                    </div>
                )}

                {/* Data Display */}
                {!loading && !error && data && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left: Chart */}
                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-foreground font-semibold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    {language === 'th' ? 'การเติบโตของพอร์ต' : 'Portfolio Growth'}
                                </h3>
                            </div>

                            {chartData.length > 0 ? (
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={chartData}
                                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="growthGradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#EC4899" />
                                                    <stop offset="50%" stopColor="#8B5CF6" />
                                                    <stop offset="100%" stopColor="#06B6D4" />
                                                </linearGradient>
                                                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                                tickFormatter={(value) => `${value}%`}
                                                domain={['dataMin - 2', 'dataMax + 2']}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip language={language} />}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="growth"
                                                stroke="url(#growthGradient)"
                                                strokeWidth={3}
                                                fill="url(#areaFill)"
                                                dot={{
                                                    r: 4,
                                                    fill: '#8B5CF6',
                                                    stroke: '#1a1a2e',
                                                    strokeWidth: 2
                                                }}
                                                activeDot={{
                                                    r: 6,
                                                    fill: '#A78BFA',
                                                    stroke: '#8B5CF6',
                                                    strokeWidth: 2
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-64 flex items-center justify-center">
                                    <p className="text-text-secondary">
                                        {language === 'th' ? 'ยังไม่มีข้อมูลการเทรด' : 'No trading data yet'}
                                    </p>
                                </div>
                            )}

                            <p className="text-text-secondary text-xs text-center mt-3">
                                {language === 'th'
                                    ? '* แสดงเปอร์เซ็นต์การเติบโตสะสมของพอร์ต'
                                    : '* Shows cumulative portfolio growth percentage'}
                            </p>
                        </div>

                        {/* Right: Statistics */}
                        <div className="space-y-4">
                            {/* Month Selector */}
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={handlePrevMonth}
                                    disabled={!canGoPrev || loading}
                                    className={`p-2 rounded-lg glass transition-all duration-300 ${canGoPrev && !loading
                                        ? 'hover:bg-primary/20 cursor-pointer'
                                        : 'opacity-30 cursor-not-allowed'
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4 text-foreground" />
                                </button>

                                <div className="flex items-center gap-2 px-5 py-2 glass rounded-xl min-w-[180px] justify-center">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="text-foreground font-medium text-sm">
                                        {data.monthName[language]}
                                    </span>
                                </div>

                                <button
                                    onClick={handleNextMonth}
                                    disabled={!canGoNext || loading}
                                    className={`p-2 rounded-lg glass transition-all duration-300 ${canGoNext && !loading
                                        ? 'hover:bg-primary/20 cursor-pointer'
                                        : 'opacity-30 cursor-not-allowed'
                                        }`}
                                >
                                    <ChevronRight className="w-4 h-4 text-foreground" />
                                </button>
                            </div>

                            {/* Statistics Grid */}
                            {data.summary.totalTrades > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Primary Metric: Growth or Points */}
                                    <div className="glass rounded-xl p-4 text-center border-b-2 border-primary/20">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-2">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className={`text-xl sm:text-2xl font-bold ${data.summary.growth >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                            {data.summary.growth >= 0 ? '+' : ''}{data.summary.growth}%
                                        </p>
                                        <p className="text-text-secondary text-xs">
                                            {language === 'th' ? 'การเติบโต' : 'Growth'}
                                        </p>
                                    </div>

                                    {/* Win Rate */}
                                    <div className="glass rounded-xl p-4 text-center border-b-2 border-accent/20">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Target className="w-5 h-5 text-accent" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-accent">
                                            {data.summary.winRate}%
                                        </p>
                                        <p className="text-text-secondary text-xs">
                                            {language === 'th' ? 'อัตราชนะ' : 'Win Rate'}
                                        </p>
                                    </div>

                                    {/* Total Profit */}
                                    <div className="glass rounded-xl p-4 text-center">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green/20 to-green/10 flex items-center justify-center mx-auto mb-2">
                                            <DollarSign className="w-5 h-5 text-green" />
                                        </div>
                                        <p className={`text-xl sm:text-2xl font-bold ${data.summary.profit >= 0 ? 'text-green' : 'text-red-500'}`}>
                                            {data.summary.profit >= 0 ? '+' : ''}${data.summary.profit.toLocaleString()}
                                        </p>
                                        <p className="text-text-secondary text-xs">
                                            {language === 'th' ? 'กำไรรวม' : 'Total Profit'}
                                        </p>
                                    </div>

                                    {/* Win/Lose */}
                                    <div className="glass rounded-xl p-4 text-center">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/10 flex items-center justify-center mx-auto mb-2">
                                            <Trophy className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold">
                                            <span className="text-green">{data.summary.wins}</span>
                                            <span className="text-text-secondary mx-1">/</span>
                                            <span className="text-red-500">{data.summary.losses}</span>
                                        </p>
                                        <p className="text-text-secondary text-xs">
                                            {language === 'th' ? 'ชนะ / แพ้' : 'Win / Lose'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="glass rounded-xl p-8 text-center">
                                    <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                                    <p className="text-foreground font-medium">
                                        {language === 'th' ? 'ยังไม่มีข้อมูล' : 'No data yet'}
                                    </p>
                                    <p className="text-text-secondary text-sm">
                                        {language === 'th' ? 'เลือกดูเดือนอื่น' : 'Select another month'}
                                    </p>
                                </div>
                            )}

                            {/* Deposit Info */}
                            {data.summary.deposit > 0 && (
                                <div className="glass rounded-xl p-3 text-center">
                                    <p className="text-text-secondary text-sm">
                                        {language === 'th' ? 'เงินทุนเริ่มต้น' : 'Initial Deposit'}:
                                        <span className="text-foreground font-semibold ml-2">${data.summary.deposit.toLocaleString()}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

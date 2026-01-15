'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { useLanguage } from '@/context/LanguageContext';

/**
 * PerformanceChart Component
 * 
 * Displays monthly trading statistics using a line/area chart.
 * 
 * TODO: Replace mockData with data fetched from Google Sheet API
 * 
 * To fetch data from Google Sheets:
 * 1. Create a Google Cloud project and enable Sheets API
 * 2. Create API credentials (API key or OAuth2)
 * 3. Make your sheet publicly readable or use service account
 * 4. Use the following endpoint:
 *    https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{RANGE}?key={API_KEY}
 * 
 * Example implementation:
 * 
 * const fetchSheetData = async () => {
 *     const SPREADSHEET_ID = 'your-spreadsheet-id';
 *     const RANGE = 'Sheet1!A1:B12'; // Adjust range as needed
 *     const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
 *     
 *     const response = await fetch(
 *         `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
 *     );
 *     const data = await response.json();
 *     // Transform data.values to match chart format: { month: string, profit: number }
 *     return transformedData;
 * };
 */

// Mock data for demonstration - Replace with real API data
const mockData = [
    { month: 'Jan', profit: 12.5 },
    { month: 'Feb', profit: 18.2 },
    { month: 'Mar', profit: 15.8 },
    { month: 'Apr', profit: 22.4 },
    { month: 'May', profit: 19.1 },
    { month: 'Jun', profit: 28.6 },
    { month: 'Jul', profit: 24.3 },
    { month: 'Aug', profit: 31.2 },
    { month: 'Sep', profit: 27.8 },
    { month: 'Oct', profit: 35.4 },
    { month: 'Nov', profit: 29.9 },
    { month: 'Dec', profit: 38.7 },
];

const CustomTooltip = ({ active, payload, label, t }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass rounded-lg p-3 border border-primary/30">
                <p className="text-white font-medium">{label}</p>
                <p className="text-primary font-bold text-lg">
                    +{payload[0].value}% {t('chart.profit')}
                </p>
            </div>
        );
    }
    return null;
};

export default function PerformanceChart() {
    const { t } = useLanguage();

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="text-white">{t('chart.title').split(' ')[0]} </span>
                        <span className="primary-gradient">{t('chart.title').split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {t('chart.subtitle')}
                    </p>
                </div>

                {/* Chart Container */}
                <div className="glass rounded-2xl p-6 sm:p-8">
                    <div className="h-80 sm:h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={mockData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.1)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip content={<CustomTooltip t={t} />} />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    fill="url(#profitGradient)"
                                    dot={{
                                        r: 4,
                                        fill: '#6366F1',
                                        stroke: '#0A0A0A',
                                        strokeWidth: 2
                                    }}
                                    activeDot={{
                                        r: 6,
                                        fill: '#818CF8',
                                        stroke: '#6366F1',
                                        strokeWidth: 2
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-primary">+38.7%</p>
                            <p className="text-text-secondary text-sm">{t('chart.bestMonth')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-green">+25.3%</p>
                            <p className="text-text-secondary text-sm">{t('chart.avgMonthly')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-white">92%</p>
                            <p className="text-text-secondary text-sm">{t('chart.winRate')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

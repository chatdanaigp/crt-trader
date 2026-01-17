import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Channel configuration matching discord-bot.js
const CHANNELS = [
    {
        id: 'smc-pro-tools',
        name: { en: 'SMC Pro Tools', th: 'SMC Pro Tools' },
        hashtag: '#smc-pro-tools-statistics',
        dataFile: 'discord-stats.json'
    },
    {
        id: 'mementum-pro',
        name: { en: 'Mementum Pro', th: 'Mementum Pro' },
        hashtag: '#mementum-pro',
        dataFile: 'discord-stats-channel1.json'
    },
    {
        id: 'reversal-pro',
        name: { en: 'Reversal Pro', th: 'Reversal Pro' },
        hashtag: '#reversal-pro',
        dataFile: 'discord-stats-channel2.json'
    }
];

function calculateSummary(data) {
    const summary = data.reduce((acc, day) => {
        acc.wins += day.wins || 0;
        acc.losses += day.losses || 0;
        acc.totalPoints += day.totalPoints || 0;
        return acc;
    }, { wins: 0, losses: 0, totalPoints: 0 });

    const totalTrades = summary.wins + summary.losses;
    const winRate = totalTrades > 0 ? (summary.wins / totalTrades) * 100 : 0;

    return {
        ...summary,
        totalTrades,
        winRate: Math.round(winRate * 100) / 100
    };
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const channelId = searchParams.get('channel');

        // If specific channel requested
        if (channelId) {
            const channel = CHANNELS.find(ch => ch.id === channelId);
            if (!channel) {
                return NextResponse.json({
                    success: false,
                    error: 'Channel not found'
                }, { status: 404 });
            }

            const filePath = path.resolve(process.cwd(), 'src/data', channel.dataFile);
            let data = [];

            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent || '[]');
            }

            return NextResponse.json({
                success: true,
                channel: channel,
                data: data,
                summary: calculateSummary(data)
            });
        }

        // Return all channels' stats
        const allChannelStats = [];

        for (const channel of CHANNELS) {
            const filePath = path.resolve(process.cwd(), 'src/data', channel.dataFile);
            let data = [];

            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent || '[]');
            }

            allChannelStats.push({
                ...channel,
                data: data,
                summary: calculateSummary(data)
            });
        }

        // Also calculate overall summary from the first channel (main channel)
        const mainChannelPath = path.resolve(process.cwd(), 'src/data', CHANNELS[0].dataFile);
        let mainData = [];
        if (fs.existsSync(mainChannelPath)) {
            const fileContent = fs.readFileSync(mainChannelPath, 'utf8');
            mainData = JSON.parse(fileContent || '[]');
        }

        return NextResponse.json({
            success: true,
            channels: allChannelStats,
            // Legacy support for existing component
            data: mainData,
            summary: calculateSummary(mainData)
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to read discord stats'
        }, { status: 500 });
    }
}

const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = process.env.DISCORD_TOKEN;

// Multiple channels configuration
const CHANNELS = [
    {
        id: process.env.DISCORD_CHANNEL_ID || '1323638619327664169',
        name: 'smc-pro-tools-statistics',
        dataFile: './src/data/discord-stats.json'
    },
    {
        id: '1462025254057803777',
        name: 'channel-1',
        dataFile: './src/data/discord-stats-channel1.json'
    },
    {
        id: '1462025305924571303',
        name: 'channel-2',
        dataFile: './src/data/discord-stats-channel2.json'
    }
];

// Function to parse the message format
function parseTradingMessage(content) {
    const lines = content.split('\n');
    let currentDate = null;
    const stats = [];

    lines.forEach(line => {
        // Match Date: 📍 12/1/2026
        const dateMatch = line.match(/📍\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (dateMatch) {
            currentDate = dateMatch[1];
            return;
        }

        // Match Trade: ✅buy : +1,000 or ⭕️sell : -500
        const tradeMatch = line.match(/^([^\w\s]+)\s*(buy|sell)\s*:\s*([+-]?[\d,]+)/i);
        if (currentDate && tradeMatch) {
            const emoji = tradeMatch[1].trim();
            const isWin = emoji.includes('✅');
            const type = tradeMatch[2].toLowerCase();
            const points = parseInt(tradeMatch[3].replace(/,/g, ''));

            console.log(`📍 Parsed: ${currentDate} | ${emoji} ${type} | ${points} | Win: ${isWin}`);

            stats.push({
                date: currentDate,
                type: type,
                isWin: isWin,
                points: points
            });
        }
    });

    return stats;
}

// Function to update JSON file for a specific channel
function updateStatsFile(dataFile, newStats) {
    const fullPath = path.resolve(__dirname, dataFile);
    try {
        // Ensure directory exists
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        let currentData = [];
        if (fs.existsSync(fullPath)) {
            const fileContent = fs.readFileSync(fullPath, 'utf8');
            currentData = JSON.parse(fileContent || '[]');
        }

        // Group by date
        const groupedData = {};
        currentData.forEach(day => {
            groupedData[day.date] = day;
        });

        // Update with new data
        newStats.forEach(stat => {
            if (!groupedData[stat.date]) {
                groupedData[stat.date] = {
                    date: stat.date,
                    trades: [],
                    totalPoints: 0,
                    wins: 0,
                    losses: 0
                };
            }

            const day = groupedData[stat.date];
            day.trades.push({
                type: stat.type,
                isWin: stat.isWin,
                points: stat.points
            });

            day.totalPoints += stat.points;
            if (stat.isWin) day.wins++;
            else day.losses++;
        });

        const finalData = Object.values(groupedData);
        fs.writeFileSync(fullPath, JSON.stringify(finalData, null, 2));
        console.log(`✅ Updated stats for ${newStats.length} entries in ${dataFile}`);
    } catch (error) {
        console.error(`❌ Error updating file ${dataFile}:`, error);
    }
}

// Function to fetch and process history for a specific channel
async function fetchChannelHistory(channelConfig) {
    try {
        const channel = await client.channels.fetch(channelConfig.id);
        if (channel) {
            console.log(`📜 Fetching history from #${channel.name || channelConfig.name}...`);
            const messages = await channel.messages.fetch({ limit: 100 });
            console.log(`📥 Found ${messages.size} messages in ${channelConfig.name}. Parsing...`);

            let allParsedStats = [];
            messages.forEach(msg => {
                if (!msg.author.bot) {
                    const stats = parseTradingMessage(msg.content);
                    if (stats.length > 0) {
                        allParsedStats = [...allParsedStats, ...stats];
                    }
                }
            });

            if (allParsedStats.length > 0) {
                // Clear existing and rebuild
                const fullPath = path.resolve(__dirname, channelConfig.dataFile);
                fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
                updateStatsFile(channelConfig.dataFile, allParsedStats);
                console.log(`✅ Historical data populated for ${channelConfig.name}`);
            } else {
                // Create empty file if no data
                const fullPath = path.resolve(__dirname, channelConfig.dataFile);
                if (!fs.existsSync(fullPath)) {
                    fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
                    console.log(`📄 Created empty data file for ${channelConfig.name}`);
                }
            }
        }
    } catch (error) {
        console.error(`❌ Error fetching history for ${channelConfig.name}:`, error.message);
        // Create empty file on error
        const fullPath = path.resolve(__dirname, channelConfig.dataFile);
        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
        }
    }
}

client.once('ready', async () => {
    console.log(`🤖 Bot is online as ${client.user.tag}`);
    console.log(`📊 Monitoring ${CHANNELS.length} channels...`);

    // Fetch historical messages for all channels
    for (const channelConfig of CHANNELS) {
        await fetchChannelHistory(channelConfig);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if this message is from any of our monitored channels
    const channelConfig = CHANNELS.find(ch => ch.id === message.channelId);
    if (!channelConfig) return;

    console.log(`📩 Received message in ${channelConfig.name}: ${message.content.substring(0, 50)}...`);

    const parsedStats = parseTradingMessage(message.content);
    if (parsedStats.length > 0) {
        updateStatsFile(channelConfig.dataFile, parsedStats);
    }
});

client.login(TOKEN);

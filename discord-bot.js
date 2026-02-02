/**
 * Discord Bot for VIP Registration Automation
 * Supports multiple roles: Starter, Trader, V.I.P., Trial Access
 * 
 * Status mapping:
 * - "Approved Starter" → Starter role
 * - "Approved Trader" → Trader role  
 * - "Approved V.I.P." → V.I.P. role
 * - "Approved Trial Access" → Trial Access role (with time limit)
 */

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const http = require('http');

// ============================================
// Health Check HTTP Server for Render.com
// MUST START FIRST before Discord bot login
// ============================================
const PORT = process.env.PORT || 10000;

// Create health check server immediately
const healthCheckServer = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            service: 'discord-bot',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start server IMMEDIATELY and synchronously wait
healthCheckServer.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Health check server is READY on port ${PORT}`);
    console.log(`🔗 Listening on http://0.0.0.0:${PORT}`);
});

// Configuration
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

// Trial Access Configuration
const TRIAL_DURATION_MS = 2 * 60 * 1000; // 2 minutes (for testing)
const activeTrials = new Map(); // Track active trial users: discordId -> { timerId, userName, rowIndex }

// Role IDs mapping
const ROLE_IDS = {
    starter: process.env.DISCORD_STARTER_ROLE_ID,
    trader: process.env.DISCORD_TRADER_ROLE_ID,
    vip: process.env.DISCORD_VIP_ROLE_ID,
    trial: process.env.DISCORD_TRIAL_ROLE_ID,
};

// Status to Role mapping
const STATUS_TO_ROLE = {
    'approved starter': 'starter',
    'approved trader': 'trader',
    'approved v.i.p.': 'vip',
    'approved vip': 'vip',
    'approved trial access': 'trial',
};

// Polling interval (in milliseconds)
const POLL_INTERVAL = 30000; // 30 seconds

// Keep track of processed rows
const processedRows = new Set();

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

// Fetch approved registrations from Google Apps Script
async function fetchApprovedRegistrations() {
    if (!GOOGLE_APPS_SCRIPT_URL) {
        console.log('⚠️  GOOGLE_APPS_SCRIPT_URL not configured');
        return [];
    }

    try {
        const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getApproved`);
        const result = await response.json();

        if (result.success) {
            return result.data || [];
        } else {
            console.error('❌ Failed to fetch data:', result.error);
            return [];
        }
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return [];
    }
}

// Update status in Google Sheets via Apps Script
async function updateStatus(rowIndex, newStatus) {
    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'updateStatus',
                rowIndex: rowIndex,
                newStatus: newStatus
            })
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('❌ Update status error:', error.message);
        return false;
    }
}

// Get role name for welcome message
function getRoleName(roleType) {
    const names = {
        starter: 'Starter',
        trader: 'Trader',
        vip: 'V.I.P.',
        trial: 'Trial Access'
    };
    return names[roleType] || roleType;
}

// Send trial welcome DM to user
async function sendTrialWelcomeDM(user, userName, durationMinutes) {
    try {
        const embed = new EmbedBuilder()
            .setColor(0xFFA500) // Orange for trial
            .setTitle(`⏱️ ยินดีต้อนรับสู่ Trial Access!`)
            .setDescription(`สวัสดีคุณ **${userName}**!\n\nคุณได้รับ **Trial Access** เรียบร้อยแล้ว`)
            .addFields(
                { name: '⏰ ระยะเวลาทดลองใช้งาน', value: `**${durationMinutes} นาที**`, inline: true },
                { name: '⚠️ หมายเหตุ', value: 'เมื่อหมดเวลาทดลองใช้งาน คุณจะถูกนำออกจาก Server โดยอัตโนมัติ', inline: false }
            )
            .setFooter({ text: 'crt.trader | Trial Access System' })
            .setTimestamp();

        await user.send({ embeds: [embed] });
        console.log(`   ✅ Sent trial welcome DM to ${user.tag}`);
        return true;
    } catch (error) {
        console.error(`   ⚠️ Could not send trial DM to ${user.tag}:`, error.message);
        return false;
    }
}

// Send trial expiry notification
async function sendTrialExpiryDM(user, userName) {
    try {
        const embed = new EmbedBuilder()
            .setColor(0xFF0000) // Red for expiry
            .setTitle(`⏱️ Trial Access หมดอายุแล้ว`)
            .setDescription(`คุณ **${userName}**\n\nระยะเวลาทดลองใช้งานของคุณสิ้นสุดลงแล้ว คุณถูกนำออกจาก Server`)
            .addFields(
                { name: '🔓 ต้องการใช้งานต่อ?', value: 'หากต้องการสมัครสมาชิก กรุณาลงทะเบียนใหม่เพื่อรับสิทธิ์เต็มรูปแบบ', inline: false }
            )
            .setFooter({ text: 'crt.trader | Trial Access System' })
            .setTimestamp();

        await user.send({ embeds: [embed] });
        console.log(`   ✅ Sent trial expiry DM to ${user.tag}`);
        return true;
    } catch (error) {
        console.error(`   ⚠️ Could not send expiry DM:`, error.message);
        return false;
    }
}

// Start trial timer for user
async function startTrialTimer(guild, discordId, userName, rowIndex) {
    const durationMinutes = TRIAL_DURATION_MS / 60000;
    console.log(`   ⏱️ Starting ${durationMinutes} minute trial timer for ${userName}`);

    // Clear any existing timer for this user
    if (activeTrials.has(discordId)) {
        const existing = activeTrials.get(discordId);
        clearTimeout(existing.timerId);
        console.log(`   ℹ️ Cleared existing trial timer for ${userName}`);
    }

    // Set timer to kick user when trial expires
    const timerId = setTimeout(async () => {
        await kickTrialUser(guild, discordId, userName, rowIndex);
    }, TRIAL_DURATION_MS);

    // Track the trial
    activeTrials.set(discordId, {
        timerId: timerId,
        userName: userName,
        rowIndex: rowIndex,
        startTime: Date.now()
    });

    return true;
}

// Kick trial user when time expires
async function kickTrialUser(guild, discordId, userName, rowIndex) {
    console.log(`\n⏱️ Trial expired for ${userName}`);

    try {
        const member = await guild.members.fetch(discordId).catch(() => null);

        if (member) {
            // Send DM before kicking
            await sendTrialExpiryDM(member.user, userName);

            // Kick the member
            await member.kick('Trial Access period expired');
            console.log(`   ✅ Kicked ${member.user.tag} - Trial expired`);
        } else {
            console.log(`   ℹ️ Member ${discordId} already left the server`);
        }

        // Update status in Google Sheets
        const updated = await updateStatus(rowIndex, 'Done - Trial Access (Expired)');
        if (updated) {
            console.log(`   ✅ Status updated to "Done - Trial Access (Expired)"`);
        }

        // Remove from active trials
        activeTrials.delete(discordId);

    } catch (error) {
        console.error(`   ❌ Failed to kick trial user ${discordId}:`, error.message);
    }
}

// Send welcome DM to user
async function sendWelcomeDM(user, userName, roleType) {
    try {
        const roleName = getRoleName(roleType);

        const embed = new EmbedBuilder()
            .setColor(roleType === 'vip' ? 0x9B59B6 : roleType === 'trader' ? 0x3498DB : 0x2ECC71)
            .setTitle(`🎉 ยินดีต้อนรับสู่ ${roleName} Community!`)
            .setDescription(`สวัสดีคุณ **${userName}**!\n\nการลงทะเบียนของคุณได้รับการอนุมัติแล้ว คุณได้รับ **${roleName}** Role เรียบร้อย`)
            .addFields(
                { name: '✨ สิทธิพิเศษ', value: `• เข้าถึงห้องสำหรับ ${roleName}\n• รับข่าวสารและอัพเดทล่าสุด\n• เข้าร่วมกลุ่มสนทนา ${roleName}`, inline: false }
            )
            .setFooter({ text: 'crt.trader | Registration System' })
            .setTimestamp();

        await user.send({ embeds: [embed] });
        console.log(`   ✅ Sent welcome DM to ${user.tag}`);
        return true;
    } catch (error) {
        console.error(`   ⚠️ Could not send DM to ${user.tag}:`, error.message);
        return false;
    }
}

// Assign role to user
async function assignRole(guild, discordId, userName, roleType, rowIndex) {
    const roleId = ROLE_IDS[roleType];

    if (!roleId) {
        console.log(`   ❌ Role ID for "${roleType}" not configured`);
        return false;
    }

    try {
        const member = await guild.members.fetch(discordId);

        if (!member) {
            console.log(`   ❌ Member ${discordId} not found in server`);
            return false;
        }

        const role = guild.roles.cache.get(roleId);

        if (!role) {
            console.log(`   ❌ Role ${roleId} not found`);
            return false;
        }

        // Check if member already has the role
        if (member.roles.cache.has(roleId)) {
            console.log(`   ℹ️ ${member.user.tag} already has ${getRoleName(roleType)} role`);
            return true;
        }

        await member.roles.add(role);
        console.log(`   ✅ Assigned ${getRoleName(roleType)} role to ${member.user.tag}`);

        // Handle Trial Access differently
        if (roleType === 'trial') {
            const durationMinutes = TRIAL_DURATION_MS / 60000;
            await sendTrialWelcomeDM(member.user, userName, durationMinutes);
            await startTrialTimer(guild, discordId, userName, rowIndex);
        } else {
            // Send regular welcome DM
            await sendWelcomeDM(member.user, userName, roleType);
        }

        return true;
    } catch (error) {
        console.error(`   ❌ Failed to assign role to ${discordId}:`, error.message);
        return false;
    }
}

// Process approved registrations
async function processApprovedRegistrations() {
    console.log(`\n🔄 [${new Date().toLocaleTimeString()}] Polling for approved registrations...`);

    try {
        const approved = await fetchApprovedRegistrations();

        if (approved.length === 0) {
            console.log(`   ℹ️ No pending approved registrations found`);
            return;
        }

        console.log(`\n📋 Found ${approved.length} approved registration(s)`);

        const guild = client.guilds.cache.get(DISCORD_GUILD_ID);

        if (!guild) {
            console.log('❌ Guild not found. Check DISCORD_GUILD_ID');
            return;
        }

        for (const registration of approved) {
            const rowKey = `${registration.rowIndex}-${registration.connextId}`;

            // Skip if already processed in this session
            if (processedRows.has(rowKey)) {
                continue;
            }

            const status = (registration.status || '').toString().toLowerCase().trim();
            const roleType = STATUS_TO_ROLE[status];

            if (!roleType) {
                console.log(`\n⚠️ Unknown status: "${registration.status}" for ${registration.name}`);
                continue;
            }

            console.log(`\n🔄 Processing: ${registration.name} ${registration.surname}`);
            console.log(`   Discord ID: ${registration.discordId}`);
            console.log(`   Status: ${registration.status} → ${getRoleName(roleType)} role`);
            console.log(`   Row: ${registration.rowIndex}`);

            if (!registration.discordId) {
                console.log(`   ⚠️ No valid Discord ID found`);
                continue;
            }

            const success = await assignRole(
                guild,
                registration.discordId,
                `${registration.name} ${registration.surname}`,
                roleType,
                registration.rowIndex
            );

            if (success) {
                // For trial, status update happens when trial expires
                // For other roles, update status immediately
                if (roleType !== 'trial') {
                    const updated = await updateStatus(registration.rowIndex, `Done - ${getRoleName(roleType)}`);
                    if (updated) {
                        console.log(`   ✅ Status updated to "Done - ${getRoleName(roleType)}"`);
                    }
                } else {
                    // For trial, mark as active (not done yet)
                    const updated = await updateStatus(registration.rowIndex, 'Trial Access Active');
                    if (updated) {
                        console.log(`   ✅ Status updated to "Trial Access Active"`);
                    }
                }

                processedRows.add(rowKey);
            }
        }
    } catch (error) {
        console.error('❌ Error processing registrations:', error.message);
    }
}

// Bot ready event
client.once('ready', () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🤖 Bot: ${client.user.tag}`);
    console.log(`🏠 Guild: ${DISCORD_GUILD_ID}`);
    console.log(`\n📋 Role Configuration:`);
    console.log(`   Starter: ${ROLE_IDS.starter || '❌ NOT SET'}`);
    console.log(`   Trader:  ${ROLE_IDS.trader || '❌ NOT SET'}`);
    console.log(`   V.I.P.:  ${ROLE_IDS.vip || '❌ NOT SET'}`);
    console.log(`   Trial:   ${ROLE_IDS.trial || '❌ NOT SET'}`);
    console.log(`\n⏱️  Trial Duration: ${TRIAL_DURATION_MS / 60000} minutes`);
    console.log(`\n🔗 Apps Script: ${GOOGLE_APPS_SCRIPT_URL ? 'Configured ✓' : 'NOT CONFIGURED ❌'}`);
    console.log(`⏱️  Polling: Every ${POLL_INTERVAL / 1000}s`);
    console.log(`${'='.repeat(60)}\n`);

    // Initial check
    processApprovedRegistrations();

    // Set up polling interval
    setInterval(processApprovedRegistrations, POLL_INTERVAL);
});

// Error handling
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Start the bot
// Health Check is now handled by the Next.js app on port 3000 (or process.env.PORT)
console.log('🚀 Starting Discord Bot service...');

console.log('🚀 Starting Discord Bot...');

if (!DISCORD_BOT_TOKEN) {
    console.error('❌ DISCORD_BOT_TOKEN not found in .env');
    process.exit(1);
}

if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('❌ GOOGLE_APPS_SCRIPT_URL not found in .env');
    process.exit(1);
}

client.login(DISCORD_BOT_TOKEN).catch((error) => {
    console.error('❌ Failed to login:', error.message);
    process.exit(1);
});

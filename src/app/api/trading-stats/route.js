import { NextResponse } from 'next/server';

// Google Sheet ID
const SHEET_ID = '1oFkioAC9SlhSl_keT4ruN0nKjjcp3HIZ1EqiHqJKEXY';

// Sheet GIDs mapping
const SHEET_GIDS = {
    'พฤศจิกายน2025': { gid: '311488359', name: { en: 'November 2025', th: 'พฤศจิกายน 2568' } },
    'ธันวาคม2025': { gid: '787660477', name: { en: 'December 2025', th: 'ธันวาคม 2568' } },
    'มกราคม2026': { gid: '889820927', name: { en: 'January 2026', th: 'มกราคม 2569' } },
};

// Order of months (newest first)
const MONTH_ORDER = ['มกราคม2026', 'ธันวาคม2025', 'พฤศจิกายน2025'];

async function fetchSheetData(gid) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status}`);
        }

        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error('Error fetching sheet:', error);
        throw error;
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').map(line => {
        // Handle CSV parsing with quoted fields
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    });

    return lines;
}

function extractSummaryData(rows) {
    // Extract data from specific cells as specified by user:
    // Growth: O2 (row index 1, col index 14)
    // Total Profit: M5 (row index 4, col index 12)
    // Win Rate: M10 (row index 9, col index 12)
    // Wins: M8 (row index 7, col index 12)
    // Losses: M9 (row index 8, col index 12)

    // Helper function to safely get cell value
    const getCell = (rowIndex, colIndex) => {
        if (rows[rowIndex] && rows[rowIndex][colIndex] !== undefined) {
            return rows[rowIndex][colIndex];
        }
        return '';
    };

    // Helper function to parse number from cell
    const parseNumber = (value) => {
        if (!value) return 0;
        // Remove any non-numeric characters except decimal point and minus
        const cleaned = String(value).replace(/[^0-9.-]/g, '');
        return parseFloat(cleaned) || 0;
    };

    // Extract from specific cells (0-indexed: row 1 = index 1, col M = index 12, col O = index 14)
    const deposit = parseNumber(getCell(1, 12));      // M2 - Deposit for chart calculations
    const growthRate = parseNumber(getCell(1, 14));   // O2
    const totalProfit = parseNumber(getCell(4, 12));  // M5
    const wins = parseInt(parseNumber(getCell(7, 12))) || 0;   // M8
    const losses = parseInt(parseNumber(getCell(8, 12))) || 0; // M9
    const winRate = parseNumber(getCell(9, 12));      // M10

    // Total trades = wins + losses
    const totalTrades = wins + losses;

    return {
        deposit,
        profit: totalProfit,
        growth: Math.round(growthRate * 100) / 100,
        winRate: Math.round(winRate * 100) / 100,
        wins,
        losses,
        totalTrades,
        totalPoints: 0
    };
}

function extractDailyData(rows, deposit) {
    const dailyData = [];
    const dailyMap = new Map();

    // Skip header row, process trade data (columns A-J)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length < 10) continue;

        const no = row[0];
        const date = row[1];
        const profitStr = row[7];
        const win = row[8];
        const lose = row[9];

        // Skip if not a valid trade row
        if (!no || !date || isNaN(parseInt(no))) continue;

        const profit = parseFloat(profitStr?.replace(/[^0-9.-]/g, '')) || 0;
        const isWin = win === '1' || win === 1;
        const isLose = lose === '1' || lose === 1;

        // Aggregate by date
        const dateKey = date.trim();
        if (!dailyMap.has(dateKey)) {
            dailyMap.set(dateKey, {
                date: dateKey,
                profit: 0,
                trades: 0,
                wins: 0,
                losses: 0
            });
        }

        const dayData = dailyMap.get(dateKey);
        dayData.profit += profit;
        dayData.trades += 1;
        if (isWin) dayData.wins += 1;
        if (isLose) dayData.losses += 1;
    }

    // Convert to array
    const unsortedData = [];
    dailyMap.forEach((value, key) => {
        unsortedData.push({
            date: formatDate(key),
            rawDate: key,
            day: key.split('/')[0],
            profit: Math.round(value.profit * 100) / 100,
            trades: value.trades,
            wins: value.wins,
            losses: value.losses
        });
    });

    // Sort by date
    unsortedData.sort((a, b) => {
        const partsA = a.rawDate.split('/').map(Number);
        const partsB = b.rawDate.split('/').map(Number);
        // Compare year first (if exists), then month, then day
        if (partsA.length >= 3 && partsB.length >= 3) {
            if (partsA[2] !== partsB[2]) return partsA[2] - partsB[2];
        }
        if (partsA[1] !== partsB[1]) return partsA[1] - partsB[1];
        return partsA[0] - partsB[0];
    });

    // Calculate cumulative profit and growth percentage
    let cumulativeProfit = 0;
    unsortedData.forEach(day => {
        cumulativeProfit += day.profit;
        day.cumulativeProfit = Math.round(cumulativeProfit * 100) / 100;
        // Calculate growth % based on deposit
        if (deposit > 0) {
            day.growth = Math.round((cumulativeProfit / deposit) * 100 * 100) / 100;
        } else {
            day.growth = 0;
        }
        delete day.rawDate; // Remove temp field
    });

    return unsortedData;
}

function formatDate(dateStr) {
    // Convert from DD/MM/YYYY to DD/MM format
    const parts = dateStr.split('/');
    if (parts.length >= 2) {
        return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}`;
    }
    return dateStr;
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month') || 'มกราคม2026';

        // Get sheet info
        const sheetInfo = SHEET_GIDS[month];
        if (!sheetInfo) {
            return NextResponse.json({
                success: false,
                error: 'Invalid month parameter',
                availableMonths: MONTH_ORDER
            }, { status: 400 });
        }

        // Fetch CSV data
        const rows = await fetchSheetData(sheetInfo.gid);

        // Extract summary and daily data
        const summary = extractSummaryData(rows);
        const dailyData = extractDailyData(rows, summary.deposit);

        return NextResponse.json({
            success: true,
            data: {
                monthKey: month,
                monthName: sheetInfo.name,
                summary,
                dailyData
            },
            availableMonths: MONTH_ORDER.map(key => ({
                key,
                name: SHEET_GIDS[key].name
            }))
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to fetch trading stats'
        }, { status: 500 });
    }
}

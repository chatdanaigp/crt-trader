/**
 * Google Apps Script สำหรับระบบลงทะเบียน VIP
 * รองรับหลายสถานะ: Approved Starter, Approved Trader, Approved V.I.P., Approved Trial Access
 */

const DRIVE_FOLDER_ID = '1y4yx-QnGunkU1NBBjjknrURCocaMi8L6';

// Approved statuses to look for
const APPROVED_STATUSES = [
    'approved starter',
    'approved trader',
    'approved v.i.p.',
    'approved vip',
    'approved trial access'
];

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);

        if (data.action === 'updateStatus') {
            return updateRowStatus(data.rowIndex, data.newStatus);
        }

        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName('data') || ss.getSheets()[0];

        let driveLink = '';
        if (data.transferSlipBase64) {
            driveLink = uploadImageToDrive(
                data.transferSlipBase64,
                data.transferSlipName,
                data.transferSlipType
            );
        }

        sheet.appendRow([
            data.connextId,
            data.name,
            data.surname,
            data.provinceCountry,
            data.phoneNumber,
            data.discordUser,
            data.platform,
            data.products,
            driveLink,
            'Pending'
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true, driveLink: driveLink }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet(e) {
    try {
        const action = e.parameter.action;

        if (action === 'getPending') {
            return getPendingRegistrations();
        }

        if (action === 'getApproved') {
            return getApprovedRegistrations();
        }

        return ContentService
            .createTextOutput(JSON.stringify({
                status: 'ok',
                message: 'VIP Registration API is running',
                supportedStatuses: ['Approved Starter', 'Approved Trader', 'Approved V.I.P.', 'Approved Trial Access'],
                timestamp: new Date().toISOString()
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function getApprovedRegistrations() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('data') || ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();

    const approved = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const status = (row[9] || '').toString().toLowerCase().trim();

        // Check if status matches any approved status
        if (APPROVED_STATUSES.includes(status)) {
            const discordString = row[5] || '';
            const match = discordString.match(/\((\d+)\)/);
            const discordId = match ? match[1] : null;

            approved.push({
                rowIndex: i + 1,
                connextId: row[0],
                name: row[1],
                surname: row[2],
                discordId: discordId,
                discordString: discordString,
                status: row[9] // Keep original case for display
            });
        }
    }

    return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: approved }))
        .setMimeType(ContentService.MimeType.JSON);
}

function getPendingRegistrations() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('data') || ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();

    const pending = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const status = (row[9] || '').toString().toLowerCase();

        if (status === 'pending') {
            pending.push({
                rowIndex: i + 1,
                connextId: row[0],
                name: row[1],
                surname: row[2],
                transferSlip: row[8],
                status: row[9]
            });
        }
    }

    return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: pending }))
        .setMimeType(ContentService.MimeType.JSON);
}

function updateRowStatus(rowIndex, newStatus) {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName('data') || ss.getSheets()[0];
        sheet.getRange(rowIndex, 10).setValue(newStatus);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true, message: 'Status updated' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function uploadImageToDrive(base64Data, fileName, mimeType) {
    try {
        const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');

        const blob = Utilities.newBlob(
            Utilities.base64Decode(base64Clean),
            mimeType || 'image/jpeg',
            fileName || 'transfer_slip.jpg'
        );

        const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

        return file.getUrl();

    } catch (error) {
        return 'Upload failed: ' + error.message;
    }
}

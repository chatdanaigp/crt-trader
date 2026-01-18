import { NextResponse } from 'next/server';

// Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Extract form fields
        const connextId = formData.get('connextId');
        const name = formData.get('name');
        const surname = formData.get('surname');
        const provinceCountry = formData.get('provinceCountry');
        const phoneNumber = formData.get('phoneNumber');
        const discordId = formData.get('discordId');
        const discordUsername = formData.get('discordUsername');
        const platform = formData.get('platform');
        const products = JSON.parse(formData.get('products') || '[]');
        const transferSlip = formData.get('transferSlip');

        // Validate required fields
        if (!connextId || !name || !surname || !provinceCountry || !phoneNumber || !platform || products.length === 0) {
            return NextResponse.json(
                { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
                { status: 400 }
            );
        }

        if (!transferSlip) {
            return NextResponse.json(
                { error: 'กรุณาอัพโหลดหลักฐานการโอนเงิน' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await transferSlip.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');

        // Prepare data for Apps Script
        const payload = {
            connextId,
            name,
            surname,
            provinceCountry,
            phoneNumber,
            discordUser: `${discordUsername} (${discordId})`,
            platform,
            products: products.join(', '),
            transferSlipBase64: base64,
            transferSlipName: `slip_${connextId}_${Date.now()}_${transferSlip.name}`,
            transferSlipType: transferSlip.type,
        };

        // Check if Apps Script URL is configured
        if (!GOOGLE_APPS_SCRIPT_URL) {
            console.log('='.repeat(60));
            console.log('📋 REGISTRATION DATA (Apps Script URL not configured)');
            console.log('='.repeat(60));
            console.log(`Connext ID: ${connextId}`);
            console.log(`Name: ${name} ${surname}`);
            console.log(`Province/Country: ${provinceCountry}`);
            console.log(`Phone: ${phoneNumber}`);
            console.log(`Discord: ${discordUsername} (${discordId})`);
            console.log(`Platform: ${platform}`);
            console.log(`Products: ${products.join(', ')}`);
            console.log(`Transfer Slip: ${transferSlip.name} (${(transferSlip.size / 1024).toFixed(2)} KB)`);
            console.log('='.repeat(60));
            console.log('');
            console.log('⚠️  กรุณาตั้งค่า GOOGLE_APPS_SCRIPT_URL ใน .env');
            console.log('');

            return NextResponse.json({
                success: true,
                message: 'ลงทะเบียนสำเร็จ (Demo Mode) - กรุณาตั้งค่า Apps Script URL',
                demo: true,
            });
        }

        // Send to Google Apps Script
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Google Apps Script error');
        }

        console.log('✅ Registration successful:', {
            connextId,
            name: `${name} ${surname}`,
            driveLink: result.driveLink,
        });

        return NextResponse.json({
            success: true,
            message: 'ลงทะเบียนสำเร็จ รอการอนุมัติจากแอดมิน',
            driveLink: result.driveLink,
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง' },
            { status: 500 }
        );
    }
}

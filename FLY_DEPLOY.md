# Fly.io Discord Bot Deployment

## ขั้นตอนการ Deploy

### 1. ติดตั้ง Fly CLI
```bash
# macOS
brew install flyctl

# หรือ
curl -L https://fly.io/install.sh | sh
```

### 2. สมัคร Fly.io และ Login
```bash
flyctl auth signup
# หรือถ้ามี account แล้ว
flyctl auth login
```

### 3. สร้าง App บน Fly.io
```bash
cd /Users/chatdanai/.gemini/antigravity/scratch/crt-trader
flyctl launch --no-deploy
```

### 4. ตั้งค่า Environment Variables
```bash
flyctl secrets set DISCORD_BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN"
flyctl secrets set DISCORD_GUILD_ID="1462468545513259170"
flyctl secrets set DISCORD_STARTER_ROLE_ID="1462471364568154224"
flyctl secrets set DISCORD_TRADER_ROLE_ID="1462471782673023154"
flyctl secrets set DISCORD_VIP_ROLE_ID="1462471876243619904"
flyctl secrets set GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbyC3PDrduxBspA2KjXx1f0hW-O8M4nOgPIrxCBCDc3FUugwB1Q566A9DWxAPwhZHfxC/exec"
```

### 5. Deploy
```bash
flyctl deploy
```

### 6. ตรวจสอบ Logs
```bash
flyctl logs
```

## คำสั่งที่ใช้บ่อย
- `flyctl status` - ดูสถานะ app
- `flyctl logs` - ดู logs
- `flyctl ssh console` - เข้า shell ใน container
- `flyctl scale count 1` - ตั้งจำนวน machines

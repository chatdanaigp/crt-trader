# Deploy Discord Bot on Render.com (Free Alternative)

เนื่องจาก Fly.io มีการจำกัดการใช้งานฟรีแบบต้องผูกบัตร เราสามารถย้ายไปใช้ **Render.com** (Free Tier) แทนได้ครับ

> **ข้อควรระวัง:** Render Free Tier จะเข้าโหมด Sleep ถ้าไม่มีการใช้งาน (Web Traffic) เกิน 15 นาที ทำให้ต้องใช้ **UptimeRobot** ช่วยยิง Ping เพื่อปลุก Bot ให้ตื่นตลอดเวลา

---

## ขั้นตอนการ Deploy

### 1. สมัครสมาชิก Render
1. ไปที่ [dashboard.render.com/register](https://dashboard.render.com/register)
2. เลือก **Sign up with GitHub** (จะง่ายที่สุดเพราะเรามีโค้ดใน GitHub แล้ว)

### 2. สร้าง Web Service ใหม่
1. กดปุ่ม **New +** ปุ่มสีฟ้าด้านขวาบน -> เลือก **Web Service**
2. เลือก Repository: `crt-trader` (ที่คุณเพิ่ง Push ขึ้นไป)
3. ตั้งค่าดังนี้:
   - **Name:** `crt-trader-bot` (หรือชื่ออื่นตามต้องการ)
   - **Region:** `Singapore` (ถ้ามี) หรือใกล้เคียง
   - **Branch:** `main`
   - **Root Directory:** `.` (เว้นว่างไว้ หรือใส่จุด)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`  <-- **สำคัญ!** จะรันทั้ง Web และ Bot พร้อมกัน
   - **Instance Type:** `Free`

4. **Environment Variables:** (กด Add Environment Variable)
   - ก๊อปปี้ค่าจากไฟล์ `.env` ใส่เข้าไปให้ครบ:
     - `DISCORD_BOT_TOKEN`
     - `DISCORD_GUILD_ID`
     - `DISCORD_STARTER_ROLE_ID`
     - `DISCORD_TRADER_ROLE_ID`
     - `DISCORD_VIP_ROLE_ID`
     - `GOOGLE_APPS_SCRIPT_URL`
   - เพิ่ม `PORT` = `10000` (Render บังคับใช้ port นี้สำหรับ Web Service)

5. กด **Create Web Service**

### 3. รอ Deploy
- Render จะเริ่ม Build และ Deploy
- รอดู Logs จนขึ้นว่า `Bot is online!` และ `Health check server listening on port 10000`
- ก๊อปปี้ **URL ของเว็บ** ที่ได้มา (เช่น `https://crt-trader-bot.onrender.com`) เก็บไว้

---

## ขั้นตอนการทำไห้ Bot ไม่หลับ (Keep Awake)

เนื่องจาก Render Free จะหลับ เราต้องใช้บริการภายนอกช่วยกระตุ้น

1. ไปที่ [uptimerobot.com](https://uptimerobot.com/) สมัครสมาชิกฟรี
2. กด **Add New Monitor**
   - **Monitor Type:** `HTTP(s)`
   - **Friendly Name:** `Discord Bot`
   - **URL (or IP):** (ใส่ URL ที่ได้จาก Render ในข้อ 3)
   - **Monitoring Interval:** `5 minutes` (สำคัญ! ต้องน้อยกว่า 15 นาที)
3. กด **Create Monitor**

✅ **เสร็จสิ้น!** ตอนนี้ Bot ของคุณจะทำงานตลอด 24 ชม. บน Render ฟรีครับ

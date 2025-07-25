# 🛡️ Border Alert Web App

**แอปพลิเคชันแจ้งเตือนสถานการณ์ปะทะชายแดนไทย-กัมพูชาแบบเรียลไทม์** พร้อมแสดงตำแหน่งบนแผนที่ Leaflet (OpenStreetMap)

---

## 🔎 ฟีเจอร์หลัก

- แสดงแผนที่ประเทศไทยพร้อมหมุดแจ้งเหตุ
- เพิ่มข้อมูลข่าวพร้อมตำแหน่ง
- ลิงก์ข่าวเพิ่มเติมได้
- แก้ไขข้อมูลได้หากข้อมูลผิดพลาด
- ลบหมุดหากข้อมูลผิดพลาด
- ค้นหาสถานที่
- อัปเดตเรียลไทม์ด้วย Socket.io
- จัดเก็บข้อมูลลง PostgreSQL

---

## ⚙️ วิธีติดตั้งใช้งาน (Local)

### 1. Clone โค้ด

```bash
git clone https://github.com/dewzdewzdewz/border-alert-app-by-dewzdewzdewz.git
cd border-alert-app
```

### 2. สร้างฐานข้อมูล PostgreSQL

```sql
CREATE DATABASE postgres;
```

จากนั้นรันไฟล์:

```bash
psql -d postgres -f server/db/schema.sql
```

### 3. สร้างไฟล์ `.env`

```env
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=postgres
```

### 4. ติดตั้ง Dependencies

```bash
npm install
```

### 5. รันแอป

```bash
npm run dev
```

---

## 💬 เกี่ยวกับโปรเจกต์

แอปนี้สร้างขึ้นโดย **Nitipon Khachornphop**  
เพื่อช่วยให้ประชาชนรับทราบสถานการณ์ความไม่สงบชายแดนไทย-กัมพูชา  
**ไม่แสวงหาผลกำไร** และเผยแพร่เพื่อสาธารณประโยชน์

📬 หากมีข้อเสนอแนะ: nitiponkhachornphop@gmail.com

---

## ⚖️ License

This project is released under the MIT License.  
You are free to use, modify, and share — ขอเพียงอ้างอิงกลับ

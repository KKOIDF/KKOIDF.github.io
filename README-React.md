# 💖 เว็บไซต์แห่งความรัก - React Version 💖

เว็บไซต์โรแมนติกที่สวยงามและทันสมัย สร้างด้วย React และ Framer Motion

## ✨ คุณสมบัติพิเศษ

- 🎠 **3D Carousel Gallery** - แกลเลอรี่แบบ 3 มิติที่หมุนได้
- ∞ **Infinite Scroll** - เลื่อนภาพแบบไม่มีที่สิ้นสุด  
- 🌊 **Parallax Effects** - เอฟเฟกต์ Parallax ที่สวยงาม
- ▦ **Morphing Grid** - ตารางภาพที่เปลี่ยนรูปแบบได้
- 💝 **8 หน้าสวยงาม** - หน้าแรก, วันเกิด, คนสำคัญ, แกลเลอรี่, ข้อความลับ, บทกวี, ติดต่อ
- 🎵 **ควบคุมเพลง** - เปิด/ปิดเพลงพื้นหลัง
- 💖 **เอฟเฟกต์พิเศษ** - หัวใจลอย, หิมะตก, แสงระยิบระยับ
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ

## 🚀 การติดตั้งและเรียกใช้

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. เรียกใช้ในโหมด Development
```bash
npm start
```

### 3. Build สำหรับ Production
```bash
npm run build
```

### 4. Deploy ไปยัง GitHub Pages
```bash
npm run deploy
```

## 🛠️ เทคโนโลยีที่ใช้

- **React 18.2.0** - JavaScript Framework
- **Framer Motion 10.16.4** - Animation Library
- **styled-components 6.0.7** - CSS-in-JS
- **React Spring 9.7.3** - Animation Effects
- **FontAwesome** - Icon System
- **Google Fonts** - Typography

## 📁 โครงสร้างโปรเจค

```
src/
├── components/          # React Components
│   ├── Navigation.js    # Navigation Bar
│   ├── FloatingHearts.js # Floating Hearts Effect
│   ├── SnowEffect.js    # Snow Animation
│   └── Lightbox.js      # Image Lightbox
├── pages/               # Page Components
│   ├── WelcomePage.js   # หน้าต้อนรับ
│   ├── BirthdayPage.js  # หน้าวันเกิด
│   ├── FavoritePeoplePage.js # หน้าคนสำคัญ
│   ├── GalleryPage.js   # หน้าแกลเลอรี่
│   ├── SecretMessage1Page.js # ข้อความลับ 1
│   ├── SecretMessage2Page.js # ข้อความลับ 2
│   ├── PoemPage.js      # หน้าบทกวี
│   └── ContactPage.js   # หน้าติดต่อ
├── GlobalStyles.js      # Global CSS Styles
├── App.js              # Main App Component
└── index.js            # Entry Point
```

## 🎨 คุณสมบัติของแกลเลอรี่

### 1. 3D Carousel (🎠)
- แกลเลอรี่แบบหมุนรอบ 3 มิติ
- เปลี่ยนภาพอัตโนมัติทุก 3 วินาที
- สามารถคลิกเพื่อดูภาพขนาดใหญ่

### 2. Infinite Scroll (∞)
- เลื่อนภาพแบบไม่มีที่สิ้นสุด
- เอฟเฟกต์ Hover ที่สวยงาม
- การเคลื่อนไหวที่ลื่นไหล

### 3. Parallax (🌊)
- เลเยอร์ภาพที่เคลื่อนไหวในความเร็วต่างกัน
- เอฟเฟกต์ความลึกแบบ 3 มิติ
- การเคลื่อนไหวแบบอนุพันธ์

### 4. Morphing Grid (▦)
- ตารางภาพที่ปรับขนาดได้
- การเรียงใหม่แบบ Dynamic
- เอฟเฟกต์การเปลี่ยนแปลงที่นุ่มนวล

## 💝 การปรับแต่ง

### เปลี่ยนภาพในแกลเลอรี่
1. เพิ่มภาพในโฟลเดอร์ `public/images/`
2. อัปเดต array `images` ในไฟล์ `src/pages/GalleryPage.js`

### เปลี่ยนสีธีม
1. แก้ไขไฟล์ `src/GlobalStyles.js`
2. เปลี่ยน gradient และสีในแต่ละ component

### เพิ่มหน้าใหม่
1. สร้างไฟล์ component ใหม่ในโฟลเดอร์ `src/pages/`
2. เพิ่มในarray `pages` ในไฟล์ `src/App.js`

## 🌟 การอัปเดตในอนาคต

- [ ] เพิ่มระบบเสียงเพลงพื้นหลัง
- [ ] เพิ่มโหมด Dark/Light Mode
- [ ] เพิ่มการแชร์ Social Media
- [ ] เพิ่ม PWA Support
- [ ] เพิ่มภาษาอังกฤษ

## 💌 ข้อความพิเศษ

เว็บไซต์นี้สร้างขึ้นด้วยความรักและการใส่ใจในทุกรายละเอียด 
ขอให้ทุกคนที่เข้ามาเยี่ยมชมได้รับความสุขและความประทับใจ 💖

---

สร้างด้วย ❤️ โดย React และ Framer Motion

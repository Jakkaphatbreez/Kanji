# คำสั่งที่ใช้บ่อย

## รันเว็บทดสอบ (local)

```bash
npm run dev
```
เปิด browser เอง ที่ `http://localhost:3000`

```bash
npm run dev:open
```
รันแล้วเปิด browser ให้อัตโนมัติ (ใช้ `xdg-open` ของ Linux)

กด `Ctrl+C` เพื่อหยุด server

## เช็คก่อนจะ commit/deploy

```bash
npm test          # รัน unit test ทั้งหมด
npm run build     # ลอง build จริงเหมือนตอน deploy
npx tsc --noEmit  # เช็ค TypeScript type error
```

## Git workflow

- `master` = branch ที่ทำงาน/พัฒนา (commit งานใหม่ที่นี่)
- `main` = branch สำหรับ release/deploy (Cloudflare deploy จาก branch นี้)

```bash
git checkout master        # สลับไป branch ทำงาน
git add <ไฟล์>
git commit -m "..."
git push origin master      # ขึ้น GitHub (ยังไม่ deploy)
```

พอพร้อม deploy จริง (merge master เข้า main):

```bash
git checkout main
git pull
git merge master --no-ff -m "Merge master: ..."
npm test && npm run build   # เช็คซ้ำก่อน push
git push origin main        # Cloudflare จะ deploy อัตโนมัติ
git checkout master         # กลับมาทำงานต่อที่ master
```

## เว็บที่ deploy อยู่

**https://kanji.breezbreez04.workers.dev**

## ทำไม deploy ต้องมี wrangler.jsonc

Cloudflare project นี้เป็นแบบ Workers (ไม่ใช่ Pages เดิม) ถ้าไม่มี `wrangler.jsonc`
มันจะพยายามแปลงแอปเป็น Next.js server (OpenNext) ซึ่งพังเพราะแอปเราเป็น static
export ล้วนๆ ไฟล์ `wrangler.jsonc` บอกให้ deploy แบบ static asset จาก `out/`
ตรงๆ แทน — **อย่าลบไฟล์นี้**

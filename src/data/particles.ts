import type { ParticleEntry } from '@/types/content';

export const particles: ParticleEntry[] = [
  {
    particle: 'は',
    usageTh: 'บอกหัวข้อของประโยค',
    usageEn: 'marks the topic of the sentence',
    example: { jp: 'わたしはがくせいです。', th: 'ฉันเป็นนักเรียน', en: 'As for me, I am a student.' },
  },
  {
    particle: 'が',
    usageTh: 'บอกประธานของประโยค เน้นสิ่งที่กล่าวถึง',
    usageEn: 'marks the grammatical subject, often with emphasis',
    example: { jp: 'これがほんです。', th: 'นี่คือหนังสือ (เล่มนี้)', en: 'This is the book.' },
  },
  {
    particle: 'を',
    usageTh: 'บอกกรรมตรงของกริยา',
    usageEn: 'marks the direct object of a verb',
    example: { jp: 'パンをたべます。', th: 'กินขนมปัง', en: 'I eat bread.' },
  },
  {
    particle: 'に',
    usageTh: 'บอกจุดหมาย เวลา หรือปลายทาง',
    usageEn: 'marks a destination, time, or target',
    example: { jp: 'がっこうにいきます。', th: 'ไปโรงเรียน', en: 'I go to school.' },
  },
  {
    particle: 'で',
    usageTh: 'บอกสถานที่ที่ทำกิจกรรม หรือวิธีการ',
    usageEn: 'marks the location of an action, or the means used',
    example: { jp: 'がっこうでべんきょうします。', th: 'เรียนที่โรงเรียน', en: 'I study at school.' },
  },
  {
    particle: 'と',
    usageTh: 'แปลว่า "กับ" หรือ "และ"',
    usageEn: 'means "and" or "with"',
    example: { jp: 'わたしとあなた。', th: 'ฉันกับคุณ', en: 'Me and you.' },
  },
  {
    particle: 'も',
    usageTh: 'แปลว่า "ก็...ด้วย"',
    usageEn: 'means "also" or "too"',
    example: { jp: 'わたしもがくせいです。', th: 'ฉันก็เป็นนักเรียนด้วย', en: 'I am also a student.' },
  },
  {
    particle: 'の',
    usageTh: 'บอกความเป็นเจ้าของ',
    usageEn: 'marks possession',
    example: { jp: 'わたしのほんです。', th: 'เป็นหนังสือของฉัน', en: "It's my book." },
  },
];

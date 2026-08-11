import type { GrammarEntry } from '@/types/content';

export const grammarPatterns: GrammarEntry[] = [
  {
    pattern: '〜です',
    answerText: 'です',
    meaningTh: 'ใช้ลงท้ายประโยคแบบสุภาพ แปลว่า "เป็น/คือ"',
    meaningEn: 'polite copula, "is / am / are"',
    example: { jp: 'これはほんです。', th: 'นี่คือหนังสือ', en: 'This is a book.' },
  },
  {
    pattern: '〜ます',
    answerText: 'ます',
    meaningTh: 'รูปสุภาพของกริยา ปัจจุบัน/อนาคต',
    meaningEn: 'polite verb ending, present / future',
    example: { jp: 'まいにちべんきょうします。', th: 'เรียนทุกวัน', en: 'I study every day.' },
  },
  {
    pattern: '〜ません',
    answerText: 'ません',
    meaningTh: 'รูปปฏิเสธสุภาพของกริยา',
    meaningEn: 'polite negative verb ending',
    example: { jp: 'パンをたべません。', th: 'ไม่กินขนมปัง', en: 'I do not eat bread.' },
  },
  {
    pattern: '〜たいです',
    answerText: 'たいです',
    meaningTh: 'แปลว่า "อยากจะ..."',
    meaningEn: 'means "want to do..."',
    example: { jp: 'にほんにいきたいです。', th: 'อยากไปญี่ปุ่น', en: 'I want to go to Japan.' },
  },
  {
    pattern: '〜てください',
    answerText: 'てください',
    meaningTh: 'แปลว่า "กรุณา..."',
    meaningEn: 'means "please do..."',
    example: { jp: 'まってください。', th: 'กรุณารอสักครู่', en: 'Please wait.' },
  },
  {
    pattern: '〜ないでください',
    answerText: 'ないでください',
    meaningTh: 'แปลว่า "กรุณาอย่า..."',
    meaningEn: 'means "please don\'t do..."',
    example: { jp: 'しんぱいしないでください。', th: 'กรุณาอย่าเป็นห่วง', en: "Please don't worry." },
  },
];

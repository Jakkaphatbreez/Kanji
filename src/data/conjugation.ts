import type { ConjugationGroup } from '@/types/content';

export const conjugationGroups: ConjugationGroup[] = [
  {
    groupId: 'group1',
    titleTh: 'กริยากลุ่ม 1 (u-verbs / godan)',
    titleEn: 'Group 1 Verbs (u-verbs / godan)',
    ruleTh:
      'รูปพจนานุกรมลงท้ายด้วยเสียง u (く/ぐ/す/つ/ぬ/ぶ/む/る/う) เปลี่ยนเสียงท้ายตามฟอร์มที่ต้องการผัน ระวัง かえる เป็นกลุ่ม 1 แม้จะลงท้าย える เหมือนกลุ่ม 2, และ いく มีข้อยกเว้นตอนผันเป็น て/た (いって/いった ไม่ใช่ いいて/いいた)',
    ruleEn:
      'Dictionary form ends in an u-sound (く/ぐ/す/つ/ぬ/ぶ/む/る/う); the ending changes depending on the form. Watch for かえる, which is Group 1 despite ending in える like Group 2, and いく, which irregularly becomes いって/いった (not いいて/いいた) in the te/ta forms.',
    formIds: ['dictionary', 'masu', 'nai', 'ta', 'te'],
    examples: [
      {
        word: 'かう',
        meaningTh: 'ซื้อ',
        meaningEn: 'to buy',
        forms: [
          { formId: 'dictionary', value: 'かう' },
          { formId: 'masu', value: 'かいます' },
          { formId: 'nai', value: 'かわない' },
          { formId: 'ta', value: 'かった' },
          { formId: 'te', value: 'かって' },
        ],
      },
      {
        word: 'いく',
        meaningTh: 'ไป',
        meaningEn: 'to go',
        forms: [
          { formId: 'dictionary', value: 'いく' },
          { formId: 'masu', value: 'いきます' },
          { formId: 'nai', value: 'いかない' },
          { formId: 'ta', value: 'いった' },
          { formId: 'te', value: 'いって' },
        ],
      },
      {
        word: 'のむ',
        meaningTh: 'ดื่ม',
        meaningEn: 'to drink',
        forms: [
          { formId: 'dictionary', value: 'のむ' },
          { formId: 'masu', value: 'のみます' },
          { formId: 'nai', value: 'のまない' },
          { formId: 'ta', value: 'のんだ' },
          { formId: 'te', value: 'のんで' },
        ],
      },
      {
        word: 'まつ',
        meaningTh: 'รอ',
        meaningEn: 'to wait',
        forms: [
          { formId: 'dictionary', value: 'まつ' },
          { formId: 'masu', value: 'まちます' },
          { formId: 'nai', value: 'またない' },
          { formId: 'ta', value: 'まった' },
          { formId: 'te', value: 'まって' },
        ],
      },
      {
        word: 'かえる',
        meaningTh: 'กลับ (บ้าน)',
        meaningEn: 'to return (home)',
        forms: [
          { formId: 'dictionary', value: 'かえる' },
          { formId: 'masu', value: 'かえります' },
          { formId: 'nai', value: 'かえらない' },
          { formId: 'ta', value: 'かえった' },
          { formId: 'te', value: 'かえって' },
        ],
      },
    ],
  },
  {
    groupId: 'group2',
    titleTh: 'กริยากลุ่ม 2 (ru-verbs / ichidan)',
    titleEn: 'Group 2 Verbs (ru-verbs / ichidan)',
    ruleTh: 'รูปพจนานุกรมลงท้ายด้วย いる/える เอา る ออกแล้วเติมส่วนขยายได้เลย ไม่มีการเปลี่ยนเสียงต้นคำ',
    ruleEn:
      'Dictionary form ends in いる/える. Simply drop る and attach the ending — the stem never changes sound.',
    formIds: ['dictionary', 'masu', 'nai', 'ta', 'te'],
    examples: [
      {
        word: 'たべる',
        meaningTh: 'กิน',
        meaningEn: 'to eat',
        forms: [
          { formId: 'dictionary', value: 'たべる' },
          { formId: 'masu', value: 'たべます' },
          { formId: 'nai', value: 'たべない' },
          { formId: 'ta', value: 'たべた' },
          { formId: 'te', value: 'たべて' },
        ],
      },
      {
        word: 'みる',
        meaningTh: 'ดู',
        meaningEn: 'to watch/see',
        forms: [
          { formId: 'dictionary', value: 'みる' },
          { formId: 'masu', value: 'みます' },
          { formId: 'nai', value: 'みない' },
          { formId: 'ta', value: 'みた' },
          { formId: 'te', value: 'みて' },
        ],
      },
      {
        word: 'おきる',
        meaningTh: 'ตื่นนอน',
        meaningEn: 'to wake up',
        forms: [
          { formId: 'dictionary', value: 'おきる' },
          { formId: 'masu', value: 'おきます' },
          { formId: 'nai', value: 'おきない' },
          { formId: 'ta', value: 'おきた' },
          { formId: 'te', value: 'おきて' },
        ],
      },
      {
        word: 'ねる',
        meaningTh: 'นอนหลับ',
        meaningEn: 'to sleep',
        forms: [
          { formId: 'dictionary', value: 'ねる' },
          { formId: 'masu', value: 'ねます' },
          { formId: 'nai', value: 'ねない' },
          { formId: 'ta', value: 'ねた' },
          { formId: 'te', value: 'ねて' },
        ],
      },
    ],
  },
  {
    groupId: 'group3',
    titleTh: 'กริยากลุ่ม 3 (กริยาอปกติ)',
    titleEn: 'Group 3 Verbs (irregular)',
    ruleTh: 'มีแค่สองคำคือ する (ทำ) และ くる (มา) ผันไม่ตามกฎ ต้องจำแยกไว้',
    ruleEn: 'Only two verbs, する (to do) and くる (to come) — irregular, must be memorized individually.',
    formIds: ['dictionary', 'masu', 'nai', 'ta', 'te'],
    examples: [
      {
        word: 'する',
        meaningTh: 'ทำ',
        meaningEn: 'to do',
        forms: [
          { formId: 'dictionary', value: 'する' },
          { formId: 'masu', value: 'します' },
          { formId: 'nai', value: 'しない' },
          { formId: 'ta', value: 'した' },
          { formId: 'te', value: 'して' },
        ],
      },
      {
        word: 'くる',
        meaningTh: 'มา',
        meaningEn: 'to come',
        forms: [
          { formId: 'dictionary', value: 'くる' },
          { formId: 'masu', value: 'きます' },
          { formId: 'nai', value: 'こない' },
          { formId: 'ta', value: 'きた' },
          { formId: 'te', value: 'きて' },
        ],
      },
    ],
  },
  {
    groupId: 'iAdjective',
    titleTh: 'คำคุณศัพท์ i (い-adjective)',
    titleEn: 'i-Adjectives',
    ruleTh:
      'ลงท้ายด้วย い เอา い ออกแล้วเติม かった (อดีต) / くない (ปฏิเสธ) / くなかった (ปฏิเสธอดีต) ข้อยกเว้นสำคัญ: いい (ดี) ผันจากรูป よい แทน',
    ruleEn:
      'Ends in い. Drop い and attach かった (past) / くない (negative) / くなかった (past negative). Key exception: いい (good) conjugates from the old form よい instead.',
    formIds: ['present', 'past', 'negative', 'pastNegative'],
    examples: [
      {
        word: 'たかい',
        meaningTh: 'แพง/สูง',
        meaningEn: 'expensive / tall',
        forms: [
          { formId: 'present', value: 'たかいです' },
          { formId: 'past', value: 'たかかったです' },
          { formId: 'negative', value: 'たかくないです' },
          { formId: 'pastNegative', value: 'たかくなかったです' },
        ],
      },
      {
        word: 'やすい',
        meaningTh: 'ถูก (ราคา)',
        meaningEn: 'cheap',
        forms: [
          { formId: 'present', value: 'やすいです' },
          { formId: 'past', value: 'やすかったです' },
          { formId: 'negative', value: 'やすくないです' },
          { formId: 'pastNegative', value: 'やすくなかったです' },
        ],
      },
      {
        word: 'いい',
        meaningTh: 'ดี',
        meaningEn: 'good',
        forms: [
          { formId: 'present', value: 'いいです' },
          { formId: 'past', value: 'よかったです' },
          { formId: 'negative', value: 'よくないです' },
          { formId: 'pastNegative', value: 'よくなかったです' },
        ],
      },
    ],
  },
  {
    groupId: 'naAdjective',
    titleTh: 'คำคุณศัพท์ na (な-adjective)',
    titleEn: 'na-Adjectives',
    ruleTh: 'ผันเหมือนคำนาม + です/だ ไม่ต้องตัดอะไรออกจากตัวคำคุณศัพท์เอง',
    ruleEn: 'Conjugates just like a noun + です/だ — nothing is trimmed from the adjective itself.',
    formIds: ['present', 'past', 'negative', 'pastNegative'],
    examples: [
      {
        word: 'きれい',
        meaningTh: 'สวย/สะอาด',
        meaningEn: 'pretty / clean',
        forms: [
          { formId: 'present', value: 'きれいです' },
          { formId: 'past', value: 'きれいでした' },
          { formId: 'negative', value: 'きれいじゃないです' },
          { formId: 'pastNegative', value: 'きれいじゃなかったです' },
        ],
      },
      {
        word: 'げんき',
        meaningTh: 'สบายดี/มีพลัง',
        meaningEn: 'healthy / energetic',
        forms: [
          { formId: 'present', value: 'げんきです' },
          { formId: 'past', value: 'げんきでした' },
          { formId: 'negative', value: 'げんきじゃないです' },
          { formId: 'pastNegative', value: 'げんきじゃなかったです' },
        ],
      },
      {
        word: 'しずか',
        meaningTh: 'เงียบ',
        meaningEn: 'quiet',
        forms: [
          { formId: 'present', value: 'しずかです' },
          { formId: 'past', value: 'しずかでした' },
          { formId: 'negative', value: 'しずかじゃないです' },
          { formId: 'pastNegative', value: 'しずかじゃなかったです' },
        ],
      },
    ],
  },
  {
    groupId: 'copula',
    titleTh: 'คำกริยาช่วย です/だ (คำนามภาคแสดง)',
    titleEn: 'Copula です/だ (noun predicates)',
    ruleTh: 'คำนามที่ทำหน้าที่ภาคแสดงของประโยคผันเหมือนคำคุณศัพท์ na ทุกประการ',
    ruleEn: 'A noun acting as the sentence predicate conjugates exactly like a na-adjective.',
    formIds: ['present', 'past', 'negative', 'pastNegative'],
    examples: [
      {
        word: 'がくせい',
        meaningTh: 'นักเรียน',
        meaningEn: 'student',
        forms: [
          { formId: 'present', value: 'がくせいです' },
          { formId: 'past', value: 'がくせいでした' },
          { formId: 'negative', value: 'がくせいじゃないです' },
          { formId: 'pastNegative', value: 'がくせいじゃなかったです' },
        ],
      },
      {
        word: 'せんせい',
        meaningTh: 'ครู',
        meaningEn: 'teacher',
        forms: [
          { formId: 'present', value: 'せんせいです' },
          { formId: 'past', value: 'せんせいでした' },
          { formId: 'negative', value: 'せんせいじゃないです' },
          { formId: 'pastNegative', value: 'せんせいじゃなかったです' },
        ],
      },
    ],
  },
];

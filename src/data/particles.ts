import type { ParticleEntry } from '@/types/content';

export const particles: ParticleEntry[] = [
  {
    particle: 'は',
    usageTh: 'คำชี้หัวข้อของประโยค (topic marker)',
    usageEn: 'marks the topic of the sentence',
    examples: [{ jp: 'わたしはがくせいです。', th: 'ฉันเป็นนักเรียน', en: 'I am a student.' }],
  },
  {
    particle: 'が',
    usageTh: 'คำชี้ประธาน / เน้นสิ่งที่พูดถึงใหม่ / เชื่อมประโยคขัดแย้ง (แต่)',
    usageEn: 'marks the subject / emphasizes new information / connects contrasting clauses (but)',
    examples: [{ jp: 'あめがふっています。', th: 'ฝนกำลังตก', en: 'It is raining.' }],
  },
  {
    particle: 'を',
    usageTh: 'คำชี้กรรมตรง (สิ่งที่ถูกกระทำ)',
    usageEn: 'marks the direct object (what is acted upon)',
    examples: [{ jp: 'ごはんをたべます。', th: 'กินข้าว', en: 'I eat a meal.' }],
  },
  {
    particle: 'に',
    usageTh: 'บอกเวลาที่แน่นอน / ตำแหน่งที่มีอยู่ / จุดหมายปลายทาง',
    usageEn: 'marks a specific time / an existing location / a destination',
    examples: [{ jp: '7じにおきます。', th: 'ตื่นตอน 7 โมง', en: 'I wake up at 7 o’clock.' }],
  },
  {
    particle: 'で',
    usageTh: 'บอกสถานที่ทำกิจกรรม / วิธีการ-เครื่องมือ',
    usageEn: 'marks the place an action happens / the means or tool used',
    examples: [{ jp: 'がっこうでべんきょうします。', th: 'เรียนที่โรงเรียน', en: 'I study at school.' }],
  },
  {
    particle: 'へ',
    usageTh: 'บอกทิศทาง/จุดหมาย (ไปทาง...)',
    usageEn: 'marks direction/destination (toward...)',
    examples: [{ jp: 'がっこうへいきます。', th: 'ไปทางโรงเรียน', en: 'I go toward school.' }],
  },
  {
    particle: 'から',
    usageTh: 'จาก... / เพราะว่า...',
    usageEn: 'from... / because...',
    examples: [
      {
        jp: '9じから5じまではたらきます。',
        th: 'ทำงานตั้งแต่ 9 โมงถึง 5 โมง',
        en: 'I work from 9 o’clock to 5 o’clock.',
      },
    ],
  },
  {
    particle: 'まで',
    usageTh: 'จนถึง...',
    usageEn: 'until...',
    examples: [{ jp: '5じまでまちます。', th: 'รอจนถึง 5 โมง', en: 'I wait until 5 o’clock.' }],
  },
  {
    particle: 'と',
    usageTh: 'กับ... / และ (แจงครบทุกอย่าง)',
    usageEn: 'with... / and (listing everything)',
    examples: [{ jp: 'かぞくとえいがをみます。', th: 'ดูหนังกับครอบครัว', en: 'I watch a movie with my family.' }],
  },
  {
    particle: 'も',
    usageTh: 'ก็...ด้วย (เหมือนกัน)',
    usageEn: 'also... (the same)',
    examples: [{ jp: 'わたしもがくせいです。', th: 'ฉันก็เป็นนักเรียนเหมือนกัน', en: 'I am also a student.' }],
  },
  {
    particle: 'の',
    usageTh: 'ของ... (แสดงความเป็นเจ้าของ/ขยายนาม)',
    usageEn: 'of... (shows possession / modifies a noun)',
    examples: [{ jp: 'これはわたしのほんです。', th: 'นี่คือหนังสือของฉัน', en: 'This is my book.' }],
  },
  {
    particle: 'や',
    usageTh: 'และ... (ยกตัวอย่างบางส่วน ไม่ครบทั้งหมด)',
    usageEn: 'and... (lists some examples, not everything)',
    examples: [
      { jp: 'つくえにペンやノートがあります。', th: 'บนโต๊ะมีปากกา สมุด ฯลฯ', en: 'There’s a pen, a notebook, etc. on the desk.' },
    ],
  },
  {
    particle: 'より',
    usageTh: 'มากกว่า... (ใช้เปรียบเทียบ)',
    usageEn: 'than... (used for comparison)',
    examples: [{ jp: 'きょうはきのうよりさむいです。', th: 'วันนี้หนาวกว่าเมื่อวาน', en: 'Today is colder than yesterday.' }],
  },
  {
    particle: 'か',
    usageTh: 'คำลงท้ายทำให้เป็นประโยคคำถาม / หรือ',
    usageEn: 'sentence-ending particle that makes it a question / or',
    examples: [{ jp: 'これはほんですか。', th: 'นี่คือหนังสือใช่ไหม', en: 'Is this a book?' }],
  },
  {
    particle: 'ね',
    usageTh: 'คำลงท้ายขอความเห็นด้วย (เนอะ/ใช่ไหม)',
    usageEn: 'sentence-ending particle asking for agreement (right?/isn’t it?)',
    examples: [{ jp: 'いいてんきですね。', th: 'อากาศดีเนอะ', en: 'Nice weather, isn’t it?' }],
  },
  {
    particle: 'よ',
    usageTh: 'คำลงท้ายเน้นย้ำ/บอกข้อมูลใหม่ (นะ)',
    usageEn: 'sentence-ending particle for emphasis/new information (you know)',
    examples: [{ jp: 'あぶないですよ。', th: 'อันตรายนะ', en: 'It’s dangerous, you know.' }],
  },
  {
    particle: 'だけ',
    usageTh: 'แค่.../เท่านั้น',
    usageEn: 'just.../only',
    examples: [{ jp: 'ひとつだけください。', th: 'ขอแค่อันเดียว', en: 'Please give me just one.' }],
  },
  {
    particle: 'しか',
    usageTh: 'แค่...เท่านั้น (ใช้คู่กับคำปฏิเสธ)',
    usageEn: 'only... (used together with a negative verb)',
    examples: [{ jp: 'にひゃくえんしかありません。', th: 'มีแค่ 200 เยนเท่านั้น', en: 'I only have 200 yen.' }],
  },
];

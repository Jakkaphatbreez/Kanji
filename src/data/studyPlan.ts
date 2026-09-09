import type { QuizCategory, QuizMode } from '@/lib/quiz/types';

export interface StudyPlanTask {
  labelTh: string;
  labelEn: string;
  href?: string;
}

export interface StudyPlanExercise {
  category: QuizCategory;
  mode: QuizMode;
}

export interface StudyPlanWeek {
  weekLabelTh: string;
  weekLabelEn: string;
  goalTh: string;
  goalEn: string;
  tasks: StudyPlanTask[];
  exercise?: StudyPlanExercise;
}

export interface StudyPlanMonth {
  month: number;
  titleTh: string;
  titleEn: string;
  summaryTh: string;
  summaryEn: string;
  weeks: StudyPlanWeek[];
}

export const studyPlan: StudyPlanMonth[] = [
  {
    month: 1,
    titleTh: 'พื้นฐาน: ตัวอักษรและคำศัพท์เริ่มต้น',
    titleEn: 'Foundations: Scripts & Starter Vocabulary',
    summaryTh: 'เรียนฮิรางานะและคาตากานะให้คล่อง เริ่มคำศัพท์หลักและคำช่วยพื้นฐาน',
    summaryEn: 'Master hiragana and katakana, start core vocabulary and basic particles.',
    weeks: [
      {
        weekLabelTh: 'สัปดาห์ 1',
        weekLabelEn: 'Week 1',
        goalTh: 'อ่านและเขียนฮิรางานะได้ครบทุกตัว',
        goalEn: 'Be able to read and write every hiragana character.',
        tasks: [
          { labelTh: 'เปิดตารางฮิรางานะและท่องให้คล่อง', labelEn: 'Study the hiragana chart until fluent', href: '/kana' },
          {
            labelTh: 'ฝึกเขียนฮิรางานะทีละตัวด้วยอนิเมชันลำดับขีด',
            labelEn: 'Practice writing hiragana one at a time with the stroke-order animation',
            href: '/write',
          },
        ],
        exercise: { category: 'hiragana', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 2',
        weekLabelEn: 'Week 2',
        goalTh: 'อ่านและเขียนคาตากานะได้ครบทุกตัว',
        goalEn: 'Be able to read and write every katakana character.',
        tasks: [
          { labelTh: 'เปิดตารางคาตากานะและท่องให้คล่อง', labelEn: 'Study the katakana chart until fluent', href: '/kana' },
          {
            labelTh: 'ฝึกเขียนคาตากานะด้วยอนิเมชันลำดับขีด',
            labelEn: 'Practice writing katakana with the stroke-order animation',
            href: '/write',
          },
        ],
        exercise: { category: 'katakana', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 3',
        weekLabelEn: 'Week 3',
        goalTh: 'จำคำศัพท์หลัก N5 ได้อย่างน้อย 100 คำ',
        goalEn: 'Memorize at least 100 core N5 words.',
        tasks: [
          {
            labelTh: 'เปิดหน้าคำศัพท์แท็บ "N5 หลัก" วันละ 10-15 คำ',
            labelEn: 'Study the "Core N5" vocabulary tab, 10-15 words a day',
            href: '/vocab',
          },
        ],
        exercise: { category: 'vocab', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 4',
        weekLabelEn: 'Week 4',
        goalTh: 'เข้าใจการใช้คำช่วยพื้นฐาน は/が/を/に/で',
        goalEn: 'Understand how to use the basic particles は/が/を/に/で.',
        tasks: [
          {
            labelTh: 'เปิดหน้าไวยากรณ์แท็บ "คำช่วย" อ่านตัวอย่างประโยค',
            labelEn: 'Study the "Particles" tab and read the example sentences',
            href: '/grammar',
          },
        ],
        exercise: { category: 'particle', mode: 'multiple-choice' },
      },
    ],
  },
  {
    month: 2,
    titleTh: 'คำศัพท์ครบ + คันจิและไวยากรณ์เริ่มต้น',
    titleEn: 'Complete Vocabulary + Starter Kanji & Grammar',
    summaryTh: 'จบคำศัพท์หลัก เริ่มเรียนคันจิและแพทเทิร์นไวยากรณ์พื้นฐาน',
    summaryEn: 'Finish core vocabulary, and begin kanji and basic grammar patterns.',
    weeks: [
      {
        weekLabelTh: 'สัปดาห์ 5',
        weekLabelEn: 'Week 5',
        goalTh: 'ทวนคำศัพท์หลัก N5 ที่เหลือให้จบครบทุกคำ',
        goalEn: 'Review the remaining core N5 vocabulary to completion.',
        tasks: [{ labelTh: 'เปิดหน้าคำศัพท์ทวนคำที่เหลือ', labelEn: 'Review the remaining words on the vocabulary page', href: '/vocab' }],
        exercise: { category: 'vocab', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 6',
        weekLabelEn: 'Week 6',
        goalTh: 'จำคันจิหมวดตัวเลขและเวลาได้',
        goalEn: 'Memorize the numbers and time kanji categories.',
        tasks: [
          { labelTh: 'เปิดหน้าคันจิ เลือกหมวด "ตัวเลข" และ "เวลา"', labelEn: 'Study the "numbers" and "time" kanji categories', href: '/kanji' },
          { labelTh: 'ฝึกเขียนคันจิที่เรียนด้วยอนิเมชันลำดับขีด', labelEn: 'Practice writing the kanji you learned with the stroke animation', href: '/write' },
        ],
        exercise: { category: 'kanji', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 7',
        weekLabelEn: 'Week 7',
        goalTh: 'ใช้แพทเทิร์น です/ます/ません/たいです ในประโยคง่ายๆได้',
        goalEn: 'Use the です/ます/ません/たいです patterns in simple sentences.',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "ไวยากรณ์"', labelEn: 'Study the "Grammar" tab', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 8',
        weekLabelEn: 'Week 8',
        goalTh: 'แยกกริยากลุ่ม 1/2/3 ออกและผันเป็นรูป ます/ない/た/て ได้',
        goalEn: 'Classify verbs into Groups 1/2/3 and conjugate them into ます/ない/た/て forms.',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "การผันคำ"', labelEn: 'Study the "Conjugation" tab', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
    ],
  },
  {
    month: 3,
    titleTh: 'คันจิเพิ่มเติม + ไวยากรณ์ระดับกลาง',
    titleEn: 'More Kanji + Intermediate Grammar',
    summaryTh: 'เรียนคันจิหมวดคน/สถานที่ คำช่วยที่เหลือทั้งหมด และแพทเทิร์น て-form',
    summaryEn: 'Learn people/places kanji, the remaining particles, and te-form patterns.',
    weeks: [
      {
        weekLabelTh: 'สัปดาห์ 9',
        weekLabelEn: 'Week 9',
        goalTh: 'จำคันจิหมวดคน/สถานที่/สิ่งของได้',
        goalEn: 'Memorize the people/places/things kanji category.',
        tasks: [
          { labelTh: 'เปิดหน้าคันจิ เลือกหมวด "คน/สถานที่/สิ่งของ"', labelEn: 'Study the "people/places/things" kanji category', href: '/kanji' },
          { labelTh: 'ฝึกเขียนคันจิที่เรียนด้วยอนิเมชันลำดับขีด', labelEn: 'Practice writing the kanji you learned', href: '/write' },
        ],
        exercise: { category: 'kanji', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 10',
        weekLabelEn: 'Week 10',
        goalTh: 'ใช้คำช่วยที่เหลือทั้งหมด (で/へ/から/まで/と/も/の/や/より/か/ね/よ/だけ/しか) ได้ถูกต้อง',
        goalEn: 'Correctly use the remaining particles (で/へ/から/まで/と/も/の/や/より/か/ね/よ/だけ/しか).',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "คำช่วย" ทวนให้ครบ', labelEn: 'Review the "Particles" tab in full', href: '/grammar' }],
        exercise: { category: 'particle', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 11',
        weekLabelEn: 'Week 11',
        goalTh: 'ใช้ て-form ขอร้อง/ห้าม/บอกสภาพต่อเนื่องได้ (てください/ないでください/ています/てもいいです/てはいけません)',
        goalEn: 'Use te-form for requests, prohibition, and ongoing state (てください/ないでください/ています/てもいいです/てはいけません).',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "ไวยากรณ์"', labelEn: 'Study the "Grammar" tab', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 12',
        weekLabelEn: 'Week 12',
        goalTh: 'ผันคำคุณศัพท์ i/na เป็นรูปอดีต/ปฏิเสธได้',
        goalEn: 'Conjugate i-adjectives and na-adjectives into past/negative forms.',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "การผันคำ"', labelEn: 'Study the "Conjugation" tab', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
    ],
  },
  {
    month: 4,
    titleTh: 'คันจิครบ 112 ตัว + ไวยากรณ์ขั้นสูงของ N5',
    titleEn: 'Complete All 112 Kanji + Advanced N5 Grammar',
    summaryTh: 'เรียนคันจิที่เหลือให้ครบ และแพทเทิร์นไวยากรณ์ขั้นสูงของ N5',
    summaryEn: 'Finish the remaining kanji and cover advanced N5 grammar patterns.',
    weeks: [
      {
        weekLabelTh: 'สัปดาห์ 13',
        weekLabelEn: 'Week 13',
        goalTh: 'จำคันจิหมวดธรรมชาติ/ทิศทางได้',
        goalEn: 'Memorize the nature/direction kanji category.',
        tasks: [{ labelTh: 'เปิดหน้าคันจิ เลือกหมวด "ธรรมชาติ/ทิศทาง"', labelEn: 'Study the "nature/direction" kanji category', href: '/kanji' }],
        exercise: { category: 'kanji', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 14',
        weekLabelEn: 'Week 14',
        goalTh: 'เรียนคันจิหมวดกริยา/คุณศัพท์ที่เหลือจนครบทั้ง 112 ตัว',
        goalEn: 'Learn the remaining verb/adjective kanji categories to complete all 112 kanji.',
        tasks: [{ labelTh: 'เปิดหน้าคันจิ เลือกหมวดที่เหลือทั้งหมด', labelEn: 'Study all remaining kanji categories', href: '/kanji' }],
        exercise: { category: 'kanji', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 15',
        weekLabelEn: 'Week 15',
        goalTh: 'ใช้แพทเทิร์น たことがあります/なければなりません/なくてもいいです/つもりです/ことができます ได้',
        goalEn: 'Use たことがあります/なければなりません/なくてもいいです/つもりです/ことができます correctly.',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์แท็บ "ไวยากรณ์"', labelEn: 'Study the "Grammar" tab', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
      {
        weekLabelTh: 'สัปดาห์ 16',
        weekLabelEn: 'Week 16',
        goalTh: 'ใช้แพทเทิร์นเปรียบเทียบ より/ほうがいいです/どちらが/いちばん ได้ และฝึกความไวในการอ่านคันจิ',
        goalEn: 'Use comparison patterns より/ほうがいいです/どちらが/いちばん, and practice reading kanji quickly.',
        tasks: [
          { labelTh: 'เปิดหน้าไวยากรณ์แท็บ "ไวยากรณ์"', labelEn: 'Study the "Grammar" tab', href: '/grammar' },
          { labelTh: 'เล่นเกมทิ้งระเบิดเพื่อฝึกความไวในการอ่านคันจิ', labelEn: 'Play the bomb game to practice reading kanji quickly', href: '/game' },
        ],
        exercise: { category: 'grammar', mode: 'multiple-choice' },
      },
    ],
  },
  {
    month: 5,
    titleTh: 'ทบทวนเข้มข้นและซ้อมข้อสอบ',
    titleEn: 'Intensive Review & Mock Practice',
    summaryTh: 'ทวนทุกหมวดแบบเข้มข้น ฝึกพิมพ์คำตอบ และซ้อมข้อสอบก่อนสอบจริง',
    summaryEn: 'Intensively review every category, practice typing answers, and run mock exams before the real test.',
    weeks: [
      {
        weekLabelTh: 'สัปดาห์ 17',
        weekLabelEn: 'Week 17',
        goalTh: 'ทวนคันจิทั้งหมดแบบพิมพ์คำตอบเอง ไม่ใช่แค่เลือกตอบ',
        goalEn: 'Review all kanji by typing the answer yourself, not just picking a choice.',
        tasks: [
          { labelTh: 'ฝึกเขียนตัวที่ยังไม่มั่นใจซ้ำด้วยอนิเมชันลำดับขีด', labelEn: 'Re-practice writing any kanji you are still unsure of', href: '/write' },
        ],
        exercise: { category: 'kanji', mode: 'typing' },
      },
      {
        weekLabelTh: 'สัปดาห์ 18',
        weekLabelEn: 'Week 18',
        goalTh: 'ทวนคำศัพท์ทั้งหมดแบบพิมพ์คำตอบเอง',
        goalEn: 'Review all vocabulary by typing the answer yourself.',
        tasks: [{ labelTh: 'เปิดหน้าคำศัพท์ทวนทุกคำอีกครั้ง', labelEn: 'Review every word on the vocabulary page once more', href: '/vocab' }],
        exercise: { category: 'vocab', mode: 'typing' },
      },
      {
        weekLabelTh: 'สัปดาห์ 19',
        weekLabelEn: 'Week 19',
        goalTh: 'ทวนไวยากรณ์ คำช่วย และการผันคำทั้งหมดให้คล่อง',
        goalEn: 'Review all grammar, particles, and conjugation until fluent.',
        tasks: [{ labelTh: 'เปิดหน้าไวยากรณ์ทวนทั้ง 3 แท็บให้คล่อง', labelEn: 'Review all 3 tabs on the grammar page until fluent', href: '/grammar' }],
        exercise: { category: 'grammar', mode: 'typing' },
      },
      {
        weekLabelTh: 'สัปดาห์ 20',
        weekLabelEn: 'Week 20',
        goalTh: 'ทำข้อสอบจำลองรวมทุกหมวดสลับกันทุกวัน และพักผ่อนให้พร้อมก่อนสอบ',
        goalEn: 'Take mixed mock exams across every category daily, and rest well before the real exam.',
        tasks: [
          { labelTh: 'ไปหน้าแบบทดสอบ เลือกทำหลายหมวดสลับกันทุกวัน', labelEn: 'Go to the quiz page and rotate through several categories each day', href: '/quiz' },
          { labelTh: 'เล่นเกมทิ้งระเบิดผ่อนคลายพร้อมทวนคันจิไปด้วย', labelEn: 'Play the bomb game to relax while reviewing kanji', href: '/game' },
        ],
      },
    ],
  },
];

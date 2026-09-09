export interface KanaEntry {
  char: string;
  romaji: string;
  group: string;
}

export type VocabCategory = 'noun' | 'verb' | 'adjective' | 'adverb' | 'greeting';

export interface VocabEntry {
  jp: string;
  kana: string;
  romaji: string;
  meaningTh: string;
  meaningEn: string;
  category: VocabCategory;
}

export interface ExampleSentence {
  jp: string;
  th: string;
  en: string;
}

export interface ParticleEntry {
  particle: string;
  usageTh: string;
  usageEn: string;
  examples: ExampleSentence[];
}

export interface GrammarEntry {
  pattern: string;
  answerText: string;
  meaningTh: string;
  meaningEn: string;
  examples: ExampleSentence[];
  /** Set when a pattern is commonly classified as N4 rather than N5 (kept as bonus content). */
  bonusLevel?: 'N4';
}

export type KanjiCategory = 'numbers' | 'time' | 'peoplePlacesThings' | 'natureDirection' | 'verbs' | 'adjectives';

export interface KanjiEntry {
  kanji: string;
  on: string;
  kun: string;
  meaningTh: string;
  meaningEn: string;
  category: KanjiCategory;
}

export type ConjugationGroupId = 'group1' | 'group2' | 'group3' | 'iAdjective' | 'naAdjective' | 'copula';

export type ConjugationFormId = 'dictionary' | 'masu' | 'nai' | 'ta' | 'te' | 'present' | 'past' | 'negative' | 'pastNegative';

export interface ConjugationForm {
  formId: ConjugationFormId;
  value: string;
}

export interface ConjugationExample {
  word: string;
  meaningTh: string;
  meaningEn: string;
  forms: ConjugationForm[];
}

export interface ConjugationGroup {
  groupId: ConjugationGroupId;
  titleTh: string;
  titleEn: string;
  ruleTh: string;
  ruleEn: string;
  formIds: ConjugationFormId[];
  examples: ConjugationExample[];
}

export type StoryCategory = 'tale' | 'daily';

export interface StorySentence {
  jp: string;
  th: string;
  en: string;
}

export interface StoryQuestion {
  questionJp: string;
  choicesJp: string[];
  correctIndex: number;
}

export interface Story {
  id: string;
  title: string;
  category: StoryCategory;
  sentences: StorySentence[];
  questions: StoryQuestion[];
}

export interface SentenceOrderingItem {
  id: string;
  /** Word/phrase chunks in their correct sentence order. */
  segments: string[];
  translationTh: string;
  translationEn: string;
}

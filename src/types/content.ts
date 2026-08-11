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
}

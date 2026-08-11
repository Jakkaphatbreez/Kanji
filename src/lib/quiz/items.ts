import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';
import { vocabN5 } from '@/data/vocab-n5';
import { particles } from '@/data/particles';
import { grammarPatterns } from '@/data/grammar';
import type { Language, QuizCategory, QuizItem } from './types';

function blankOut(sentence: string, target: string): string {
  return sentence.replace(target, '___');
}

export function getQuizItems(category: QuizCategory, language: Language): QuizItem[] {
  switch (category) {
    case 'hiragana':
      return hiragana.map(e => ({ id: `hiragana-${e.char}`, prompt: e.char, answer: e.romaji, group: e.group }));
    case 'katakana':
      return katakana.map(e => ({ id: `katakana-${e.char}`, prompt: e.char, answer: e.romaji, group: e.group }));
    case 'vocab':
      return vocabN5.map(e => ({
        id: `vocab-${e.jp}`,
        prompt: e.jp,
        answer: language === 'th' ? e.meaningTh : e.meaningEn,
        group: e.category,
      }));
    case 'particle':
      return particles.map(e => ({
        id: `particle-${e.particle}`,
        prompt: blankOut(e.example.jp, e.particle),
        answer: e.particle,
        group: 'particle',
      }));
    case 'grammar':
      return grammarPatterns.map(e => ({
        id: `grammar-${e.pattern}`,
        prompt: blankOut(e.example.jp, e.answerText),
        answer: e.answerText,
        group: 'grammar',
      }));
  }
}

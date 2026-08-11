import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';
import { vocabN5 } from '@/data/vocab-n5';
import { vocabN5ExtraBatches } from '@/data/vocab-n5-extra';
import { kanji } from '@/data/kanji';
import { particles } from '@/data/particles';
import { grammarPatterns } from '@/data/grammar';
import type { Language, QuizCategory, QuizItem } from './types';

function blankOut(sentence: string, target: string): string {
  return sentence.replace(target, '___');
}

export function getQuizItems(category: QuizCategory, language: Language): QuizItem[] {
  if (category.startsWith('vocabExtra')) {
    const index = Number(category.slice('vocabExtra'.length));
    const batch = vocabN5ExtraBatches[index] ?? [];
    return batch.map(e => ({
      id: `vocab-extra-${index}-${e.jp}`,
      prompt: e.jp,
      answer: language === 'th' ? e.meaningTh : e.meaningEn,
      group: e.category,
    }));
  }

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
    case 'kanji':
      return kanji.map(e => ({
        id: `kanji-${e.kanji}`,
        prompt: e.kanji,
        answer: language === 'th' ? e.meaningTh : e.meaningEn,
        group: e.category,
      }));
    case 'particle':
      return particles.flatMap(e =>
        e.examples.map((example, i) => ({
          id: `particle-${e.particle}-${i}`,
          prompt: blankOut(example.jp, e.particle),
          answer: e.particle,
          group: 'particle',
        }))
      );
    case 'grammar':
      return grammarPatterns.flatMap(e =>
        e.examples.map((example, i) => ({
          id: `grammar-${e.pattern}-${i}`,
          prompt: blankOut(example.jp, e.answerText),
          answer: e.answerText,
          group: 'grammar',
        }))
      );
    default:
      return [];
  }
}

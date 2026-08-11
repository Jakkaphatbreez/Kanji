import { describe, it, expect } from 'vitest';
import { vocabN5Extra } from './vocab-n5-extra';
import { vocabN5 } from './vocab-n5';

const VALID_CATEGORIES = ['noun', 'verb', 'adjective', 'adverb', 'greeting'];

describe('vocab-n5-extra data', () => {
  it('has 708 entries', () => {
    expect(vocabN5Extra).toHaveLength(708);
  });

  it('every entry has non-empty jp, kana, romaji, meaningTh, meaningEn, and a valid category', () => {
    for (const entry of vocabN5Extra) {
      expect(entry.jp.length).toBeGreaterThan(0);
      expect(entry.kana.length).toBeGreaterThan(0);
      expect(entry.romaji.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(VALID_CATEGORIES).toContain(entry.category);
    }
  });

  it('has no duplicate jp entries', () => {
    const words = vocabN5Extra.map(e => e.jp);
    expect(new Set(words).size).toBe(words.length);
  });

  it('covers more than one category', () => {
    const categories = new Set(vocabN5Extra.map(e => e.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('has no overlap with the core vocab-n5 list', () => {
    const coreWords = new Set(vocabN5.map(e => e.jp));
    const overlap = vocabN5Extra.filter(e => coreWords.has(e.jp));
    expect(overlap).toEqual([]);
  });
});

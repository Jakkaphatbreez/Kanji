import { describe, it, expect } from 'vitest';
import { vocabN5 } from './vocab-n5';

const VALID_CATEGORIES = ['noun', 'verb', 'adjective', 'adverb', 'greeting'];

describe('vocab-n5 data', () => {
  it('has 24 entries', () => {
    expect(vocabN5).toHaveLength(24);
  });

  it('every entry has non-empty jp, kana, romaji, meaningTh, meaningEn, and a valid category', () => {
    for (const entry of vocabN5) {
      expect(entry.jp.length).toBeGreaterThan(0);
      expect(entry.kana.length).toBeGreaterThan(0);
      expect(entry.romaji.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(VALID_CATEGORIES).toContain(entry.category);
    }
  });

  it('has no duplicate jp entries', () => {
    const words = vocabN5.map(e => e.jp);
    expect(new Set(words).size).toBe(words.length);
  });

  it('covers more than one category', () => {
    const categories = new Set(vocabN5.map(e => e.category));
    expect(categories.size).toBeGreaterThan(1);
  });
});

import { describe, it, expect } from 'vitest';
import { kanji } from './kanji';

const VALID_CATEGORIES = ['numbers', 'time', 'peoplePlacesThings', 'natureDirection', 'verbs', 'adjectives'];

describe('kanji data', () => {
  it('has 112 entries', () => {
    expect(kanji).toHaveLength(112);
  });

  it('every entry has a non-empty kanji/meaningTh/meaningEn, at least one reading, and a valid category', () => {
    for (const entry of kanji) {
      expect(entry.kanji.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(entry.on.length > 0 || entry.kun.length > 0).toBe(true);
      expect(VALID_CATEGORIES).toContain(entry.category);
    }
  });

  it('has no duplicate kanji characters', () => {
    const chars = kanji.map(e => e.kanji);
    expect(new Set(chars).size).toBe(chars.length);
  });

  it('covers more than one category', () => {
    const categories = new Set(kanji.map(e => e.category));
    expect(categories.size).toBeGreaterThan(1);
  });
});

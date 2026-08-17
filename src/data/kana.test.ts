import { describe, it, expect } from 'vitest';
import { hiragana } from './hiragana';
import { katakana } from './katakana';

const KANA_GROUPS = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n', 'ga', 'za', 'da', 'ba', 'pa'];

describe('hiragana data', () => {
  it('has 69 entries', () => {
    expect(hiragana).toHaveLength(69);
  });

  it('every entry has a non-empty char, romaji, and known group', () => {
    for (const entry of hiragana) {
      expect(entry.char.length).toBeGreaterThan(0);
      expect(entry.romaji.length).toBeGreaterThan(0);
      expect(KANA_GROUPS).toContain(entry.group);
    }
  });

  it('has no duplicate characters', () => {
    const chars = hiragana.map(e => e.char);
    expect(new Set(chars).size).toBe(chars.length);
  });
});

describe('katakana data', () => {
  it('has 69 entries', () => {
    expect(katakana).toHaveLength(69);
  });

  it('every entry has a non-empty char, romaji, and known group', () => {
    for (const entry of katakana) {
      expect(entry.char.length).toBeGreaterThan(0);
      expect(entry.romaji.length).toBeGreaterThan(0);
      expect(KANA_GROUPS).toContain(entry.group);
    }
  });

  it('has no duplicate characters', () => {
    const chars = katakana.map(e => e.char);
    expect(new Set(chars).size).toBe(chars.length);
  });
});

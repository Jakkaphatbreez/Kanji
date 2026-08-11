import { describe, it, expect } from 'vitest';
import { grammarPatterns } from './grammar';

describe('grammar data', () => {
  it('has 6 entries', () => {
    expect(grammarPatterns).toHaveLength(6);
  });

  it('every entry has non-empty fields and 10 examples each containing the answerText', () => {
    for (const entry of grammarPatterns) {
      expect(entry.pattern.length).toBeGreaterThan(0);
      expect(entry.answerText.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(entry.examples).toHaveLength(10);
      for (const example of entry.examples) {
        expect(example.jp).toContain(entry.answerText);
        expect(example.th.length).toBeGreaterThan(0);
        expect(example.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate example sentences within a pattern', () => {
    for (const entry of grammarPatterns) {
      const sentences = entry.examples.map(e => e.jp);
      expect(new Set(sentences).size).toBe(sentences.length);
    }
  });

  it('has no duplicate patterns', () => {
    const values = grammarPatterns.map(e => e.pattern);
    expect(new Set(values).size).toBe(values.length);
  });
});

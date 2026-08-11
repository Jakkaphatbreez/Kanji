import { describe, it, expect } from 'vitest';
import { grammarPatterns } from './grammar';

describe('grammar data', () => {
  it('has 6 entries', () => {
    expect(grammarPatterns).toHaveLength(6);
  });

  it('every entry has non-empty fields and an example containing the answerText', () => {
    for (const entry of grammarPatterns) {
      expect(entry.pattern.length).toBeGreaterThan(0);
      expect(entry.answerText.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(entry.example.jp).toContain(entry.answerText);
    }
  });

  it('has no duplicate patterns', () => {
    const values = grammarPatterns.map(e => e.pattern);
    expect(new Set(values).size).toBe(values.length);
  });
});

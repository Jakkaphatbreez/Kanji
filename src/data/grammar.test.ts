import { describe, it, expect } from 'vitest';
import { grammarPatterns } from './grammar';

describe('grammar data', () => {
  it('has 40 entries', () => {
    expect(grammarPatterns).toHaveLength(40);
  });

  it('every entry has non-empty fields and at least 4 examples each containing the answerText', () => {
    for (const entry of grammarPatterns) {
      expect(entry.pattern.length).toBeGreaterThan(0);
      expect(entry.answerText.length).toBeGreaterThan(0);
      expect(entry.meaningTh.length).toBeGreaterThan(0);
      expect(entry.meaningEn.length).toBeGreaterThan(0);
      expect(entry.examples.length).toBeGreaterThanOrEqual(4);
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

  it('flags exactly the 3 N4-level bonus patterns (すぎます/やすい/にくい), everything else is N5', () => {
    const bonusPatterns = grammarPatterns.filter(e => e.bonusLevel === 'N4').map(e => e.pattern);
    expect(bonusPatterns.sort()).toEqual(['〜すぎます', '〜にくい', '〜やすい'].sort());
    for (const entry of grammarPatterns) {
      if (!bonusPatterns.includes(entry.pattern)) {
        expect(entry.bonusLevel).toBeUndefined();
      }
    }
  });
});

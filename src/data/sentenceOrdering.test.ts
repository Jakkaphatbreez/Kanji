import { describe, it, expect } from 'vitest';
import { sentenceOrderingItems } from './sentenceOrdering';

describe('sentence ordering data', () => {
  it('has at least 15 entries', () => {
    expect(sentenceOrderingItems.length).toBeGreaterThanOrEqual(15);
  });

  it('every entry has 3-6 non-empty segments and non-empty bilingual translations', () => {
    for (const item of sentenceOrderingItems) {
      expect(item.segments.length).toBeGreaterThanOrEqual(3);
      expect(item.segments.length).toBeLessThanOrEqual(6);
      for (const segment of item.segments) {
        expect(segment.length).toBeGreaterThan(0);
      }
      expect(item.translationTh.length).toBeGreaterThan(0);
      expect(item.translationEn.length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate ids', () => {
    const ids = sentenceOrderingItems.map(i => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no duplicate sentences (segments joined)', () => {
    const joined = sentenceOrderingItems.map(i => i.segments.join(''));
    expect(new Set(joined).size).toBe(joined.length);
  });
});

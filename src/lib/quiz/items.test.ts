import { describe, it, expect } from 'vitest';
import { getQuizItems } from './items';

describe('getQuizItems', () => {
  it('returns one item per hiragana entry with a non-empty prompt and answer', () => {
    const items = getQuizItems('hiragana', 'en');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every(i => i.prompt.length > 0 && i.answer.length > 0)).toBe(true);
  });

  it('uses the active language for vocab meanings', () => {
    const itemsTh = getQuizItems('vocab', 'th');
    const itemsEn = getQuizItems('vocab', 'en');
    expect(itemsTh.map(i => i.answer)).not.toEqual(itemsEn.map(i => i.answer));
  });

  it('blanks out the particle in the example sentence', () => {
    const items = getQuizItems('particle', 'en');
    for (const item of items) {
      expect(item.prompt).toContain('___');
      expect(item.prompt).not.toContain(item.answer);
    }
  });

  it('blanks out the grammar answer text in the example sentence', () => {
    const items = getQuizItems('grammar', 'en');
    for (const item of items) {
      expect(item.prompt).toContain('___');
      expect(item.prompt).not.toContain(item.answer);
    }
  });
});

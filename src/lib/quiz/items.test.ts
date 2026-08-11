import { describe, it, expect } from 'vitest';
import { getQuizItems } from './items';
import { vocabN5ExtraBatches } from '@/data/vocab-n5-extra';

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

  it('blanks out the particle in every example sentence', () => {
    const items = getQuizItems('particle', 'en');
    for (const item of items) {
      expect(item.prompt).toContain('___');
      expect(item.prompt).not.toContain(item.answer);
    }
  });

  it('blanks out the grammar answer text in every example sentence', () => {
    const items = getQuizItems('grammar', 'en');
    for (const item of items) {
      expect(item.prompt).toContain('___');
      expect(item.prompt).not.toContain(item.answer);
    }
  });

  it('generates one quiz item per particle example (8 particles × 10 examples)', () => {
    const items = getQuizItems('particle', 'en');
    expect(items).toHaveLength(80);
    expect(new Set(items.map(i => i.id)).size).toBe(80);
  });

  it('generates one quiz item per grammar example (6 patterns × 10 examples)', () => {
    const items = getQuizItems('grammar', 'en');
    expect(items).toHaveLength(60);
    expect(new Set(items.map(i => i.id)).size).toBe(60);
  });

  it('returns one item per word for a vocabExtra batch, matching that batch size', () => {
    const items = getQuizItems('vocabExtra0', 'en');
    expect(items).toHaveLength(vocabN5ExtraBatches[0].length);

    const lastIndex = vocabN5ExtraBatches.length - 1;
    const lastItems = getQuizItems(`vocabExtra${lastIndex}`, 'en');
    expect(lastItems).toHaveLength(vocabN5ExtraBatches[lastIndex].length);
  });

  it('returns an empty array for an out-of-range vocabExtra batch index', () => {
    const items = getQuizItems(`vocabExtra${vocabN5ExtraBatches.length}`, 'en');
    expect(items).toEqual([]);
  });
});

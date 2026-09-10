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

  it('returns one item per kanji entry, using the active language for the meaning', () => {
    const itemsTh = getQuizItems('kanji', 'th');
    const itemsEn = getQuizItems('kanji', 'en');
    expect(itemsTh.length).toBeGreaterThan(0);
    expect(itemsTh.length).toBe(itemsEn.length);
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

  it('generates one quiz item per particle example (18 particles × 10 examples)', () => {
    const items = getQuizItems('particle', 'en');
    expect(items).toHaveLength(180);
    expect(new Set(items.map(i => i.id)).size).toBe(180);
  });

  it('generates one quiz item per grammar example', () => {
    const items = getQuizItems('grammar', 'en');
    expect(items).toHaveLength(196);
    expect(new Set(items.map(i => i.id)).size).toBe(196);
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

  it('gives every kanji item an explanation containing its on/kun readings', () => {
    const items = getQuizItems('kanji', 'en');
    for (const item of items) {
      expect(item.explanation).toBeTruthy();
    }
    const ichi = items.find(i => i.id === 'kanji-一');
    expect(ichi?.explanation).toContain('いち');
  });

  it('gives every particle item an explanation matching the active language usage note', () => {
    const itemsTh = getQuizItems('particle', 'th');
    const itemsEn = getQuizItems('particle', 'en');
    expect(itemsTh.every(i => i.explanation && i.explanation.length > 0)).toBe(true);
    expect(itemsTh.map(i => i.explanation)).not.toEqual(itemsEn.map(i => i.explanation));
  });

  it('gives every grammar item an explanation matching the active language pattern meaning', () => {
    const itemsTh = getQuizItems('grammar', 'th');
    const itemsEn = getQuizItems('grammar', 'en');
    expect(itemsTh.every(i => i.explanation && i.explanation.length > 0)).toBe(true);
    expect(itemsTh.map(i => i.explanation)).not.toEqual(itemsEn.map(i => i.explanation));
  });

  it('leaves explanation undefined for hiragana, katakana, and vocab items', () => {
    expect(getQuizItems('hiragana', 'en').every(i => i.explanation === undefined)).toBe(true);
    expect(getQuizItems('katakana', 'en').every(i => i.explanation === undefined)).toBe(true);
    expect(getQuizItems('vocab', 'en').every(i => i.explanation === undefined)).toBe(true);
  });
});

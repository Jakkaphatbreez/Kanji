import { describe, it, expect } from 'vitest';
import { pickQuestion } from './pickQuestion';
import { getQuizItems } from '@/lib/quiz/items';

describe('pickQuestion', () => {
  it('returns a question with 4 unique choices including the correct answer', () => {
    const question = pickQuestion('en', []);
    expect(new Set(question.choices).size).toBe(4);
    expect(question.choices).toContain(question.correctAnswer);
  });

  it('never picks a kanji whose id is in excludeIds', () => {
    const pool = getQuizItems('kanji', 'en');
    const excludeIds = pool.slice(0, pool.length - 1).map(item => item.id);
    const question = pickQuestion('en', excludeIds);
    expect(excludeIds).not.toContain(question.id);
  });

  it('falls back to the full pool if excludeIds covers every item', () => {
    const pool = getQuizItems('kanji', 'en');
    const excludeIds = pool.map(item => item.id);
    const question = pickQuestion('en', excludeIds);
    expect(question.id.length).toBeGreaterThan(0);
  });

  it('uses the active language for the correct answer', () => {
    const questionTh = pickQuestion('th', []);
    const pool = getQuizItems('kanji', 'th');
    const item = pool.find(i => i.id === questionTh.id);
    expect(questionTh.correctAnswer).toBe(item?.answer);
  });
});

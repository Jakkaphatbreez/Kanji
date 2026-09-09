import { describe, it, expect, beforeEach } from 'vitest';
import { setQuizAutostart, consumeQuizAutostart } from './autostart';

describe('quiz autostart handoff', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('returns null when nothing was set', () => {
    expect(consumeQuizAutostart()).toBeNull();
  });

  it('returns the stored category and mode after being set', () => {
    setQuizAutostart({ category: 'hiragana', mode: 'multiple-choice' });
    expect(consumeQuizAutostart()).toEqual({ category: 'hiragana', mode: 'multiple-choice' });
  });

  it('consumes the value so a second read returns null', () => {
    setQuizAutostart({ category: 'kanji', mode: 'typing' });
    consumeQuizAutostart();
    expect(consumeQuizAutostart()).toBeNull();
  });

  it('returns null for malformed stored data instead of throwing', () => {
    window.sessionStorage.setItem('kanji-app-quiz-autostart', 'not json');
    expect(() => consumeQuizAutostart()).not.toThrow();
    expect(consumeQuizAutostart()).toBeNull();
  });
});

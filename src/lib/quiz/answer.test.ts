import { describe, it, expect } from 'vitest';
import { checkAnswer } from './answer';
import type { MultipleChoiceQuestion, TypingQuestion } from './types';

describe('checkAnswer', () => {
  it('accepts an exact match for multiple-choice questions', () => {
    const question: MultipleChoiceQuestion = {
      mode: 'multiple-choice',
      prompt: 'あ',
      choices: ['a', 'i', 'u', 'e'],
      correctAnswer: 'a',
    };
    expect(checkAnswer(question, 'a')).toBe(true);
    expect(checkAnswer(question, 'i')).toBe(false);
  });

  it('is case-insensitive and trims whitespace for typing questions', () => {
    const question: TypingQuestion = {
      mode: 'typing',
      prompt: 'あ',
      correctAnswer: 'a',
    };
    expect(checkAnswer(question, ' A ')).toBe(true);
    expect(checkAnswer(question, 'b')).toBe(false);
  });
});

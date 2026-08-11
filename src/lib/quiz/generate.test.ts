import { describe, it, expect } from 'vitest';
import { generateQuiz } from './generate';
import type { QuizItem } from './types';

function makeItems(count: number, group: string): QuizItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${group}-${i}`,
    prompt: `prompt-${i}`,
    answer: `answer-${group}-${i}`,
    group,
  }));
}

describe('generateQuiz', () => {
  it('generates the requested number of multiple-choice questions with 4 unique choices each', () => {
    const items = makeItems(10, 'a');
    const { questions } = generateQuiz(items, 'multiple-choice', 5);
    expect(questions).toHaveLength(5);
    for (const q of questions) {
      if (q.mode !== 'multiple-choice') throw new Error('expected multiple-choice');
      expect(new Set(q.choices).size).toBe(q.choices.length);
      expect(q.choices).toHaveLength(4);
      expect(q.choices).toContain(q.correctAnswer);
    }
  });

  it('reduces the returned question count when there are fewer items than requested', () => {
    const items = makeItems(3, 'a');
    const { questions, requestedCount } = generateQuiz(items, 'typing', 10);
    expect(requestedCount).toBe(10);
    expect(questions).toHaveLength(3);
  });

  it('falls back to other groups when a group has too few distractors', () => {
    const items = [...makeItems(1, 'small'), ...makeItems(5, 'big')];
    const { questions } = generateQuiz(items, 'multiple-choice', 1);
    const [question] = questions;
    if (question.mode !== 'multiple-choice') throw new Error('expected multiple-choice');
    expect(question.choices).toHaveLength(4);
  });

  it('produces typing questions with a correctAnswer matching the item', () => {
    const items = makeItems(2, 'a');
    const { questions } = generateQuiz(items, 'typing', 2);
    for (const q of questions) {
      expect(q.mode).toBe('typing');
    }
  });
});

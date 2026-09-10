import { describe, it, expect } from 'vitest';
import { generateQuiz, buildMultipleChoiceQuestion } from './generate';
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

  it('carries an item explanation through to multiple-choice questions', () => {
    const items = makeItems(5, 'a');
    items[0].explanation = 'why this is the answer';
    const { questions } = generateQuiz(items, 'multiple-choice', items.length);
    const question = questions.find(q => q.correctAnswer === items[0].answer);
    expect(question?.explanation).toBe('why this is the answer');
  });

  it('carries an item explanation through to typing questions', () => {
    const items = makeItems(1, 'a');
    items[0].explanation = 'why this is the answer';
    const { questions } = generateQuiz(items, 'typing', 1);
    expect(questions[0].explanation).toBe('why this is the answer');
  });

  it('leaves explanation undefined when the item has none', () => {
    const items = makeItems(5, 'a');
    const { questions } = generateQuiz(items, 'multiple-choice', 1);
    expect(questions[0].explanation).toBeUndefined();
  });

  it('never offers a distractor that would also correctly fill the same blanked prompt', () => {
    // Mirrors a real data ambiguity: "にほんごはむずかしいです___。" is completed
    // correctly by both ね and よ, since both are valid Japanese sentence-enders.
    // Whichever one is the "intended" answer for a given item, the other must
    // never appear as a distractor for it — a learner picking it would be
    // marked wrong despite writing a grammatically correct sentence.
    const items: QuizItem[] = [
      { id: 'ne', prompt: 'にほんごはむずかしいです___。', answer: 'ね', group: 'particle' },
      { id: 'yo-collision', prompt: 'にほんごはむずかしいです___。', answer: 'よ', group: 'particle' },
      { id: 'ka', prompt: 'これはほんです___。', answer: 'か', group: 'particle' },
      { id: 'wa', prompt: 'がっこうはたのしいです___。', answer: 'は', group: 'particle' },
      { id: 'mo', prompt: 'さかな___おいしいです。', answer: 'も', group: 'particle' },
    ];
    const question = buildMultipleChoiceQuestion(items[0], items, 3);
    expect(question.choices).not.toContain('よ');
    expect(question.choices).toHaveLength(4);
  });

  it('still fills up to the requested distractor count when no collision applies', () => {
    const items = makeItems(10, 'a');
    const question = buildMultipleChoiceQuestion(items[0], items, 3);
    expect(question.choices).toHaveLength(4);
  });
});

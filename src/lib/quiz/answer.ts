import type { QuizQuestion } from './types';

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function checkAnswer(question: QuizQuestion, userInput: string): boolean {
  return normalize(userInput) === normalize(question.correctAnswer);
}

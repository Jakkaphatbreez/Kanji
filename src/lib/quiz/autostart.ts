import type { QuizCategory, QuizMode } from './types';

const STORAGE_KEY = 'kanji-app-quiz-autostart';

export interface QuizAutostart {
  category: QuizCategory;
  mode: QuizMode;
}

export function setQuizAutostart(value: QuizAutostart): void {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function consumeQuizAutostart(): QuizAutostart | null {
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  window.sessionStorage.removeItem(STORAGE_KEY);
  try {
    return JSON.parse(raw) as QuizAutostart;
  } catch {
    return null;
  }
}

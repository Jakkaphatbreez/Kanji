export type Language = 'th' | 'en';
export type QuizCategory =
  | 'hiragana'
  | 'katakana'
  | 'vocab'
  | `vocabExtra${number}`
  | 'kanji'
  | 'particle'
  | 'grammar';
export type QuizMode = 'multiple-choice' | 'typing';

export interface QuizItem {
  id: string;
  prompt: string;
  answer: string;
  group: string;
}

export interface MultipleChoiceQuestion {
  mode: 'multiple-choice';
  prompt: string;
  choices: string[];
  correctAnswer: string;
}

export interface TypingQuestion {
  mode: 'typing';
  prompt: string;
  correctAnswer: string;
}

export type QuizQuestion = MultipleChoiceQuestion | TypingQuestion;

'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TypingQuestion as TypingQuestionType } from '@/lib/quiz/types';

interface TypingQuestionProps {
  question: TypingQuestionType;
  disabled: boolean;
  onAnswer: (input: string) => void;
}

export function TypingQuestion({ question, disabled, onAnswer }: TypingQuestionProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState('');

  return (
    <div>
      <p className="mb-4 text-3xl">{question.prompt}</p>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={disabled}
        placeholder={t.quiz.typingPlaceholder}
        className="w-full rounded border border-pink-300 bg-white px-3 py-2 focus:border-pink-500 focus:outline-none"
      />
      <button
        onClick={() => onAnswer(value)}
        disabled={disabled}
        className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:opacity-50"
      >
        {t.quiz.submit}
      </button>
    </div>
  );
}

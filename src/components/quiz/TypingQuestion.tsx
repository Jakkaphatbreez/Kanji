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
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
      <button
        onClick={() => onAnswer(value)}
        disabled={disabled}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {t.quiz.submit}
      </button>
    </div>
  );
}

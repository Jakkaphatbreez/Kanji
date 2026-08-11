'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { QuizCategory, QuizMode } from '@/lib/quiz/types';

interface QuizSetupProps {
  onStart: (category: QuizCategory, mode: QuizMode) => void;
}

const CATEGORIES: QuizCategory[] = ['hiragana', 'katakana', 'vocab', 'particle', 'grammar'];

export function QuizSetup({ onStart }: QuizSetupProps) {
  const { t } = useLanguage();
  const [category, setCategory] = useState<QuizCategory>('hiragana');
  const [mode, setMode] = useState<QuizMode>('multiple-choice');

  return (
    <div>
      <h1 className="text-2xl font-bold">{t.quiz.title}</h1>

      <div className="my-4">
        <p className="mb-2 font-semibold">{t.quiz.selectCategory}</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={category === c ? 'rounded border-2 border-blue-600 px-3 py-1' : 'rounded border px-3 py-1'}
            >
              {t.quiz.categories[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="mb-2 font-semibold">{t.quiz.selectMode}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('multiple-choice')}
            className={mode === 'multiple-choice' ? 'rounded border-2 border-blue-600 px-3 py-1' : 'rounded border px-3 py-1'}
          >
            {t.quiz.multipleChoice}
          </button>
          <button
            onClick={() => setMode('typing')}
            className={mode === 'typing' ? 'rounded border-2 border-blue-600 px-3 py-1' : 'rounded border px-3 py-1'}
          >
            {t.quiz.typing}
          </button>
        </div>
      </div>

      <button onClick={() => onStart(category, mode)} className="rounded bg-blue-600 px-4 py-2 text-white">
        {t.quiz.start}
      </button>
    </div>
  );
}

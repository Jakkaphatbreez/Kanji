'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { vocabN5ExtraBatches, vocabN5ExtraBatchLabel } from '@/data/vocab-n5-extra';
import type { QuizCategory, QuizMode } from '@/lib/quiz/types';

interface QuizSetupProps {
  onStart: (category: QuizCategory, mode: QuizMode) => void;
}

type MainCategory = 'hiragana' | 'katakana' | 'vocab' | 'vocabExtra' | 'kanji' | 'particle' | 'grammar';

const MAIN_CATEGORIES: MainCategory[] = ['hiragana', 'katakana', 'vocab', 'vocabExtra', 'kanji', 'particle', 'grammar'];

export function QuizSetup({ onStart }: QuizSetupProps) {
  const { t } = useLanguage();
  const [mainCategory, setMainCategory] = useState<MainCategory>('hiragana');
  const [extraBatch, setExtraBatch] = useState(0);
  const [mode, setMode] = useState<QuizMode>('multiple-choice');

  const resolvedCategory: QuizCategory =
    mainCategory === 'vocabExtra' ? (`vocabExtra${extraBatch}` as QuizCategory) : mainCategory;

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.quiz.title}</h1>

      <div className="my-4">
        <p className="mb-2 font-semibold">{t.quiz.selectCategory}</p>
        <div className="flex flex-wrap items-center gap-2">
          {MAIN_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setMainCategory(c)}
              className={mainCategory === c ? 'rounded border-2 border-pink-500 px-3 py-1 text-pink-600' : 'rounded border border-pink-200 px-3 py-1'}
            >
              {t.quiz.categories[c]}
            </button>
          ))}
          {mainCategory === 'vocabExtra' && (
            <select
              value={extraBatch}
              onChange={e => setExtraBatch(Number(e.target.value))}
              className="rounded border border-pink-300 bg-white px-3 py-1"
            >
              {vocabN5ExtraBatches.map((_, i) => (
                <option key={i} value={i}>
                  {vocabN5ExtraBatchLabel(i)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="my-4">
        <p className="mb-2 font-semibold">{t.quiz.selectMode}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('multiple-choice')}
            className={mode === 'multiple-choice' ? 'rounded border-2 border-pink-500 px-3 py-1 text-pink-600' : 'rounded border border-pink-200 px-3 py-1'}
          >
            {t.quiz.multipleChoice}
          </button>
          <button
            onClick={() => setMode('typing')}
            className={mode === 'typing' ? 'rounded border-2 border-pink-500 px-3 py-1 text-pink-600' : 'rounded border border-pink-200 px-3 py-1'}
          >
            {t.quiz.typing}
          </button>
        </div>
      </div>

      <button
        onClick={() => onStart(resolvedCategory, mode)}
        className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
      >
        {t.quiz.start}
      </button>
    </div>
  );
}

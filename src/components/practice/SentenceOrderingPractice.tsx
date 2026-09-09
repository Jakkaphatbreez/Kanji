'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { sentenceOrderingItems } from '@/data/sentenceOrdering';
import { SentenceOrderExercise } from './SentenceOrderExercise';

type Stage =
  | { name: 'active'; idx: number; score: number }
  | { name: 'checked'; idx: number; score: number; correct: boolean }
  | { name: 'result'; score: number };

export function SentenceOrderingPractice() {
  const { t, language } = useLanguage();
  const [stage, setStage] = useState<Stage>({ name: 'active', idx: 0, score: 0 });

  function handleResult(idx: number, score: number, correct: boolean) {
    setStage({ name: 'checked', idx, score: correct ? score + 1 : score, correct });
  }

  function next(idx: number, score: number) {
    if (idx + 1 >= sentenceOrderingItems.length) {
      setStage({ name: 'result', score });
    } else {
      setStage({ name: 'active', idx: idx + 1, score });
    }
  }

  function restart() {
    setStage({ name: 'active', idx: 0, score: 0 });
  }

  if (stage.name === 'result') {
    return (
      <div>
        <h2 className="text-2xl font-bold text-indigo-900">{t.quiz.yourScore}</h2>
        <p className="mt-2 text-4xl font-bold text-pink-600">
          {stage.score} / {sentenceOrderingItems.length}
        </p>
        <button onClick={restart} className="mt-4 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
          {t.quiz.playAgain}
        </button>
      </div>
    );
  }

  const item = sentenceOrderingItems[stage.idx];

  return (
    <div>
      <p className="mb-4 text-gray-500">
        {stage.idx + 1} / {sentenceOrderingItems.length}
      </p>
      <SentenceOrderExercise
        key={item.id}
        item={item}
        checkLabel={t.practice.checkLabel}
        onResult={correct => handleResult(stage.idx, stage.score, correct)}
      />
      {stage.name === 'checked' && (
        <div className="mt-4">
          <p className={stage.correct ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>
            {stage.correct ? t.quiz.correct : t.quiz.incorrect}
          </p>
          {!stage.correct && <p className="text-gray-700">{item.segments.join('')}</p>}
          <p className="text-sm text-gray-600">{language === 'th' ? item.translationTh : item.translationEn}</p>
          <button
            onClick={() => next(stage.idx, stage.score)}
            className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            {t.quiz.next}
          </button>
        </div>
      )}
    </div>
  );
}

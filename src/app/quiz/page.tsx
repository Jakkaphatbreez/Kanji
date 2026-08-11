'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuizSetup } from '@/components/quiz/QuizSetup';
import { QuizSession } from '@/components/quiz/QuizSession';
import { QuizResult } from '@/components/quiz/QuizResult';
import { getQuizItems } from '@/lib/quiz/items';
import { generateQuiz } from '@/lib/quiz/generate';
import type { QuizCategory, QuizMode, QuizQuestion } from '@/lib/quiz/types';

const QUESTION_COUNT = 10;

type Stage =
  | { name: 'setup' }
  | { name: 'active'; questions: QuizQuestion[]; reduced: boolean }
  | { name: 'result'; score: number; total: number };

export default function QuizPage() {
  const { t, language } = useLanguage();
  const [stage, setStage] = useState<Stage>({ name: 'setup' });

  function handleStart(category: QuizCategory, mode: QuizMode) {
    const items = getQuizItems(category, language);
    const { questions, requestedCount } = generateQuiz(items, mode, QUESTION_COUNT);
    setStage({ name: 'active', questions, reduced: questions.length < requestedCount });
  }

  function handleFinish(score: number, total: number) {
    setStage({ name: 'result', score, total });
  }

  function handlePlayAgain() {
    setStage({ name: 'setup' });
  }

  if (stage.name === 'setup') {
    return <QuizSetup onStart={handleStart} />;
  }

  if (stage.name === 'active') {
    return (
      <div>
        {stage.reduced && <p className="mb-4 text-amber-600">{t.quiz.reducedCountNotice}</p>}
        <QuizSession questions={stage.questions} onFinish={handleFinish} />
      </div>
    );
  }

  return <QuizResult score={stage.score} total={stage.total} onPlayAgain={handlePlayAgain} />;
}

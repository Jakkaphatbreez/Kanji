'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuizSetup } from '@/components/quiz/QuizSetup';
import { QuizSession } from '@/components/quiz/QuizSession';
import { QuizResult } from '@/components/quiz/QuizResult';
import { getQuizItems } from '@/lib/quiz/items';
import { generateQuiz } from '@/lib/quiz/generate';
import type { QuizCategory, QuizMode, QuizQuestion } from '@/lib/quiz/types';

const CATEGORY_QUESTION_LIMIT: Partial<Record<QuizCategory, number>> = {
  particle: 50,
  grammar: 50,
};

type Stage =
  | { name: 'setup' }
  | { name: 'active'; questions: QuizQuestion[] }
  | { name: 'result'; score: number; total: number };

export default function QuizPage() {
  const { language } = useLanguage();
  const [stage, setStage] = useState<Stage>({ name: 'setup' });

  function handleStart(category: QuizCategory, mode: QuizMode) {
    const items = getQuizItems(category, language);
    const count = CATEGORY_QUESTION_LIMIT[category] ?? items.length;
    const { questions } = generateQuiz(items, mode, count);
    setStage({ name: 'active', questions });
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
    return <QuizSession questions={stage.questions} onFinish={handleFinish} />;
  }

  return <QuizResult score={stage.score} total={stage.total} onPlayAgain={handlePlayAgain} />;
}

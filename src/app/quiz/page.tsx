'use client';

import { useEffect, useState } from 'react';
import { useLanguage, getStoredLanguage, type Language } from '@/i18n/LanguageContext';
import { QuizSetup } from '@/components/quiz/QuizSetup';
import { QuizSession } from '@/components/quiz/QuizSession';
import { QuizResult } from '@/components/quiz/QuizResult';
import { getQuizItems } from '@/lib/quiz/items';
import { generateQuiz } from '@/lib/quiz/generate';
import { consumeQuizAutostart } from '@/lib/quiz/autostart';
import type { QuizCategory, QuizMode, QuizQuestion } from '@/lib/quiz/types';

const CATEGORY_QUESTION_LIMIT: Partial<Record<QuizCategory, number>> = {
  kanji: 50,
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

  function startQuiz(category: QuizCategory, mode: QuizMode, forLanguage: Language) {
    const items = getQuizItems(category, forLanguage);
    const count = CATEGORY_QUESTION_LIMIT[category] ?? items.length;
    const { questions } = generateQuiz(items, mode, count);
    setStage({ name: 'active', questions });
  }

  function handleStart(category: QuizCategory, mode: QuizMode) {
    startQuiz(category, mode, language);
  }

  // Reads the persisted language directly (rather than the `language` from
  // context above) because LanguageProvider corrects its own default to the
  // stored preference in an effect that may not have landed yet on this very
  // first render — reading localStorage ourselves sidesteps that race
  // entirely instead of trying to wait it out.
  useEffect(() => {
    const pending = consumeQuizAutostart();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from sessionStorage, an external system, matches this rule's own sanctioned use case (see LanguageContext.tsx for the same precedent)
    if (pending) startQuiz(pending.category, pending.mode, getStoredLanguage());
  }, []);

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

'use client';

import { useLanguage } from '@/i18n/LanguageContext';

interface QuizResultProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
}

export function QuizResult({ score, total, onPlayAgain }: QuizResultProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-bold">{t.quiz.yourScore}</h2>
      <p className="mt-2 text-4xl font-bold">
        {score} / {total}
      </p>
      <button onClick={onPlayAgain} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        {t.quiz.playAgain}
      </button>
    </div>
  );
}

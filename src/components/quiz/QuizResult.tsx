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
      <h2 className="text-2xl font-bold text-indigo-900">{t.quiz.yourScore}</h2>
      <p className="mt-2 text-4xl font-bold text-pink-600">
        {score} / {total}
      </p>
      <button onClick={onPlayAgain} className="mt-4 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
        {t.quiz.playAgain}
      </button>
    </div>
  );
}

'use client';

import { useLanguage } from '@/i18n/LanguageContext';

interface GameOverOverlayProps {
  score: number;
  onPlayAgain: () => void;
}

export function GameOverOverlay({ score, onPlayAgain }: GameOverOverlayProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded border border-pink-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-indigo-900">{t.game.gameOver}</h2>
      <p className="text-lg">{t.game.finalScore}: {score}</p>
      <button onClick={onPlayAgain} className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
        {t.game.playAgain}
      </button>
    </div>
  );
}

import { useLanguage } from '@/i18n/LanguageContext';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { t } = useLanguage();
  return (
    <div className="text-lg font-semibold text-indigo-900">
      {t.game.score}: {score}
    </div>
  );
}

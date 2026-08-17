'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.home.title}</h1>
      <p className="mt-2 text-gray-600">{t.home.subtitle}</p>
    </div>
  );
}

'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => setLanguage('th')}
        className={language === 'th' ? 'font-bold underline' : 'text-gray-500'}
      >
        {t.language.th}
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'font-bold underline' : 'text-gray-500'}
      >
        {t.language.en}
      </button>
    </div>
  );
}

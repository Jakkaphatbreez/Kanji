'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { StoryPractice } from '@/components/practice/StoryPractice';
import { SentenceOrderingPractice } from '@/components/practice/SentenceOrderingPractice';

type Tab = 'reading' | 'listening' | 'ordering';

export default function PracticePage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('reading');

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.practice.title}</h1>
      <p className="mt-2 text-sm text-gray-600">{t.practice.subtitle}</p>

      <div className="my-4 flex gap-2">
        <button
          onClick={() => setTab('reading')}
          className={tab === 'reading' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.practice.readingTab}
        </button>
        <button
          onClick={() => setTab('listening')}
          className={tab === 'listening' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.practice.listeningTab}
        </button>
        <button
          onClick={() => setTab('ordering')}
          className={tab === 'ordering' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.practice.orderingTab}
        </button>
      </div>

      {tab === 'reading' && <StoryPractice key="reading" mode="reading" />}
      {tab === 'listening' && <StoryPractice key="listening" mode="listening" />}
      {tab === 'ordering' && <SentenceOrderingPractice />}
    </div>
  );
}

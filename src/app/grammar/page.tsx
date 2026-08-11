'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { particles } from '@/data/particles';
import { grammarPatterns } from '@/data/grammar';

export default function GrammarPage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<'particles' | 'grammar'>('particles');

  return (
    <div>
      <h1 className="text-2xl font-bold">{t.grammar.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => setTab('particles')}
          className={tab === 'particles' ? 'font-bold underline' : ''}
        >
          {t.grammar.particlesTab}
        </button>
        <button
          onClick={() => setTab('grammar')}
          className={tab === 'grammar' ? 'font-bold underline' : ''}
        >
          {t.grammar.grammarTab}
        </button>
      </div>

      {tab === 'particles' ? (
        <ul className="space-y-4">
          {particles.map(p => (
            <li key={p.particle} className="rounded border border-gray-200 p-3">
              <div className="text-lg font-semibold">{p.particle}</div>
              <div>{language === 'th' ? p.usageTh : p.usageEn}</div>
              <ul className="mt-2 space-y-1 text-gray-600">
                {p.examples.map((example, i) => (
                  <li key={i}>
                    {example.jp} — {language === 'th' ? example.th : example.en}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-4">
          {grammarPatterns.map(g => (
            <li key={g.pattern} className="rounded border border-gray-200 p-3">
              <div className="text-lg font-semibold">{g.pattern}</div>
              <div>{language === 'th' ? g.meaningTh : g.meaningEn}</div>
              <ul className="mt-2 space-y-1 text-gray-600">
                {g.examples.map((example, i) => (
                  <li key={i}>
                    {example.jp} — {language === 'th' ? example.th : example.en}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

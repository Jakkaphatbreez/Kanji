'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { particles } from '@/data/particles';
import { grammarPatterns } from '@/data/grammar';
import { conjugationGroups } from '@/data/conjugation';

export default function GrammarPage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<'particles' | 'grammar' | 'conjugation'>('particles');

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.grammar.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => setTab('particles')}
          className={tab === 'particles' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.grammar.particlesTab}
        </button>
        <button
          onClick={() => setTab('grammar')}
          className={tab === 'grammar' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.grammar.grammarTab}
        </button>
        <button
          onClick={() => setTab('conjugation')}
          className={tab === 'conjugation' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.grammar.conjugationTab}
        </button>
      </div>

      {tab === 'particles' && (
        <ul className="space-y-4">
          {particles.map(p => (
            <li key={p.particle} className="rounded border border-pink-200 bg-white p-3">
              <div className="text-lg font-semibold text-indigo-900">{p.particle}</div>
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
      )}

      {tab === 'grammar' && (
        <ul className="space-y-4">
          {grammarPatterns.map(g => (
            <li key={g.pattern} className="rounded border border-pink-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold text-indigo-900">{g.pattern}</div>
                {g.bonusLevel && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                    {t.grammar.bonusN4Label}
                  </span>
                )}
              </div>
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

      {tab === 'conjugation' && (
        <ul className="space-y-6">
          {conjugationGroups.map(group => (
            <li key={group.groupId} className="rounded border border-pink-200 bg-white p-3">
              <div className="text-lg font-semibold text-indigo-900">
                {language === 'th' ? group.titleTh : group.titleEn}
              </div>
              <div className="mt-1 text-sm text-gray-600">{language === 'th' ? group.ruleTh : group.ruleEn}</div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-max border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b border-pink-300 px-2 py-1 font-semibold text-indigo-900">
                        {language === 'th' ? 'ความหมาย' : 'Meaning'}
                      </th>
                      {group.formIds.map(formId => (
                        <th key={formId} className="border-b border-pink-300 px-2 py-1 font-semibold text-indigo-900">
                          {t.grammar.forms[formId]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.examples.map(example => (
                      <tr key={example.word}>
                        <td className="border-b border-pink-100 px-2 py-1 text-gray-600">
                          {language === 'th' ? example.meaningTh : example.meaningEn}
                        </td>
                        {example.forms.map(form => (
                          <td key={form.formId} className="border-b border-pink-100 px-2 py-1">
                            {form.value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

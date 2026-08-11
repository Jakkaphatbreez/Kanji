'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { DataTable } from '@/components/DataTable';
import { vocabN5 } from '@/data/vocab-n5';
import { vocabN5ExtraBatches, vocabN5ExtraBatchLabel } from '@/data/vocab-n5-extra';
import type { VocabCategory } from '@/types/content';

export default function VocabPage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<'core' | 'extra'>('core');
  const [extraBatch, setExtraBatch] = useState(0);
  const [category, setCategory] = useState<VocabCategory | 'all'>('all');

  const source = tab === 'core' ? vocabN5 : vocabN5ExtraBatches[extraBatch];
  const filtered = category === 'all' ? source : source.filter(v => v.category === category);
  const categoryKeys = Object.keys(t.vocab.categories) as VocabCategory[];

  return (
    <div>
      <h1 className="text-2xl font-bold">{t.vocab.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => setTab('core')}
          className={tab === 'core' ? 'font-bold underline' : ''}
        >
          {t.vocab.coreTab}
        </button>
        <button
          onClick={() => setTab('extra')}
          className={tab === 'extra' ? 'font-bold underline' : ''}
        >
          {t.vocab.extraTab}
        </button>
      </div>
      {tab === 'extra' && (
        <select
          value={extraBatch}
          onChange={e => setExtraBatch(Number(e.target.value))}
          className="mb-4 rounded border border-gray-300 px-3 py-2"
        >
          {vocabN5ExtraBatches.map((_, i) => (
            <option key={i} value={i}>
              {vocabN5ExtraBatchLabel(i)}
            </option>
          ))}
        </select>
      )}
      <select
        value={category}
        onChange={e => setCategory(e.target.value as VocabCategory | 'all')}
        className="my-4 rounded border border-gray-300 px-3 py-2"
      >
        <option value="all">{t.vocab.allCategories}</option>
        {categoryKeys.map(key => (
          <option key={key} value={key}>
            {t.vocab.categories[key]}
          </option>
        ))}
      </select>
      <DataTable
        data={filtered}
        rowKey={row => row.jp}
        getSearchText={row => `${row.jp} ${row.kana} ${row.romaji} ${row.meaningTh} ${row.meaningEn}`}
        searchPlaceholder={t.vocab.searchPlaceholder}
        columns={[
          { header: t.vocab.jpColumn, accessor: row => row.jp },
          { header: t.vocab.kanaColumn, accessor: row => row.kana },
          { header: t.vocab.meaningColumn, accessor: row => (language === 'th' ? row.meaningTh : row.meaningEn) },
          { header: t.vocab.categoryColumn, accessor: row => t.vocab.categories[row.category] },
        ]}
      />
    </div>
  );
}

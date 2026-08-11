'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { DataTable } from '@/components/DataTable';
import { vocabN5 } from '@/data/vocab-n5';
import type { VocabCategory } from '@/types/content';

export default function VocabPage() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState<VocabCategory | 'all'>('all');

  const filtered = category === 'all' ? vocabN5 : vocabN5.filter(v => v.category === category);
  const categoryKeys = Object.keys(t.vocab.categories) as VocabCategory[];

  return (
    <div>
      <h1 className="text-2xl font-bold">{t.vocab.title}</h1>
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

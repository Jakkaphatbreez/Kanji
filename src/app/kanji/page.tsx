'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { DataTable } from '@/components/DataTable';
import { kanji } from '@/data/kanji';
import type { KanjiCategory } from '@/types/content';

export default function KanjiPage() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState<KanjiCategory | 'all'>('all');

  const filtered = category === 'all' ? kanji : kanji.filter(k => k.category === category);
  const categoryKeys = Object.keys(t.kanji.categories) as KanjiCategory[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.kanji.title}</h1>
      <select
        value={category}
        onChange={e => setCategory(e.target.value as KanjiCategory | 'all')}
        className="my-4 rounded border border-pink-300 bg-white px-3 py-2"
      >
        <option value="all">{t.kanji.allCategories}</option>
        {categoryKeys.map(key => (
          <option key={key} value={key}>
            {t.kanji.categories[key]}
          </option>
        ))}
      </select>
      <DataTable
        data={filtered}
        rowKey={row => row.kanji}
        getSearchText={row => `${row.kanji} ${row.on} ${row.kun} ${row.meaningTh} ${row.meaningEn}`}
        searchPlaceholder={t.kanji.searchPlaceholder}
        columns={[
          { header: t.kanji.kanjiColumn, accessor: row => row.kanji },
          { header: t.kanji.onColumn, accessor: row => row.on },
          { header: t.kanji.kunColumn, accessor: row => row.kun },
          { header: t.kanji.meaningColumn, accessor: row => (language === 'th' ? row.meaningTh : row.meaningEn) },
          { header: t.kanji.categoryColumn, accessor: row => t.kanji.categories[row.category] },
        ]}
      />
    </div>
  );
}

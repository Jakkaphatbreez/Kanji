'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { DataTable } from '@/components/DataTable';
import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';

export default function KanaPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const data = tab === 'hiragana' ? hiragana : katakana;

  return (
    <div>
      <h1 className="text-2xl font-bold">{t.kana.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => setTab('hiragana')}
          className={tab === 'hiragana' ? 'font-bold underline' : ''}
        >
          {t.kana.hiragana}
        </button>
        <button
          onClick={() => setTab('katakana')}
          className={tab === 'katakana' ? 'font-bold underline' : ''}
        >
          {t.kana.katakana}
        </button>
      </div>
      <DataTable
        data={data}
        rowKey={row => row.char}
        getSearchText={row => `${row.char} ${row.romaji}`}
        searchPlaceholder={t.vocab.searchPlaceholder}
        columns={[
          { header: t.kana.charColumn, accessor: row => row.char },
          { header: t.kana.romajiColumn, accessor: row => row.romaji },
        ]}
      />
    </div>
  );
}

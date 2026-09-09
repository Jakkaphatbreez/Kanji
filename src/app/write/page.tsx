'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CharacterGrid } from '@/components/write/CharacterGrid';
import { StrokeOrderAnimation } from '@/components/write/StrokeOrderAnimation';
import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';
import { kanji } from '@/data/kanji';
import { strokeData } from '@/data/strokes';

type Tab = 'hiragana' | 'katakana' | 'kanji';

function firstCharFor(tab: Tab): string {
  if (tab === 'hiragana') return hiragana[0]?.char ?? '';
  if (tab === 'katakana') return katakana[0]?.char ?? '';
  return kanji[0]?.kanji ?? '';
}

export default function WritePage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<Tab>('hiragana');
  const [selected, setSelected] = useState<string>(() => firstCharFor('hiragana'));
  const [speed, setSpeed] = useState<'slow' | 'normal'>('normal');
  const [playToken, setPlayToken] = useState(0);

  function selectTab(next: Tab) {
    setTab(next);
    setSelected(firstCharFor(next));
    setPlayToken(0);
  }

  const items = useMemo(() => {
    if (tab === 'hiragana') return hiragana.map(e => ({ char: e.char, searchText: `${e.char} ${e.romaji}` }));
    if (tab === 'katakana') return katakana.map(e => ({ char: e.char, searchText: `${e.char} ${e.romaji}` }));
    return kanji.map(e => ({
      char: e.kanji,
      searchText: `${e.kanji} ${e.on} ${e.kun} ${e.meaningTh} ${e.meaningEn}`,
    }));
  }, [tab]);

  const strokes = strokeData[selected];
  const kanaEntry = tab !== 'kanji' ? (tab === 'hiragana' ? hiragana : katakana).find(e => e.char === selected) : undefined;
  const kanjiEntry = tab === 'kanji' ? kanji.find(k => k.kanji === selected) : undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.write.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => selectTab('hiragana')}
          className={tab === 'hiragana' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.hiragana}
        </button>
        <button
          onClick={() => selectTab('katakana')}
          className={tab === 'katakana' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.katakana}
        </button>
        <button
          onClick={() => selectTab('kanji')}
          className={tab === 'kanji' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.kanji}
        </button>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <CharacterGrid
            items={items}
            selected={selected}
            onSelect={char => {
              setSelected(char);
              setPlayToken(0);
            }}
            searchPlaceholder={t.write.searchPlaceholder}
          />
        </div>
        <div className="flex flex-col items-center gap-3 md:w-1/2">
          {strokes ? (
            <>
              <StrokeOrderAnimation strokes={strokes} speed={speed} playToken={playToken} />
              <p className="text-sm text-gray-600">
                {t.write.strokeLabel}: {strokes.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayToken(p => p + 1)}
                  className="rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
                >
                  {playToken === 0 ? t.write.play : t.write.replay}
                </button>
                <button
                  onClick={() => setSpeed('slow')}
                  className={
                    speed === 'slow'
                      ? 'rounded bg-indigo-900 px-3 py-2 text-white'
                      : 'rounded border border-pink-300 px-3 py-2 text-indigo-900'
                  }
                >
                  {t.write.slow}
                </button>
                <button
                  onClick={() => setSpeed('normal')}
                  className={
                    speed === 'normal'
                      ? 'rounded bg-indigo-900 px-3 py-2 text-white'
                      : 'rounded border border-pink-300 px-3 py-2 text-indigo-900'
                  }
                >
                  {t.write.normal}
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">{t.write.noAnimation}</p>
          )}
          {kanaEntry && <p className="text-lg text-indigo-900">{kanaEntry.romaji}</p>}
          {kanjiEntry && (
            <p className="text-center text-sm text-indigo-900">
              {t.kanji.onColumn}: {kanjiEntry.on} / {t.kanji.kunColumn}: {kanjiEntry.kun}
              <br />
              {t.kanji.meaningColumn}: {language === 'th' ? kanjiEntry.meaningTh : kanjiEntry.meaningEn}
            </p>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400">{t.write.attribution}</p>
    </div>
  );
}

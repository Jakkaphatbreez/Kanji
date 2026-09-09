'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center justify-between border-b border-pink-200 bg-white px-4 py-3">
      <div className="flex gap-4 font-semibold text-indigo-900">
        <Link href="/" className="hover:text-pink-600">
          {t.nav.home}
        </Link>
        <Link href="/kana" className="hover:text-pink-600">
          {t.nav.kana}
        </Link>
        <Link href="/vocab" className="hover:text-pink-600">
          {t.nav.vocab}
        </Link>
        <Link href="/kanji" className="hover:text-pink-600">
          {t.nav.kanji}
        </Link>
        <Link href="/write" className="hover:text-pink-600">
          {t.nav.write}
        </Link>
        <Link href="/grammar" className="hover:text-pink-600">
          {t.nav.grammar}
        </Link>
        <Link href="/quiz" className="hover:text-pink-600">
          {t.nav.quiz}
        </Link>
        <Link href="/game" className="hover:text-pink-600">
          {t.nav.game}
        </Link>
      </div>
      <LanguageToggle />
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
      <div className="flex gap-4">
        <Link href="/">{t.nav.home}</Link>
        <Link href="/kana">{t.nav.kana}</Link>
        <Link href="/vocab">{t.nav.vocab}</Link>
        <Link href="/grammar">{t.nav.grammar}</Link>
        <Link href="/quiz">{t.nav.quiz}</Link>
      </div>
      <LanguageToggle />
    </nav>
  );
}

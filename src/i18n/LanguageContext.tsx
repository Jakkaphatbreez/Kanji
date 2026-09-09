'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import th from './dictionaries/th.json';
import en from './dictionaries/en.json';

export type Language = 'th' | 'en';
type Dictionary = typeof th;

const dictionaries: Record<Language, Dictionary> = { th, en };
const STORAGE_KEY = 'kanji-app-language';

export function getStoredLanguage(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'th' || stored === 'en' ? stored : 'th';
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    setLanguageState(getStoredLanguage());
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

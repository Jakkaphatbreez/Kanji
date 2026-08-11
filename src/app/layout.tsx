import type { Metadata } from 'next';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Nav } from '@/components/Nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kanji N5',
  description: 'Learn Japanese N5 basics: kana, vocabulary, particles, and grammar.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Nav />
          <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}

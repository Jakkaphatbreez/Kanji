import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function Consumer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <p data-testid="lang">{language}</p>
      <p data-testid="text">{t.nav.home}</p>
      <button onClick={() => setLanguage('en')}>to-en</button>
    </div>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to Thai', () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('th');
  });

  it('switches language and persists the choice to localStorage', () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('to-en'));
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('text').textContent).toBe('Home');
    expect(window.localStorage.getItem('kanji-app-language')).toBe('en');
  });
});

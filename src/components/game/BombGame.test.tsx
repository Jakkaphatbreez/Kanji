import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { BombGame } from './BombGame';

describe('BombGame', () => {
  it('starts idle, shows 4 forts once started, and resolves a fort click into a score or hearts change', () => {
    render(
      <LanguageProvider>
        <BombGame />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('เริ่มเกม'));

    const scoreBefore = screen.getByText(/คะแนน: \d+/).textContent;
    const buttons = screen.getAllByRole('button').filter(b => b.textContent !== 'เริ่มเกม');
    expect(buttons).toHaveLength(4);

    fireEvent.click(buttons[0]);

    const scoreAfter = screen.getByText(/คะแนน: \d+/).textContent;
    const heartsAfter = document.body.textContent?.match(/❤️|🖤/g)?.join('') ?? '';
    const resolvedCorrectly = scoreAfter !== scoreBefore || heartsAfter.includes('🖤');
    expect(resolvedCorrectly).toBe(true);
  });
});

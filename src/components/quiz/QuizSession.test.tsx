import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { QuizSession } from './QuizSession';
import type { QuizQuestion } from '@/lib/quiz/types';

const questions: QuizQuestion[] = [
  { mode: 'multiple-choice', prompt: 'あ', choices: ['a', 'i', 'u', 'e'], correctAnswer: 'a' },
  { mode: 'multiple-choice', prompt: 'い', choices: ['a', 'i', 'u', 'e'], correctAnswer: 'i' },
];

describe('QuizSession', () => {
  it('tracks score across questions and calls onFinish at the end', () => {
    const onFinish = vi.fn();
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={onFinish} />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('a'));
    fireEvent.click(screen.getByText(/next|ข้อต่อไป/i));

    fireEvent.click(screen.getByText('u'));
    fireEvent.click(screen.getByText(/next|ข้อต่อไป/i));

    expect(onFinish).toHaveBeenCalledWith(1, 2);
  });

  it('ignores a rapid double-click on Next and does not skip a question', () => {
    const onFinish = vi.fn();
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={onFinish} />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('a'));
    const nextButton = screen.getByText(/next|ข้อต่อไป/i);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getByText('い')).toBeInTheDocument();
    expect(onFinish).not.toHaveBeenCalled();
  });
});

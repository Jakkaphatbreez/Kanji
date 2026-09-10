import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('ignores a same-batch double-click on Next and does not skip a question or double-finish', () => {
    const onFinish = vi.fn();
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={onFinish} />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('a'));
    const nextButton = screen.getByText(/next|ข้อต่อไป/i);

    // Dispatch both clicks inside a single act() so React batches them together
    // and handleNext runs twice against the same pre-update closure before any
    // re-render happens. This is what actually reproduces the original bug —
    // two sequential fireEvent.click calls each flush a render in between, so
    // the second click would never reach the handler even without the guard.
    act(() => {
      nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // If the guard failed, index would have advanced twice (skipping question 2
    // entirely) or onFinish would have fired early. With only 2 questions,
    // advancing once should land on question 2 ("い"), not finish and not crash.
    expect(screen.getByText('い')).toBeInTheDocument();
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('ignores a same-batch double-click on two different answers and only counts one', () => {
    const onFinish = vi.fn();
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={onFinish} />
      </LanguageProvider>
    );

    const correctChoice = screen.getByText('a');
    const otherChoice = screen.getByText('i');

    // Same-batch double-click on two different answer buttons: both dispatches
    // happen before any re-render, so without the guard both handleAnswer calls
    // would run against the pre-update state and the second (incorrect) answer
    // could flip the feedback/score after the first (correct) one already set it.
    act(() => {
      correctChoice.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      otherChoice.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    fireEvent.click(screen.getByText(/next|ข้อต่อไป/i));
    fireEvent.click(screen.getByText('i'));
    fireEvent.click(screen.getByText(/next|ข้อต่อไป/i));

    // Only the first (correct) answer should have counted.
    expect(onFinish).toHaveBeenCalledWith(2, 2);
  });

  it('shows the correct answer when the user answers incorrectly', () => {
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={vi.fn()} />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('i'));
    expect(screen.getByTestId('correct-answer').textContent).toContain('a');
  });

  it('does not show a redundant correct-answer line when the user answers correctly', () => {
    render(
      <LanguageProvider>
        <QuizSession questions={questions} onFinish={vi.fn()} />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('a'));
    expect(screen.queryByTestId('correct-answer')).not.toBeInTheDocument();
  });

  it('shows the explanation after answering, whether correct or incorrect', () => {
    const withExplanation: QuizQuestion[] = [
      { mode: 'multiple-choice', prompt: 'は', choices: ['wa', 'ha'], correctAnswer: 'wa', explanation: 'topic marker' },
    ];
    render(
      <LanguageProvider>
        <QuizSession questions={withExplanation} onFinish={vi.fn()} />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('wa'));
    expect(screen.getByText('topic marker')).toBeInTheDocument();
  });
});

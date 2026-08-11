'use client';

import type { MultipleChoiceQuestion as MCQuestion } from '@/lib/quiz/types';

interface MultipleChoiceQuestionProps {
  question: MCQuestion;
  disabled: boolean;
  onAnswer: (choice: string) => void;
}

export function MultipleChoiceQuestion({ question, disabled, onAnswer }: MultipleChoiceQuestionProps) {
  return (
    <div>
      <p className="mb-4 text-3xl">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.choices.map(choice => (
          <button
            key={choice}
            disabled={disabled}
            onClick={() => onAnswer(choice)}
            className="rounded border border-pink-200 px-4 py-2 text-left hover:border-pink-400 disabled:opacity-50"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

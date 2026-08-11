'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { checkAnswer } from '@/lib/quiz/answer';
import type { QuizQuestion } from '@/lib/quiz/types';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TypingQuestion } from './TypingQuestion';

interface QuizSessionProps {
  questions: QuizQuestion[];
  onFinish: (score: number, total: number) => void;
}

export function QuizSession({ questions, onFinish }: QuizSessionProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const answerLockRef = useRef(false);
  const nextLockRef = useRef(false);

  const question = questions[index];

  // Release the "Next" lock only after the new index has actually committed,
  // so a same-batch double-click can't sneak a second advance in before this
  // render is applied (see QuizSession.test.tsx for the regression test).
  useEffect(() => {
    nextLockRef.current = false;
  }, [index]);

  function handleAnswer(userInput: string) {
    if (answerLockRef.current) return;
    answerLockRef.current = true;
    const isCorrect = checkAnswer(question, userInput);
    if (isCorrect) setScore(s => s + 1);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  }

  function handleNext() {
    if (nextLockRef.current) return;
    nextLockRef.current = true;
    setFeedback(null);
    answerLockRef.current = false;
    if (index + 1 >= questions.length) {
      onFinish(score, questions.length);
    } else {
      setIndex(i => i + 1);
    }
  }

  return (
    <div>
      <p className="mb-4 text-gray-500">
        {index + 1} / {questions.length}
      </p>

      {question.mode === 'multiple-choice' ? (
        <MultipleChoiceQuestion question={question} disabled={feedback !== null} onAnswer={handleAnswer} />
      ) : (
        <TypingQuestion question={question} disabled={feedback !== null} onAnswer={handleAnswer} />
      )}

      {feedback && (
        <div className="mt-4">
          <p className={feedback === 'correct' ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>
            {feedback === 'correct' ? t.quiz.correct : t.quiz.incorrect}
          </p>
          <button onClick={handleNext} className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
            {t.quiz.next}
          </button>
        </div>
      )}
    </div>
  );
}

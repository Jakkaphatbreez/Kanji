'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { stories } from '@/data/stories';
import { speakJapanese, speakSequence, stopSpeaking } from '@/lib/speech';
import { MultipleChoiceQuestion } from '@/components/quiz/MultipleChoiceQuestion';
import type { Story } from '@/types/content';

type Stage =
  | { name: 'list' }
  | { name: 'passage'; story: Story }
  | { name: 'question'; story: Story; qIndex: number; score: number; feedback: 'correct' | 'incorrect' | null }
  | { name: 'result'; story: Story; score: number };

interface StoryPracticeProps {
  mode: 'reading' | 'listening';
}

export function StoryPractice({ mode }: StoryPracticeProps) {
  const { t, language } = useLanguage();
  const [stage, setStage] = useState<Stage>({ name: 'list' });
  const [showTranslation, setShowTranslation] = useState(mode === 'reading');

  function openStory(story: Story) {
    setShowTranslation(mode === 'reading');
    setStage({ name: 'passage', story });
  }

  function backToList() {
    stopSpeaking();
    setStage({ name: 'list' });
  }

  function startQuestions(story: Story) {
    stopSpeaking();
    setStage({ name: 'question', story, qIndex: 0, score: 0, feedback: null });
  }

  function handleAnswer(story: Story, qIndex: number, score: number, choice: string) {
    const question = story.questions[qIndex];
    const correct = choice === question.choicesJp[question.correctIndex];
    setStage({ name: 'question', story, qIndex, score: correct ? score + 1 : score, feedback: correct ? 'correct' : 'incorrect' });
  }

  function nextQuestion(story: Story, qIndex: number, score: number) {
    if (qIndex + 1 >= story.questions.length) {
      setStage({ name: 'result', story, score });
    } else {
      setStage({ name: 'question', story, qIndex: qIndex + 1, score, feedback: null });
    }
  }

  if (stage.name === 'list') {
    return (
      <div>
        {(['daily', 'tale'] as const).map(category => (
          <div key={category} className="mb-6">
            <h3 className="mb-2 font-semibold text-indigo-900">
              {category === 'daily' ? t.practice.dailyCategory : t.practice.taleCategory}
            </h3>
            <div className="flex flex-wrap gap-2">
              {stories
                .filter(s => s.category === category)
                .map(story => (
                  <button
                    key={story.id}
                    onClick={() => openStory(story)}
                    className="rounded border border-pink-200 bg-white px-3 py-2 hover:border-pink-400"
                  >
                    {story.title}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stage.name === 'passage') {
    const { story } = stage;
    return (
      <div>
        <button onClick={backToList} className="mb-3 text-sm text-pink-600 underline">
          {t.practice.backToList}
        </button>
        <h3 className="mb-3 text-lg font-semibold text-indigo-900">{story.title}</h3>

        {mode === 'listening' && (
          <button
            onClick={() => speakSequence(story.sentences.map(s => s.jp))}
            className="mb-3 rounded bg-indigo-900 px-3 py-1 text-sm text-white hover:bg-indigo-800"
          >
            🔊 {t.practice.playAll}
          </button>
        )}

        <ul className="space-y-2">
          {story.sentences.map((sentence, i) => (
            <li key={i} className="flex items-start gap-2 rounded border border-pink-100 bg-white p-2">
              {mode === 'listening' && (
                <button onClick={() => speakJapanese(sentence.jp)} title={t.practice.playAll} className="shrink-0">
                  🔊
                </button>
              )}
              <div>
                <div>{sentence.jp}</div>
                {showTranslation && <div className="text-sm text-gray-600">{language === 'th' ? sentence.th : sentence.en}</div>}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setShowTranslation(v => !v)}
            className="rounded border border-pink-300 px-3 py-1 text-sm text-indigo-900"
          >
            {showTranslation ? t.practice.hideTranslation : t.practice.showTranslation}
          </button>
          <button
            onClick={() => startQuestions(story)}
            className="rounded bg-pink-500 px-3 py-1 text-sm font-semibold text-white hover:bg-pink-600"
          >
            {t.practice.startQuestions}
          </button>
        </div>
      </div>
    );
  }

  if (stage.name === 'question') {
    const { story, qIndex, score, feedback } = stage;
    const question = story.questions[qIndex];
    const mcQuestion = {
      mode: 'multiple-choice' as const,
      prompt: question.questionJp,
      choices: question.choicesJp,
      correctAnswer: question.choicesJp[question.correctIndex],
    };
    return (
      <div>
        <p className="mb-4 text-gray-500">
          {qIndex + 1} / {story.questions.length}
        </p>
        <MultipleChoiceQuestion
          question={mcQuestion}
          disabled={feedback !== null}
          onAnswer={choice => handleAnswer(story, qIndex, score, choice)}
        />
        {feedback && (
          <div className="mt-4">
            <p className={feedback === 'correct' ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>
              {feedback === 'correct' ? t.quiz.correct : t.quiz.incorrect}
            </p>
            <p className="mt-1 text-sm text-gray-600">{language === 'th' ? question.questionTh : question.questionEn}</p>
            {feedback === 'incorrect' && (
              <p data-testid="correct-answer" className="mt-1 text-gray-700">
                {t.quiz.correctAnswerLabel}: {mcQuestion.correctAnswer}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-600">{language === 'th' ? question.explanationTh : question.explanationEn}</p>
            <button
              onClick={() => nextQuestion(story, qIndex, score)}
              className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
            >
              {t.quiz.next}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900">{t.quiz.yourScore}</h2>
      <p className="mt-2 text-4xl font-bold text-pink-600">
        {stage.score} / {stage.story.questions.length}
      </p>
      <button onClick={backToList} className="mt-4 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
        {t.practice.backToList}
      </button>
    </div>
  );
}

import { shuffle } from './shuffle';
import type { MultipleChoiceQuestion, QuizItem, QuizMode, QuizQuestion } from './types';

export interface GeneratedQuiz {
  questions: QuizQuestion[];
  requestedCount: number;
}

export function buildMultipleChoiceQuestion(item: QuizItem, allItems: QuizItem[], distractorCount = 3): MultipleChoiceQuestion {
  // Some prompts have more than one grammatically correct completion (e.g.
  // "にほんごはむずかしいです___。" is valid with either ね or よ). Any other
  // item that shares this exact blanked prompt proves its answer would also
  // be correct here, so it must never be offered as a "wrong" distractor.
  const collidingAnswers = new Set(
    allItems.filter(i => i.prompt === item.prompt && i.answer !== item.answer).map(i => i.answer)
  );
  const others = allItems.filter(i => i.id !== item.id && i.answer !== item.answer && !collidingAnswers.has(i.answer));
  const sameGroup = others.filter(i => i.group === item.group);
  const rest = others.filter(i => i.group !== item.group);

  const distractors: string[] = [];
  const seen = new Set<string>([item.answer]);

  for (const candidate of shuffle(sameGroup)) {
    if (distractors.length >= distractorCount) break;
    if (seen.has(candidate.answer)) continue;
    seen.add(candidate.answer);
    distractors.push(candidate.answer);
  }
  for (const candidate of shuffle(rest)) {
    if (distractors.length >= distractorCount) break;
    if (seen.has(candidate.answer)) continue;
    seen.add(candidate.answer);
    distractors.push(candidate.answer);
  }

  return {
    mode: 'multiple-choice',
    prompt: item.prompt,
    choices: shuffle([item.answer, ...distractors]),
    correctAnswer: item.answer,
    explanation: item.explanation,
  };
}

function buildTypingQuestion(item: QuizItem): QuizQuestion {
  return { mode: 'typing', prompt: item.prompt, correctAnswer: item.answer, explanation: item.explanation };
}

export function generateQuiz(items: QuizItem[], mode: QuizMode, requestedCount: number): GeneratedQuiz {
  const picked = shuffle(items).slice(0, Math.min(requestedCount, items.length));
  const questions = picked.map(item =>
    mode === 'multiple-choice' ? buildMultipleChoiceQuestion(item, items) : buildTypingQuestion(item)
  );
  return { questions, requestedCount };
}

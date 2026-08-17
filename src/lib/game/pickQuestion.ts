import { getQuizItems } from '@/lib/quiz/items';
import { buildMultipleChoiceQuestion } from '@/lib/quiz/generate';
import { shuffle } from '@/lib/quiz/shuffle';
import type { Language } from '@/lib/quiz/types';
import type { GameQuestion } from './types';

export function pickQuestion(language: Language, excludeIds: string[]): GameQuestion {
  const pool = getQuizItems('kanji', language);
  const available = pool.filter(item => !excludeIds.includes(item.id));
  const candidates = available.length > 0 ? available : pool;
  const [item] = shuffle(candidates);
  const built = buildMultipleChoiceQuestion(item, pool);
  return {
    id: item.id,
    prompt: built.prompt,
    choices: built.choices,
    correctAnswer: built.correctAnswer,
  };
}

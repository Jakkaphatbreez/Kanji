import { getLevelForScore } from './levels';
import { pickQuestion } from './pickQuestion';
import type { Bomb, GameState } from './types';
import type { Language } from '@/lib/quiz/types';

export type AnswerOutcome = 'correct' | 'wrong' | 'missed' | 'explosionEnd';

export interface ApplyAnswerParams {
  laneId: number;
  spawnId: number;
  outcome: AnswerOutcome;
  language: Language;
}

const MAX_HEARTS = 3;

function spawnBomb(laneId: number, spawnId: number, fallDurationMs: number, language: Language, excludeIds: string[]): Bomb {
  return {
    laneId,
    spawnId,
    question: pickQuestion(language, excludeIds),
    fallDurationMs,
    phase: 'falling',
  };
}

export function createIdleState(): GameState {
  return { status: 'idle', hearts: MAX_HEARTS, score: 0, bombs: [], nextSpawnId: 1 };
}

export function createInitialState(language: Language): GameState {
  const level = getLevelForScore(0);
  let nextSpawnId = 1;
  const bombs: Bomb[] = [];
  for (let laneId = 0; laneId < level.laneCount; laneId++) {
    const excludeIds = bombs.map(b => b.question.id);
    bombs.push(spawnBomb(laneId, nextSpawnId, level.fallDurationMs, language, excludeIds));
    nextSpawnId += 1;
  }
  return { status: 'playing', hearts: MAX_HEARTS, score: 0, bombs, nextSpawnId };
}

export function applyAnswer(state: GameState, params: ApplyAnswerParams): GameState {
  const { laneId, spawnId, outcome, language } = params;

  if (state.status !== 'playing') return state;

  const bombIndex = state.bombs.findIndex(b => b.laneId === laneId);
  if (bombIndex === -1) return state;
  const bomb = state.bombs[bombIndex];
  if (bomb.spawnId !== spawnId) return state;

  if (outcome === 'missed') {
    if (bomb.phase !== 'falling') return state;
    const hearts = state.hearts - 1;
    const bombs = state.bombs.map((b, i) => (i === bombIndex ? { ...b, phase: 'exploding' as const } : b));
    return { ...state, hearts, bombs };
  }

  if (outcome === 'explosionEnd') {
    if (bomb.phase !== 'exploding') return state;
    if (state.hearts <= 0) {
      return { ...state, status: 'gameover' };
    }
    const excludeIds = state.bombs.filter((_, i) => i !== bombIndex).map(b => b.question.id);
    const level = getLevelForScore(state.score);
    const newBomb = spawnBomb(laneId, state.nextSpawnId, level.fallDurationMs, language, excludeIds);
    const bombs = state.bombs.map((b, i) => (i === bombIndex ? newBomb : b));
    return { ...state, bombs, nextSpawnId: state.nextSpawnId + 1 };
  }

  const hearts = outcome === 'wrong' ? state.hearts - 1 : state.hearts;
  const score = outcome === 'correct' ? state.score + 1 : state.score;

  if (hearts <= 0) {
    return { ...state, hearts, score, status: 'gameover' };
  }

  const level = getLevelForScore(score);
  const excludeIdsForReplacement = state.bombs.filter((_, i) => i !== bombIndex).map(b => b.question.id);
  const replacement = spawnBomb(laneId, state.nextSpawnId, level.fallDurationMs, language, excludeIdsForReplacement);
  let bombs = state.bombs.map((b, i) => (i === bombIndex ? replacement : b));
  let nextSpawnId = state.nextSpawnId + 1;

  const existingLaneIds = new Set(bombs.map(b => b.laneId));
  for (let newLaneId = 0; newLaneId < level.laneCount; newLaneId++) {
    if (!existingLaneIds.has(newLaneId)) {
      const excludeIdsForNewLane = bombs.map(b => b.question.id);
      bombs = [...bombs, spawnBomb(newLaneId, nextSpawnId, level.fallDurationMs, language, excludeIdsForNewLane)];
      nextSpawnId += 1;
    }
  }

  return { ...state, hearts, score, bombs, nextSpawnId };
}

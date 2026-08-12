import type { Level } from './types';

export const LEVELS: Level[] = [
  { minScore: 0, fallDurationMs: 6000 },
  { minScore: 5, fallDurationMs: 5000 },
  { minScore: 10, fallDurationMs: 4500 },
  { minScore: 15, fallDurationMs: 4000 },
  { minScore: 20, fallDurationMs: 3500 },
];

export function getLevelForScore(score: number): Level {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (score >= level.minScore) {
      current = level;
    }
  }
  return current;
}

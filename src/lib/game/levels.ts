import type { Level } from './types';

export const LEVELS: Level[] = [
  { minScore: 0, laneCount: 1, fallDurationMs: 6000 },
  { minScore: 5, laneCount: 1, fallDurationMs: 5000 },
  { minScore: 10, laneCount: 2, fallDurationMs: 5000 },
  { minScore: 15, laneCount: 2, fallDurationMs: 4000 },
  { minScore: 20, laneCount: 2, fallDurationMs: 3500 },
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

import { describe, it, expect } from 'vitest';
import { getLevelForScore, LEVELS } from './levels';

describe('getLevelForScore', () => {
  it('returns level 0 for scores below the first threshold', () => {
    expect(getLevelForScore(0)).toEqual(LEVELS[0]);
    expect(getLevelForScore(4)).toEqual(LEVELS[0]);
  });

  it('returns the correct level exactly at each threshold', () => {
    expect(getLevelForScore(5)).toEqual(LEVELS[1]);
    expect(getLevelForScore(10)).toEqual(LEVELS[2]);
    expect(getLevelForScore(15)).toEqual(LEVELS[3]);
    expect(getLevelForScore(20)).toEqual(LEVELS[4]);
  });

  it('returns the level just below the next threshold', () => {
    expect(getLevelForScore(9)).toEqual(LEVELS[1]);
    expect(getLevelForScore(14)).toEqual(LEVELS[2]);
    expect(getLevelForScore(19)).toEqual(LEVELS[3]);
  });

  it('caps at the last level for scores beyond it', () => {
    expect(getLevelForScore(100)).toEqual(LEVELS[4]);
  });

  it('fall duration only decreases as score rises and never increases', () => {
    const durations = [0, 5, 10, 15, 20, 100].map(s => getLevelForScore(s).fallDurationMs);
    expect(durations).toEqual([6000, 5000, 4500, 4000, 3500, 3500]);
  });
});

import { describe, it, expect } from 'vitest';
import { applyAnswer, createIdleState, createInitialState } from './gameState';

describe('createIdleState', () => {
  it('starts idle with no active bombs', () => {
    const state = createIdleState();
    expect(state.status).toBe('idle');
    expect(state.hearts).toBe(3);
    expect(state.score).toBe(0);
    expect(state.bombs).toEqual([]);
  });
});

describe('createInitialState', () => {
  it('starts playing with 3 hearts, score 0, and 1 falling bomb (level 0)', () => {
    const state = createInitialState('en');
    expect(state.status).toBe('playing');
    expect(state.hearts).toBe(3);
    expect(state.score).toBe(0);
    expect(state.bombs).toHaveLength(1);
    expect(state.bombs[0].laneId).toBe(0);
    expect(state.bombs[0].phase).toBe('falling');
    expect(state.bombs[0].fallDurationMs).toBe(6000);
  });
});

describe('applyAnswer', () => {
  it('increments score and respawns the lane on a correct answer', () => {
    const state = createInitialState('en');
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'correct', language: 'en' });
    expect(next.score).toBe(1);
    expect(next.hearts).toBe(3);
    expect(next.bombs).toHaveLength(1);
    expect(next.bombs[0].spawnId).not.toBe(bomb.spawnId);
    expect(next.bombs[0].phase).toBe('falling');
  });

  it('decrements hearts and respawns the lane on a wrong answer', () => {
    const state = createInitialState('en');
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'wrong', language: 'en' });
    expect(next.score).toBe(0);
    expect(next.hearts).toBe(2);
    expect(next.bombs[0].spawnId).not.toBe(bomb.spawnId);
  });

  it('ends the game when a wrong answer takes hearts to 0', () => {
    const state = { ...createInitialState('en'), hearts: 1 };
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'wrong', language: 'en' });
    expect(next.hearts).toBe(0);
    expect(next.status).toBe('gameover');
  });

  it('on missed, decrements hearts and flips the bomb to exploding without respawning yet', () => {
    const state = createInitialState('en');
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'missed', language: 'en' });
    expect(next.hearts).toBe(2);
    expect(next.status).toBe('playing');
    expect(next.bombs[0].phase).toBe('exploding');
    expect(next.bombs[0].spawnId).toBe(bomb.spawnId);
  });

  it('ignores a duplicate missed event for a bomb that is already exploding', () => {
    const state = createInitialState('en');
    const bomb = state.bombs[0];
    const afterFirstMiss = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'missed', language: 'en' });
    expect(afterFirstMiss.hearts).toBe(2);
    expect(afterFirstMiss.bombs[0].phase).toBe('exploding');
    const next = applyAnswer(afterFirstMiss, { laneId: 0, spawnId: bomb.spawnId, outcome: 'missed', language: 'en' });
    expect(next.hearts).toBe(2);
    expect(next).toBe(afterFirstMiss);
  });

  it('respawns the lane on explosionEnd after a miss, if hearts remain', () => {
    let state = createInitialState('en');
    const bomb = state.bombs[0];
    state = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'missed', language: 'en' });
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'explosionEnd', language: 'en' });
    expect(next.bombs[0].phase).toBe('falling');
    expect(next.bombs[0].spawnId).not.toBe(bomb.spawnId);
    expect(next.status).toBe('playing');
  });

  it('ends the game on explosionEnd if hearts reached 0 from the miss', () => {
    let state = { ...createInitialState('en'), hearts: 1 };
    const bomb = state.bombs[0];
    state = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'missed', language: 'en' });
    expect(state.hearts).toBe(0);
    expect(state.status).toBe('playing');
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'explosionEnd', language: 'en' });
    expect(next.status).toBe('gameover');
  });

  it('ignores a stale spawnId (re-entrancy guard)', () => {
    const state = createInitialState('en');
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId - 1, outcome: 'correct', language: 'en' });
    expect(next).toBe(state);
  });

  it('ignores answers once the game is over', () => {
    const state = { ...createInitialState('en'), hearts: 0, status: 'gameover' as const };
    const bomb = state.bombs[0];
    const next = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'correct', language: 'en' });
    expect(next).toBe(state);
  });

  it('spawns a second lane once score reaches the level-2 threshold (10)', () => {
    let state = createInitialState('en');
    for (let i = 0; i < 10; i++) {
      const bomb = state.bombs[0];
      state = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'correct', language: 'en' });
    }
    expect(state.score).toBe(10);
    expect(state.bombs).toHaveLength(2);
    expect(state.bombs.map(b => b.laneId).sort()).toEqual([0, 1]);
  });

  it('never assigns the same active kanji to two simultaneous lanes', () => {
    let state = createInitialState('en');
    for (let i = 0; i < 10; i++) {
      const bomb = state.bombs[0];
      state = applyAnswer(state, { laneId: 0, spawnId: bomb.spawnId, outcome: 'correct', language: 'en' });
    }
    expect(state.bombs).toHaveLength(2);
    expect(state.bombs[0].question.id).not.toBe(state.bombs[1].question.id);
  });
});

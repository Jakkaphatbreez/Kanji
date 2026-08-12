# Kanji Bomb-Drop Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "เกม" (Game) nav item and `/game` route with an arcade mini-game: a plane drops bombs showing falling kanji, the player picks the correct translation from 4 forts before the bomb lands, difficulty ramps with score, and the player has 3 hearts.

**Architecture:** A pure, DOM-free game-logic module (`src/lib/game/`) owns all state transitions (spawning, scoring, hearts, level-driven lane counts, a spawnId-based re-entrancy guard) and is fully Vitest-tested in isolation. A thin React layer (`src/components/game/`) renders that state and drives it via CSS `@keyframes` animations + native `onAnimationEnd` events — no `requestAnimationFrame`, no canvas. The logic module reuses the existing quiz engine (`getQuizItems`, `buildMultipleChoiceQuestion`) instead of duplicating distractor-picking.

**Tech Stack:** Next.js 15 App Router (static export), TypeScript, Tailwind CSS v4 (Sakura theme), Vitest + `@testing-library/react`, React Context i18n (`useLanguage`).

## Global Constraints

- Content source for v1 is **kanji only** — `getQuizItems('kanji', language)` from `src/lib/quiz/items.ts`. No category selection.
- 4 forts per bomb: 1 correct answer + 3 distractors, built via `buildMultipleChoiceQuestion` (must be exported from `src/lib/quiz/generate.ts` — currently private).
- Start with 3 hearts (`MAX_HEARTS = 3`). A wrong fort click or a bomb reaching the ground each cost 1 heart. 0 hearts ends the game.
- Max 2 concurrent lanes. Difficulty table (exact values, do not change):
  ```ts
  const LEVELS = [
    { minScore: 0,  laneCount: 1, fallDurationMs: 6000 },
    { minScore: 5,  laneCount: 1, fallDurationMs: 5000 },
    { minScore: 10, laneCount: 2, fallDurationMs: 5000 },
    { minScore: 15, laneCount: 2, fallDurationMs: 4000 },
    { minScore: 20, laneCount: 2, fallDurationMs: 3500 },
  ];
  ```
- Rendering is CSS-animation-driven: each bomb's fall duration comes from `animation-duration`; reaching the bottom fires `onAnimationEnd`, treated as a miss. No JS position-tracking game loop.
- A ground-impact miss flips that bomb's `phase` to `'exploding'` (forts hidden, ~400ms explosion animation) before the lane respawns. A wrong/correct fort click resolves and respawns immediately — no explosion for those.
- Every state-changing event (fort click, `onAnimationEnd`) must be validated against the bomb's current `spawnId` before applying an effect — stale/duplicate events are no-ops. This is a re-entrancy guard; it must exist from the first version of `applyAnswer`, not be added later (this exact bug class was found and fixed twice already in this project's `QuizSession`).
- A kanji active in one lane is excluded when picking another lane's question, so two simultaneous lanes never show the same kanji.
- The active language is read once per spawn — an in-flight bomb's choices don't change if the player toggles language mid-fall.
- No pause/resume, no persisted state, no high scores, no `visibilitychange` handling — out of scope.
- Styling follows the existing Sakura theme: `bg-pink-500`/`hover:bg-pink-600` for primary actions, `border-pink-400`/`bg-pink-100`/`hover:bg-pink-200` for choice buttons, `text-indigo-900` for headings/body text — matching `src/components/quiz/QuizResult.tsx` and `src/components/Nav.tsx`.
- Testing is Vitest only, targeting pure logic (`src/lib/game/*.ts`) and the one component (`BombGame`) whose interaction doesn't depend on animation timing. No animation/timing tests — consistent with this project's existing testing philosophy (see `src/components/quiz/QuizSession.test.tsx` for the precedent: only the component with real state-machine logic gets a dedicated test; purely presentational pieces like `QuizResult` do not).
- Path alias `@/*` maps to `./src/*` (see `tsconfig.json`).

---

### Task 1: Export `buildMultipleChoiceQuestion` for reuse

**Files:**
- Modify: `src/lib/quiz/generate.ts`
- Test: `src/lib/quiz/generate.test.ts` (existing — verifies no regression)

**Interfaces:**
- Produces: `export function buildMultipleChoiceQuestion(item: QuizItem, allItems: QuizItem[], distractorCount = 3): MultipleChoiceQuestion` — used by Task 3's `pickQuestion`.

- [ ] **Step 1: Change the function to be exported**

In `src/lib/quiz/generate.ts`, change:

```ts
function buildMultipleChoiceQuestion(item: QuizItem, allItems: QuizItem[], distractorCount = 3): MultipleChoiceQuestion {
```

to:

```ts
export function buildMultipleChoiceQuestion(item: QuizItem, allItems: QuizItem[], distractorCount = 3): MultipleChoiceQuestion {
```

No other line in the file changes.

- [ ] **Step 2: Run the existing test suite for this file to confirm no regression**

Run: `npm test -- src/lib/quiz/generate.test.ts`
Expected: all existing tests PASS (adding `export` is additive and changes no behavior).

- [ ] **Step 3: Commit**

```bash
git add src/lib/quiz/generate.ts
git commit -m "refactor: export buildMultipleChoiceQuestion for reuse by the bomb game"
```

---

### Task 2: Game types and difficulty levels

**Files:**
- Create: `src/lib/game/types.ts`
- Create: `src/lib/game/levels.ts`
- Test: `src/lib/game/levels.test.ts`

**Interfaces:**
- Produces: `BombPhase`, `GameQuestion`, `Bomb`, `GameStatus`, `GameState`, `Level` types (Task 3, 4, 6, 7, 8 all import these). `LEVELS: Level[]` and `getLevelForScore(score: number): Level` (Task 4 uses both).

- [ ] **Step 1: Create the shared types**

Create `src/lib/game/types.ts`:

```ts
export type BombPhase = 'falling' | 'exploding';

export interface GameQuestion {
  id: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
}

export interface Bomb {
  laneId: number;
  spawnId: number;
  question: GameQuestion;
  fallDurationMs: number;
  phase: BombPhase;
}

export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface GameState {
  status: GameStatus;
  hearts: number;
  score: number;
  bombs: Bomb[];
  nextSpawnId: number;
}

export interface Level {
  minScore: number;
  laneCount: number;
  fallDurationMs: number;
}
```

- [ ] **Step 2: Write the failing test for `getLevelForScore`**

Create `src/lib/game/levels.test.ts`:

```ts
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

  it('lane count only increases at score 10 and never decreases afterward', () => {
    const laneCounts = [0, 5, 10, 15, 20, 100].map(s => getLevelForScore(s).laneCount);
    expect(laneCounts).toEqual([1, 1, 2, 2, 2, 2]);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- src/lib/game/levels.test.ts`
Expected: FAIL with "Cannot find module './levels'" (file doesn't exist yet).

- [ ] **Step 4: Implement `LEVELS` and `getLevelForScore`**

Create `src/lib/game/levels.ts`:

```ts
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/lib/game/levels.test.ts`
Expected: PASS (5/5 tests).

- [ ] **Step 6: Commit**

```bash
git add src/lib/game/types.ts src/lib/game/levels.ts src/lib/game/levels.test.ts
git commit -m "feat: add bomb-game types and difficulty level table"
```

---

### Task 3: `pickQuestion` — kanji selection with lane-exclusion

**Files:**
- Create: `src/lib/game/pickQuestion.ts`
- Test: `src/lib/game/pickQuestion.test.ts`

**Interfaces:**
- Consumes: `getQuizItems(category: QuizCategory, language: Language): QuizItem[]` from `@/lib/quiz/items`; `buildMultipleChoiceQuestion(item, allItems, distractorCount?)` from `@/lib/quiz/generate` (Task 1); `shuffle<T>(array: T[]): T[]` from `@/lib/quiz/shuffle`; `GameQuestion` from `./types` (Task 2).
- Produces: `pickQuestion(language: Language, excludeIds: string[]): GameQuestion` — used by Task 4's `spawnBomb`/`createInitialState`/`applyAnswer`.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/game/pickQuestion.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { pickQuestion } from './pickQuestion';
import { getQuizItems } from '@/lib/quiz/items';

describe('pickQuestion', () => {
  it('returns a question with 4 unique choices including the correct answer', () => {
    const question = pickQuestion('en', []);
    expect(new Set(question.choices).size).toBe(4);
    expect(question.choices).toContain(question.correctAnswer);
  });

  it('never picks a kanji whose id is in excludeIds', () => {
    const pool = getQuizItems('kanji', 'en');
    const excludeIds = pool.slice(0, pool.length - 1).map(item => item.id);
    const question = pickQuestion('en', excludeIds);
    expect(excludeIds).not.toContain(question.id);
  });

  it('falls back to the full pool if excludeIds covers every item', () => {
    const pool = getQuizItems('kanji', 'en');
    const excludeIds = pool.map(item => item.id);
    const question = pickQuestion('en', excludeIds);
    expect(question.id.length).toBeGreaterThan(0);
  });

  it('uses the active language for the correct answer', () => {
    const questionTh = pickQuestion('th', []);
    const pool = getQuizItems('kanji', 'th');
    const item = pool.find(i => i.id === questionTh.id);
    expect(questionTh.correctAnswer).toBe(item?.answer);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/game/pickQuestion.test.ts`
Expected: FAIL with "Cannot find module './pickQuestion'".

- [ ] **Step 3: Implement `pickQuestion`**

Create `src/lib/game/pickQuestion.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/game/pickQuestion.test.ts`
Expected: PASS (4/4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/game/pickQuestion.ts src/lib/game/pickQuestion.test.ts
git commit -m "feat: add pickQuestion for lane-exclusive kanji selection"
```

---

### Task 4: `gameState` — idle/initial state builders and the `applyAnswer` reducer

**Files:**
- Create: `src/lib/game/gameState.ts`
- Test: `src/lib/game/gameState.test.ts`

**Interfaces:**
- Consumes: `getLevelForScore` from `./levels` (Task 2); `pickQuestion` from `./pickQuestion` (Task 3); `Bomb`, `GameState` from `./types` (Task 2); `Language` from `@/lib/quiz/types`.
- Produces:
  - `createIdleState(): GameState` — used by Task 8's `BombGame` for the pre-start screen.
  - `createInitialState(language: Language): GameState` — used by Task 8 to start/restart the game.
  - `type AnswerOutcome = 'correct' | 'wrong' | 'missed' | 'explosionEnd'`
  - `interface ApplyAnswerParams { laneId: number; spawnId: number; outcome: AnswerOutcome; language: Language }`
  - `applyAnswer(state: GameState, params: ApplyAnswerParams): GameState` — used by Task 8 for every fort click and `onAnimationEnd`.

This is the core logic module. Design notes for the implementer:

- `outcome: 'missed'` represents the falling animation's `onAnimationEnd` firing while the bomb is still unanswered (ground impact). It costs a heart and flips `phase` to `'exploding'` — it does **not** respawn the bomb yet.
- `outcome: 'explosionEnd'` represents the explosion animation's own `onAnimationEnd`. Only meaningful when the bomb's current `phase` is `'exploding'`. If `hearts <= 0`, the game ends here (not at the `'missed'` step) — this lets the explosion visually finish before the game-over overlay appears. Otherwise, it respawns a fresh bomb in that lane.
- `outcome: 'correct'` / `'wrong'` resolve immediately (score/hearts change, replace the bomb in-place with a new one) — no explosion phase for these.
- Every call must first check `state.status === 'playing'` and that the bomb at `laneId` has `bomb.spawnId === params.spawnId`; if either check fails, return `state` unchanged (same object reference) — this is the re-entrancy guard.
- After a `'correct'` answer, recompute the level for the new score. If that level's `laneCount` is higher than the number of currently active lanes, spawn bombs for the newly available lane id(s) in the same call — using the new level's `fallDurationMs`, and excluding every kanji already active in another lane.
- `nextSpawnId` lives on `GameState` and increments by 1 each time a bomb is spawned (initial spawns, per-answer respawns, and level-driven new-lane spawns) — this keeps the reducer pure with no module-level mutable counter.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/game/gameState.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/game/gameState.test.ts`
Expected: FAIL with "Cannot find module './gameState'".

- [ ] **Step 3: Implement `gameState.ts`**

Create `src/lib/game/gameState.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/game/gameState.test.ts`
Expected: PASS (11/11 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/game/gameState.ts src/lib/game/gameState.test.ts
git commit -m "feat: add gameState reducer (applyAnswer) with spawnId re-entrancy guard"
```

---

### Task 5: i18n dictionary entries + Nav link

**Files:**
- Modify: `src/i18n/dictionaries/th.json`
- Modify: `src/i18n/dictionaries/en.json`
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Nav.test.tsx`

**Interfaces:**
- Produces: `t.nav.game: string`, `t.game.title/start/score/gameOver/finalScore/playAgain: string` — used by Task 6 (`ScoreDisplay`, `GameOverOverlay`) and Task 8 (`BombGame`).

- [ ] **Step 1: Add the `nav.game` key and `game` section to `th.json`**

In `src/i18n/dictionaries/th.json`, add `"game": "เกม"` to the existing `"nav"` object (after the last existing nav key), and add a new top-level `"game"` object (after the existing `"quiz"` object):

```json
  "game": {
    "title": "เกมทิ้งระเบิด",
    "start": "เริ่มเกม",
    "score": "คะแนน",
    "gameOver": "จบเกม",
    "finalScore": "คะแนนสุดท้าย",
    "playAgain": "เล่นอีกครั้ง"
  }
```

(Add a trailing comma after the previous top-level key's closing brace since this is not the last key, or adjust comma placement to keep the JSON valid depending on where you insert it.)

- [ ] **Step 2: Add the same keys to `en.json`, mirroring the structure exactly**

In `src/i18n/dictionaries/en.json`, add `"game": "Game"` to `"nav"`, and add:

```json
  "game": {
    "title": "Bomb Drop Game",
    "start": "Start Game",
    "score": "Score",
    "gameOver": "Game Over",
    "finalScore": "Final Score",
    "playAgain": "Play Again"
  }
```

Both files must end up with byte-for-byte identical key structures (only values differ) — `Dictionary = typeof th` depends on this.

- [ ] **Step 3: Run TypeScript check to confirm both dictionaries type-check identically**

Run: `npx tsc --noEmit`
Expected: no errors (if `en.json`'s structure diverges from `th.json`, this will fail with a type mismatch on `Dictionary`).

- [ ] **Step 4: Add the nav link**

In `src/components/Nav.tsx`, add a new `Link` after the existing quiz link:

```tsx
          <Link href="/quiz" className="hover:text-pink-600">{t.nav.quiz}</Link>
          <Link href="/game" className="hover:text-pink-600">{t.nav.game}</Link>
```

- [ ] **Step 5: Update the Nav test**

Open `src/components/Nav.test.tsx` and add an assertion for the new link alongside the existing per-link assertions (follow the exact pattern already used for the other links in that file — e.g. `expect(screen.getByText('เกม')).toBeInTheDocument();` if the file asserts against Thai default text, or the equivalent existing pattern in that file).

- [ ] **Step 6: Run the Nav test**

Run: `npm test -- src/components/Nav.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/dictionaries/th.json src/i18n/dictionaries/en.json src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: add game nav link and i18n dictionary entries"
```

---

### Task 6: Presentational components — `HeartsDisplay`, `ScoreDisplay`, `GameOverOverlay`

**Files:**
- Create: `src/components/game/HeartsDisplay.tsx`
- Create: `src/components/game/HeartsDisplay.test.tsx`
- Create: `src/components/game/ScoreDisplay.tsx`
- Create: `src/components/game/GameOverOverlay.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `@/i18n/LanguageContext` (returns `{ language, setLanguage, t }`).
- Produces: `<HeartsDisplay hearts={number} maxHearts={number} />`, `<ScoreDisplay score={number} />`, `<GameOverOverlay score={number} onPlayAgain={() => void} />` — all consumed by Task 8's `BombGame`.

`ScoreDisplay` and `GameOverOverlay` are simple presentational components with no branching logic of their own (matching this project's convention that only components with real logic, like `HeartsDisplay`'s heart-count rendering, get a dedicated test — see `QuizResult.tsx`, which has no test file, versus `QuizSession.tsx`, which does).

- [ ] **Step 1: Write the failing test for `HeartsDisplay`**

Create `src/components/game/HeartsDisplay.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeartsDisplay } from './HeartsDisplay';

describe('HeartsDisplay', () => {
  it('renders filled hearts equal to current hearts and dimmed hearts for the rest', () => {
    const { container } = render(<HeartsDisplay hearts={2} maxHearts={3} />);
    expect(container.textContent).toBe('❤️❤️🖤');
  });

  it('renders all dimmed hearts at 0', () => {
    const { container } = render(<HeartsDisplay hearts={0} maxHearts={3} />);
    expect(container.textContent).toBe('🖤🖤🖤');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/game/HeartsDisplay.test.tsx`
Expected: FAIL with "Cannot find module './HeartsDisplay'".

- [ ] **Step 3: Implement `HeartsDisplay`**

Create `src/components/game/HeartsDisplay.tsx`:

```tsx
interface HeartsDisplayProps {
  hearts: number;
  maxHearts: number;
}

export function HeartsDisplay({ hearts, maxHearts }: HeartsDisplayProps) {
  return (
    <div className="text-2xl" aria-label={`${hearts} / ${maxHearts} hearts`}>
      {Array.from({ length: maxHearts }, (_, i) => (
        <span key={i}>{i < hearts ? '❤️' : '🖤'}</span>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/game/HeartsDisplay.test.tsx`
Expected: PASS (2/2 tests).

- [ ] **Step 5: Implement `ScoreDisplay` (no dedicated test, matching `QuizResult` precedent)**

Create `src/components/game/ScoreDisplay.tsx`:

```tsx
import { useLanguage } from '@/i18n/LanguageContext';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { t } = useLanguage();
  return (
    <div className="text-lg font-semibold text-indigo-900">
      {t.game.score}: {score}
    </div>
  );
}
```

- [ ] **Step 6: Implement `GameOverOverlay` (no dedicated test, matching `QuizResult` precedent)**

Create `src/components/game/GameOverOverlay.tsx`:

```tsx
'use client';

import { useLanguage } from '@/i18n/LanguageContext';

interface GameOverOverlayProps {
  score: number;
  onPlayAgain: () => void;
}

export function GameOverOverlay({ score, onPlayAgain }: GameOverOverlayProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded border border-pink-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-indigo-900">{t.game.gameOver}</h2>
      <p className="text-lg">{t.game.finalScore}: {score}</p>
      <button onClick={onPlayAgain} className="mt-2 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
        {t.game.playAgain}
      </button>
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/game/HeartsDisplay.tsx src/components/game/HeartsDisplay.test.tsx src/components/game/ScoreDisplay.tsx src/components/game/GameOverOverlay.tsx
git commit -m "feat: add hearts/score/game-over presentational components"
```

---

### Task 7: `Lane` component + fall/explosion CSS animations

**Files:**
- Create: `src/components/game/Lane.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Bomb` type from `@/lib/game/types` (Task 2).
- Produces: `<Lane bomb={Bomb} onFortClick={(choice: string) => void} onBombLanded={() => void} onExplosionEnd={() => void} />` — used by Task 8's `BombGame`.

No dedicated test for `Lane` — it's driven by CSS `animationEnd` events which JSDOM does not fire for real CSS animations, consistent with this project's "no animation/timing tests" convention. It's covered by Task 8's manual browser verification instead.

- [ ] **Step 1: Add the fall and explosion keyframes**

In `src/app/globals.css`, add after the existing `body` rule:

```css
@keyframes bomb-fall {
  from {
    top: 0%;
  }
  to {
    top: 100%;
  }
}

@keyframes bomb-explode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
```

- [ ] **Step 2: Implement `Lane`**

Create `src/components/game/Lane.tsx`:

```tsx
'use client';

import type { Bomb } from '@/lib/game/types';

interface LaneProps {
  bomb: Bomb;
  onFortClick: (choice: string) => void;
  onBombLanded: () => void;
  onExplosionEnd: () => void;
}

export function Lane({ bomb, onFortClick, onBombLanded, onExplosionEnd }: LaneProps) {
  return (
    <div className="relative w-40">
      <div className="relative h-48 w-full overflow-hidden">
        {bomb.phase === 'falling' && (
          <div
            key={bomb.spawnId}
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{ animation: `bomb-fall ${bomb.fallDurationMs}ms linear forwards` }}
            onAnimationEnd={onBombLanded}
          >
            <div className="text-4xl">💣</div>
            <div className="text-2xl font-bold text-indigo-900">{bomb.question.prompt}</div>
          </div>
        )}
        {bomb.phase === 'exploding' && (
          <div
            key={`explosion-${bomb.spawnId}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl"
            style={{ animation: 'bomb-explode 400ms ease-out forwards' }}
            onAnimationEnd={onExplosionEnd}
          >
            💥
          </div>
        )}
      </div>
      {bomb.phase === 'falling' && (
        <div className="grid grid-cols-2 gap-2">
          {bomb.question.choices.map(choice => (
            <button
              key={choice}
              onClick={() => onFortClick(choice)}
              className="rounded border-2 border-pink-400 bg-pink-100 px-2 py-2 text-sm font-semibold text-indigo-900 hover:bg-pink-200"
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/game/Lane.tsx src/app/globals.css
git commit -m "feat: add Lane component with fall/explosion CSS animations"
```

---

### Task 8: `BombGame` orchestrator, plane animation, `/game` route

**Files:**
- Create: `src/components/game/BombGame.tsx`
- Create: `src/components/game/BombGame.test.tsx`
- Create: `src/app/game/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `createIdleState`, `createInitialState`, `applyAnswer` from `@/lib/game/gameState` (Task 4); `GameState` from `@/lib/game/types` (Task 2); `Lane` (Task 7), `HeartsDisplay`, `ScoreDisplay`, `GameOverOverlay` (Task 6); `useLanguage()` from `@/i18n/LanguageContext`.
- Produces: `<BombGame />` — rendered by the `/game` page.

- [ ] **Step 1: Add the plane's left-right CSS animation**

In `src/app/globals.css`, add after the `bomb-explode` keyframes from Task 7:

```css
@keyframes plane-fly {
  0%,
  100% {
    transform: translateX(-40%);
  }
  50% {
    transform: translateX(40%);
  }
}
```

- [ ] **Step 2: Write the failing test for `BombGame`**

Create `src/components/game/BombGame.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { BombGame } from './BombGame';

describe('BombGame', () => {
  it('starts idle, shows 4 forts once started, and resolves a fort click into a score or hearts change', () => {
    render(
      <LanguageProvider>
        <BombGame />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('เริ่มเกม'));

    const scoreBefore = screen.getByText(/คะแนน: \d+/).textContent;
    const buttons = screen.getAllByRole('button').filter(b => b.textContent !== 'เริ่มเกม');
    expect(buttons).toHaveLength(4);

    fireEvent.click(buttons[0]);

    const scoreAfter = screen.getByText(/คะแนน: \d+/).textContent;
    const heartsAfter = document.body.textContent?.match(/❤️|🖤/g)?.join('') ?? '';
    const resolvedCorrectly = scoreAfter !== scoreBefore || heartsAfter.includes('🖤');
    expect(resolvedCorrectly).toBe(true);
  });
});
```

This test avoids depending on which fort is correct (that's randomized): clicking any fort must either raise the score (correct) or dim a heart (wrong) — verifying the click → reducer → re-render wiring works end to end without asserting on random content.

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- src/components/game/BombGame.test.tsx`
Expected: FAIL with "Cannot find module './BombGame'".

- [ ] **Step 4: Implement `BombGame`**

Create `src/components/game/BombGame.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { applyAnswer, createIdleState, createInitialState } from '@/lib/game/gameState';
import { Lane } from './Lane';
import { HeartsDisplay } from './HeartsDisplay';
import { ScoreDisplay } from './ScoreDisplay';
import { GameOverOverlay } from './GameOverOverlay';

const MAX_HEARTS = 3;

export function BombGame() {
  const { t, language } = useLanguage();
  const [state, setState] = useState(createIdleState());

  function handleStart() {
    setState(createInitialState(language));
  }

  function handleFortClick(laneId: number, spawnId: number, choice: string, correctAnswer: string) {
    setState(current =>
      applyAnswer(current, {
        laneId,
        spawnId,
        outcome: choice === correctAnswer ? 'correct' : 'wrong',
        language,
      })
    );
  }

  function handleBombLanded(laneId: number, spawnId: number) {
    setState(current => applyAnswer(current, { laneId, spawnId, outcome: 'missed', language }));
  }

  function handleExplosionEnd(laneId: number, spawnId: number) {
    setState(current => applyAnswer(current, { laneId, spawnId, outcome: 'explosionEnd', language }));
  }

  if (state.status === 'idle') {
    return (
      <div>
        <h1 className="text-2xl font-bold text-indigo-900">{t.game.title}</h1>
        <button onClick={handleStart} className="mt-4 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
          {t.game.start}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.game.title}</h1>
      <div className="my-2 flex items-center justify-between">
        <HeartsDisplay hearts={state.hearts} maxHearts={MAX_HEARTS} />
        <ScoreDisplay score={state.score} />
      </div>
      <div
        className="mb-4 text-4xl"
        style={state.status === 'playing' ? { animation: 'plane-fly 3s ease-in-out infinite' } : undefined}
      >
        ✈️
      </div>
      {state.status === 'gameover' ? (
        <GameOverOverlay score={state.score} onPlayAgain={handleStart} />
      ) : (
        <div className="flex flex-wrap gap-4">
          {state.bombs.map(bomb => (
            <Lane
              key={bomb.laneId}
              bomb={bomb}
              onFortClick={choice => handleFortClick(bomb.laneId, bomb.spawnId, choice, bomb.question.correctAnswer)}
              onBombLanded={() => handleBombLanded(bomb.laneId, bomb.spawnId)}
              onExplosionEnd={() => handleExplosionEnd(bomb.laneId, bomb.spawnId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/components/game/BombGame.test.tsx`
Expected: PASS (1/1 test).

- [ ] **Step 6: Create the `/game` route**

Create `src/app/game/page.tsx`:

```tsx
import { BombGame } from '@/components/game/BombGame';

export default function GamePage() {
  return <BombGame />;
}
```

- [ ] **Step 7: Run the full test suite, type check, and build**

Run: `npm test`
Expected: all tests PASS (existing suite + every test added in Tasks 1-8).

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds, `/game` appears in the route list.

- [ ] **Step 8: Manually verify in the browser**

Start the dev server, navigate to `/game`, and check:
- The page shows the title and a "เริ่มเกม" / "Start Game" button before starting.
- Clicking start shows the plane animating left-right, 1 falling bomb with a kanji character, and 4 fort buttons beneath it.
- Clicking the correct fort increases the score and spawns a new bomb in the same lane.
- Clicking a wrong fort dims a heart and spawns a new bomb in the same lane.
- Letting a bomb reach the bottom without answering dims a heart and shows a brief explosion before the lane respawns.
- Reaching a score of 10 (by answering correctly, or by watching scores climb over a longer play session) adds a second lane with its own 4 forts, showing a different kanji than lane 0.
- Losing all 3 hearts shows the game-over overlay with the final score and a "เล่นอีกครั้ง" / "Play Again" button, which restarts the game fresh.
- Toggling the language switch changes fort text language only for future bombs (already-falling bombs keep their current text).

- [ ] **Step 9: Commit**

```bash
git add src/components/game/BombGame.tsx src/components/game/BombGame.test.tsx src/app/game/page.tsx src/app/globals.css
git commit -m "feat: add BombGame orchestrator, plane animation, and /game route"
```

---

## Self-Review Notes

- **Spec coverage:** Nav link + route (Task 5, 8); kanji-only content via existing quiz engine (Task 3, reusing Task 1's export); 4 forts / 1 correct + 3 distractors (Task 3 via `buildMultipleChoiceQuestion`); 3 hearts, wrong-click and ground-impact cost (Task 4); LEVELS table verbatim + lane-count ramp (Task 2, 4); explosion phase reserved for ground impact only (Task 4's `'missed'`/`'explosionEnd'` split, Task 7's CSS); plane left-right animation while playing (Task 8); spawnId re-entrancy guard (Task 4, tested explicitly); lane-exclusive kanji selection (Task 3, Task 4's exclude-id wiring, tested in Task 4); language read once per spawn (Task 4 takes `language` per `applyAnswer` call, only used when spawning a *new* bomb — an in-flight bomb's already-built `question` object is untouched); game-over overlay + replay (Task 6, 8); CSS-animation-driven, no rAF/canvas (Task 7, 8). All spec sections have a corresponding task.
- **Placeholder scan:** every step has complete, runnable code; no TBD/TODO; manual verification step (Task 8, Step 8) has concrete checks rather than "test thoroughly."
- **Type consistency:** `GameState`/`Bomb`/`GameQuestion`/`Level` defined once in Task 2 and reused verbatim by name in every later task; `applyAnswer`'s `ApplyAnswerParams` shape and `AnswerOutcome` union are used identically in Task 4's implementation, tests, and Task 8's `BombGame` call sites; `pickQuestion`'s signature `(language, excludeIds)` matches its Task 3 test calls and its Task 4 usage inside `spawnBomb`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-12-bomb-game-implementation.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?

# Bomb Game — Design

## Background

A new arcade-style mini-game for the Kanji N5 study app: an airplane drops
bombs, each bomb shows a falling kanji character, and the player must pick
the correct translation from four "forts" (colored buttons) before the bomb
reaches the ground. Wrong picks or bombs that land cost a heart; the player
starts with 3 hearts and the game ends at 0.

This is a brand-new feature with no equivalent in the old app (its
`index.html` was checked and has no bomb/plane/game code — only an unrelated
`飛行機`/"airplane" vocabulary entry).

## Scope (v1)

- New top-level nav item "เกม" (Game) linking to `/game`, alongside the
  existing หน้าแรก/คะนะ/คำศัพท์/คันจิ/ไวยากรณ์/แบบทดสอบ links.
- Content source: **kanji only** (the existing 112-entry `src/data/kanji.ts`
  list). Other categories (vocab, kana, particles, grammar) are explicitly
  out of scope for v1.
- 4 forts per falling bomb (1 correct translation + 3 distractors).
- Difficulty ramps with score: fall speed increases and a second concurrent
  bomb ("lane") is introduced at higher scores, capped at 2 concurrent lanes.
- 3 hearts; a wrong pick or a bomb reaching the ground each cost 1 heart;
  0 hearts ends the game with a score summary and a replay button.
- Airplane animates left-right continuously while playing.
- A bomb that reaches the ground plays a brief explosion effect before the
  lane respawns.

Explicitly out of scope for v1: category selection (vocab/kana/etc. in this
game), pause/resume, saving high scores, more than 2 concurrent lanes,
mobile-specific layout tuning beyond what the existing responsive Tailwind
layout already provides.

## Architecture

- New route `src/app/game/page.tsx` rendering `<BombGame />`.
- `src/lib/game/bombGame.ts` — pure TypeScript game logic with **no DOM or
  React dependency**, fully unit-testable:
  - `LEVELS`: an ordered list of `{ minScore, laneCount, fallDurationMs }`
    thresholds.
  - `getLevelForScore(score: number)`: returns the active level for a score.
  - `pickQuestion(pool: QuizItem[], excludeIds: string[], mode: QuizMode)`:
    picks a kanji not already active in another lane and builds its 4
    choices.
  - `applyAnswer(state: GameState, laneId: number, outcome: 'correct' |
    'wrong' | 'missed'): GameState`: pure reducer for every state
    transition (score/hearts changes, lane respawn, level-driven lane
    count changes, game-over detection).
- Reuses the existing quiz engine rather than duplicating distractor logic:
  `getQuizItems('kanji', language)` from `src/lib/quiz/items.ts` supplies
  the kanji+translation pool, and `buildMultipleChoiceQuestion` (currently
  private to `src/lib/quiz/generate.ts`) is exported and reused to build
  each bomb's 4 choices — the same tested dedup/same-group-preferred
  distractor logic the quiz already relies on.
- Rendering is CSS-animation-driven, not a JS game loop: each bomb is a
  `<div>` with a CSS `@keyframes` fall animation whose `animation-duration`
  comes from the current level's `fallDurationMs`. Reaching the bottom
  fires the browser's native `onAnimationEnd`, which the component treats
  as a miss — no `requestAnimationFrame` position tracking needed.

**Trade-off accepted:** this rules out mid-flight speed changes or a pause
feature (out of scope per above), in exchange for much simpler code than a
manual game loop.

## Data Model

```ts
interface GameQuestion {
  id: string;
  prompt: string;       // the kanji character
  choices: string[];    // 4 translations, 1 correct + 3 distractors
  correctAnswer: string;
}

type BombPhase = 'falling' | 'exploding';

interface Bomb {
  laneId: number;
  spawnId: number;       // increments each time a new bomb spawns in this lane
  question: GameQuestion;
  fallDurationMs: number;
  phase: BombPhase;
}

interface GameState {
  status: 'idle' | 'playing' | 'gameover';
  hearts: number;         // starts at 3
  score: number;
  bombs: Bomb[];           // one entry per active lane
}
```

### Difficulty levels

```ts
const LEVELS = [
  { minScore: 0,  laneCount: 1, fallDurationMs: 6000 },
  { minScore: 5,  laneCount: 1, fallDurationMs: 5000 },
  { minScore: 10, laneCount: 2, fallDurationMs: 5000 },
  { minScore: 15, laneCount: 2, fallDurationMs: 4000 },
  { minScore: 20, laneCount: 2, fallDurationMs: 3500 }, // cap, does not increase further
];
```

`getLevelForScore` returns the highest-threshold level whose `minScore <=
score`. When the level's `laneCount` increases (crossing a threshold that
also raises lane count), `applyAnswer` spawns a new bomb in the newly
available lane(s) immediately rather than waiting for the player's next
action.

Two concurrent lanes is the cap — with 4 forts per lane, 2 lanes already
means 8 buttons on screen at once; more would crowd the layout for no
added learning value.

## Components

- `BombGame.tsx` — owns `GameState` via `useState`, wires `applyAnswer`
  reducer calls to fort clicks and bomb `onAnimationEnd` events, renders
  the plane, all active lanes, hearts/score, and the game-over overlay.
- `Lane.tsx` — renders one lane: the falling/exploding bomb visual and,
  while `phase === 'falling'`, the 4 fort buttons beneath it. Forts are
  hidden during the `'exploding'` phase (the bomb has already been
  resolved as a miss; there's nothing left to answer).
- `HeartsDisplay.tsx` — renders `❤️` × current hearts (and `🖤`/dimmed for
  lost hearts, so the max of 3 stays visible as a frame of reference).
- `ScoreDisplay.tsx` — current score.
- `GameOverOverlay.tsx` — final score + "เล่นอีกครั้ง" button, styled like
  the existing `QuizResult` component.

Visuals are emoji-based (✈️ plane, 💣 bomb, 💥 explosion, ❤️ hearts) styled
with the app's existing Sakura Tailwind theme for fort buttons — no image
assets needed, consistent with the rest of the static-export app.

## Game Mechanics

**Per-bomb resolution** (all three outcomes funnel through the same
`applyAnswer` reducer, called with a different `outcome` argument):

- **Correct fort clicked** while `phase === 'falling'` → `score += 1`,
  remove the bomb, spawn a new one in the same lane immediately (no
  explosion — that effect is reserved for ground impact, per the request).
- **Wrong fort clicked** while `phase === 'falling'` → `hearts -= 1`,
  remove the bomb, spawn a new one in the same lane immediately.
- **Bomb reaches the ground** (`onAnimationEnd` on the falling animation,
  bomb still unanswered) → `hearts -= 1` immediately, and the bomb's
  `phase` flips to `'exploding'` (a ~400ms CSS explosion animation plays at
  the lane's ground position; the lane's forts are hidden during this
  phase since the bomb is already resolved). When the explosion animation's
  own `onAnimationEnd` fires, the bomb is removed and a new one spawns in
  that lane, `phase` back to `'falling'`.
- **Hearts reach 0** (from either a wrong click or a ground impact) →
  `status` becomes `'gameover'`. If hearts hit 0 via a ground impact, the
  explosion still plays out before the game-over overlay appears (the
  transition to `'gameover'` happens on the explosion's `animationEnd`,
  same as a normal respawn — it just doesn't spawn a new bomb).

**Re-entrancy guard:** every apply-outcome call (fort click or
`animationEnd`) is checked against the bomb's current `spawnId` for that
lane before applying an effect. If the lane's bomb has already been
resolved (e.g. a rapid double-click, or a click that lands in the same
tick as `animationEnd` firing) the second call is a no-op. This mirrors the
same-batch double-click bug class found and fixed in the quiz's
`QuizSession` earlier in this project — guarding against it from the start
here avoids repeating that two-round fix cycle.

**Airplane:** animates left-right continuously via a separate CSS
`@keyframes` (`translateX` oscillating) whenever `status === 'playing'`;
stops animating once `status === 'gameover'`.

## Error Handling & Edge Cases

- A kanji currently active in one lane is excluded when picking the next
  lane's question, so the two simultaneous lanes (at higher levels) never
  show the same kanji at once.
- The active language (Thai/English) is read fresh only when a bomb
  spawns — an in-flight bomb's choices don't change if the player toggles
  language mid-fall, avoiding the answer set shifting under the player.
- Navigating away from `/game` unmounts the component; game state is not
  persisted — returning to the page always starts fresh.
- No pause-on-tab-hidden handling (`visibilitychange`) — out of scope for
  this lightweight casual game.

## Testing

- **Vitest**, targeting the pure logic in `src/lib/game/bombGame.ts`
  (no animation/timing tests, consistent with this project's existing
  testing philosophy):
  - `getLevelForScore`: correct level returned at and around every
    threshold (0, 4, 5, 9, 10, 14, 15, 19, 20, and above).
  - `pickQuestion`: never returns a kanji whose id is in `excludeIds`;
    returns exactly 4 unique choices including the correct answer.
  - `applyAnswer`: covers all three outcomes (`correct`/`wrong`/`missed`)
    — score/heart deltas, lane respawn with a new `spawnId`, lane-count
    increase spawning new lanes exactly at a level threshold, and
    hearts-reaches-0 transitioning `status` to `'gameover'` for each
    outcome type.
  - Re-entrancy: calling `applyAnswer` twice with the same stale `spawnId`
    only applies the effect once.

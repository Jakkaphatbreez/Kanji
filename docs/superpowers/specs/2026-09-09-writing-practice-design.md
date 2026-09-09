# Kana & Kanji Writing Practice — Design

## Background

A new study mode for the Kanji N5 app: the user picks a hiragana, katakana,
or kanji character and watches its correct stroke order drawn as an
animation (play/replay), covering the full existing character set — all 73
hiragana entries, all 73 katakana entries (`src/data/hiragana.ts` /
`katakana.ts`, both include dakuten/handakuten variants), and all 113 kanji
(`src/data/kanji.ts`).

Animation-only (no interactive tracing/drawing canvas) — confirmed as v1
scope. Stroke order is sourced from real reference data
([KanjiVG](https://github.com/KanjiVG/kanjivg), CC BY-SA 3.0), not
hand-authored, since incorrect stroke order would actively teach the wrong
habit.

## Scope (v1)

- New top-level nav item ("เขียน"/"Write") linking to `/write`.
- Covers all three existing character sets (hiragana, katakana, kanji) —
  no subset/MVP restriction; the data pipeline handles them uniformly.
- Per-character animated stroke-order playback with play/replay and a
  slow/normal speed toggle.
- Character picker: tabs (Hiragana / Katakana / Kanji) + search, reusing
  each dataset's existing fields (romaji for kana, on/kun/meaning for
  kanji) as the searchable/displayed text.
- KanjiVG attribution shown on the page (license requirement).

Explicitly out of scope for v1: interactive tracing/handwriting input,
stroke-accuracy scoring, audio, mobile-specific layout beyond the existing
responsive Tailwind conventions, and any characters outside the three
existing datasets (e.g. no expansion to N4+ kanji as part of this feature).

## Architecture

### Stroke data pipeline (build-time, not runtime)

The app is a static export (see `AGENTS.md`/`wrangler.jsonc` — deployed as
static assets, no server functions), so stroke data cannot be fetched from
GitHub at request time. Instead:

- `scripts/fetch-kanjivg.mjs` — a standalone Node script (not part of
  `next build`), run manually and re-run whenever the character lists
  change:
  1. Imports `hiragana`, `katakana`, `kanji` from `src/data/`, collects the
     unique set of characters.
  2. For each character, computes its Unicode codepoint and fetches
     `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/{codepoint.toLowerCase().padStart(5,'0')}.svg`.
  3. Extracts every `<path ... d="...">` value in document order. KanjiVG
     nests strokes inside per-radical `<g>` groups (verified against 語:
     radical groups `言`/`吾` etc.), but path elements always appear in
     document order matching their `-sN` stroke-number suffix — so a
     document-order extraction (no need to parse the group hierarchy) is
     sufficient and correct.
  4. Writes `src/data/strokes.ts` exporting
     `strokeData: Record<string, string[]>` (character → ordered stroke
     `d` strings) plus `STROKE_VIEWBOX = '0 0 109 109'` (constant across
     all KanjiVG files).
  5. Logs and skips (does not fail) any character whose fetch 404s;
     `strokeData` simply omits that key.
- `src/data/strokes.ts` is a generated but **committed** file — production
  never fetches from GitHub.

### Rendering

- `StrokeOrderAnimation` (`src/components/write/StrokeOrderAnimation.tsx`)
  — presentational, knows nothing about characters/routing/i18n:
  - Props: `strokes: string[]`, `speed: 'slow' | 'normal'`,
    `playToken: number` (bumping this prop replays the animation — see
    below).
  - Renders an SVG (`viewBox="0 0 109 109"`) with a faint gray "ghost"
    copy of every stroke drawn at full opacity-reduced stroke behind the
    animated layer, so the target shape is always visible.
  - On mount/`strokes` change/`playToken` change, for each stroke path in
    order: read `path.getTotalLength()`, set
    `strokeDasharray = length`, `strokeDashoffset = length`, then on the
    next frame set `strokeDashoffset = 0` with a CSS
    `transition: stroke-dashoffset` — the standard SVG "draw-on" technique.
    Strokes animate sequentially (each starts after the previous stroke's
    transition duration + a short pause), driven by `setTimeout` chaining
    cleaned up on unmount/re-trigger.
  - Duration per stroke: fixed per speed setting (e.g. ~500ms
    normal / ~900ms slow), not proportional to path length — simpler and
    visually consistent across strokes of very different lengths.
- `CharacterGrid` (`src/components/write/CharacterGrid.tsx`) — a small,
  new picker component (distinct from `DataTable`, which is table/column
  oriented): search input + wrapping grid of character buttons. Generic
  over `{ char: string; searchText: string }[]` so it works for kana and
  kanji alike.

### Page

`src/app/write/page.tsx` (`'use client'`, following the existing
kana/kanji page pattern):

- Tab state: `'hiragana' | 'katakana' | 'kanji'`, mirroring
  `src/app/kana/page.tsx`'s tab pattern.
- Selected-character state, defaulting to the first character of the
  active tab's list on mount and on tab change.
- Layout: `CharacterGrid` for the active tab's list on one side/above,
  and a detail panel with `StrokeOrderAnimation`, the selected character
  large, its romaji (kana) or on/kun/meaning (kanji, language-aware via
  `useLanguage()` same as the existing kanji page), a stroke-count label,
  Play/Replay button (increments `playToken`), and a slow/normal toggle.
- If `strokeData[char]` is missing, the detail panel shows the character
  statically with a "no animation available for this character" message
  instead of rendering `StrokeOrderAnimation`.
- KanjiVG attribution line at the bottom of the page.

### Nav & i18n

- `src/components/Nav.tsx`: add a `/write` link using a new
  `t.nav.write` key, positioned after "Kanji" and before "Grammar" (kana
  → kanji → write practice → grammar reads as a natural learning-order
  grouping).
- `src/i18n/dictionaries/en.json` and `th.json`: add a `write` key
  (`title`, `hiragana`, `katakana`, `kanji` tab labels, `searchPlaceholder`,
  `play`, `replay`, `slow`, `normal`, `strokeCountLabel`, `noAnimation`,
  `attribution`) plus `nav.write`, following the existing flat-dictionary
  structure (both files must stay key-for-key identical, matching how
  `LanguageContext.tsx` derives its `Dictionary` type from `th.json`).

## Data Model

```ts
// src/data/strokes.ts (generated)
export const STROKE_VIEWBOX = '0 0 109 109';
export const strokeData: Record<string, string[]>; // char -> ordered stroke `d` attributes
```

```ts
// StrokeOrderAnimation props
interface StrokeOrderAnimationProps {
  strokes: string[];
  speed: 'slow' | 'normal';
  playToken: number; // increment to replay
}
```

```ts
// CharacterGrid props
interface CharacterGridItem {
  char: string;
  searchText: string; // e.g. "あ a" or "語 ご かたる language"
}
interface CharacterGridProps {
  items: CharacterGridItem[];
  selected: string;
  onSelect: (char: string) => void;
  searchPlaceholder: string;
}
```

## Error Handling & Edge Cases

- Missing stroke data for a character (fetch 404'd or character not in
  KanjiVG) → detail panel falls back to a static display + message, never
  crashes.
- Switching tabs or selecting a new character while a stroke animation is
  mid-playback → pending `setTimeout` chain from the previous character is
  cleared before starting the new one (effect cleanup keyed on
  `strokes`/`playToken`), preventing stale timers from drawing strokes
  onto the wrong character.
- `fetch-kanjivg.mjs` failures (network error, single-character 404) don't
  abort the whole run — the script finishes and reports a summary of
  skipped characters so gaps are visible without blocking the other ~250+
  successful fetches.

## Testing

- **Vitest**, consistent with this project's existing testing philosophy
  (pure logic over timing/animation):
  - `fetch-kanjivg.mjs`'s SVG-parsing function (extracted as a pure
    function taking an SVG string and returning `string[]`), tested
    against fixture SVG snippets: single flat `<path>` list (kana-style),
    nested `<g>` radical groups (kanji-style, e.g. a 語-shaped fixture),
    and a malformed/empty input.
  - `StrokeOrderAnimation`'s stroke-sequencing logic covered at the level
    of "given N strokes, effect schedules N timeouts and cleans them up
    on unmount" rather than asserting on real animation timing.
  - `CharacterGrid`: filtering by `searchText` substring match, selection
    callback firing with the right `char`.
- No test coverage for the generated `src/data/strokes.ts` content itself
  (it's fetched reference data, not logic).

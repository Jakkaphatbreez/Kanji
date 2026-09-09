# Kana & Kanji Writing Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/write` page where the user picks a hiragana, katakana, or kanji character and watches its real stroke order animate (play/replay), covering every character already in `src/data/hiragana.ts`, `katakana.ts`, and `kanji.ts`.

**Architecture:** A one-time dev script fetches real stroke-order SVG paths from the KanjiVG open dataset (keyed by Unicode codepoint) and bakes them into a committed `src/data/strokes.ts` file — the static-exported app never fetches from GitHub at runtime. A presentational `StrokeOrderAnimation` component reveals each stroke's SVG path in order using the standard `stroke-dasharray`/`stroke-dashoffset` "draw-on" technique. A `CharacterGrid` picker plus tab state on the new page ties it all together.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`, client components — this project has no server components anywhere), React 19, TypeScript, Tailwind v4, Vitest + Testing Library. Node 20 (no TypeScript execution outside the Next.js toolchain — the fetch script is plain `.mjs` and reads the `.ts` data files as text, it does not `import` them).

**Spec:** `docs/superpowers/specs/2026-09-09-writing-practice-design.md`

## Global Constraints

- Static export only (`next.config.ts` has `output: 'export'`) — no runtime network calls; all stroke data must be committed, not fetched on demand.
- No new npm dependencies — Node 20's built-in `fetch` covers the data pipeline; the animation uses plain SVG/DOM APIs, no charting/drawing library.
- `scripts/fetch-kanjivg.mjs` cannot `import` the `.ts` data files (Node 20 has no stable TypeScript loader) — it must read them as text and regex-extract the character literals.
- `src/i18n/dictionaries/en.json` and `th.json` must stay key-for-key identical (`LanguageContext.tsx` derives its `Dictionary` type from `th.json`; a key present in one but not the other is a type/runtime mismatch).
- Follow existing conventions: co-located `X.test.ts(x)` files, Tailwind pink/indigo "sakura" theme classes (see `src/components/DataTable.tsx`, `src/app/kana/page.tsx`), `'use client'` on every interactive component/page (this codebase has no server components).
- Animation-only in v1 — no drawing/tracing input, no stroke-accuracy scoring (per spec's explicit non-goals).

---

### Task 1: Stroke-data parsing pure functions

**Files:**
- Create: `scripts/kanjivg-parser.mjs`
- Test: `scripts/kanjivg-parser.test.mjs`

**Interfaces:**
- Produces: `extractCharsFromSource(sourceText: string, fieldName: string): string[]` — pulls every `fieldName: '...'` string literal out of a data file's source text, in file order.
- Produces: `extractStrokePaths(svgText: string): string[]` — pulls every `<path ... d="...">`'s `d` value out of a KanjiVG SVG string, in document order (which is stroke order).

- [ ] **Step 1: Write the failing tests**

```js
// scripts/kanjivg-parser.test.mjs
import { describe, it, expect } from 'vitest';
import { extractCharsFromSource, extractStrokePaths } from './kanjivg-parser.mjs';

describe('extractCharsFromSource', () => {
  it('extracts every value of the given field, in order', () => {
    const source = `
      export const hiragana = [
        { char: 'あ', romaji: 'a', group: 'a' },
        { char: 'い', romaji: 'i', group: 'a' },
      ];
    `;
    expect(extractCharsFromSource(source, 'char')).toEqual(['あ', 'い']);
  });

  it('only matches the exact field name, not a substring of another field', () => {
    const source = `{ kanji: '語', on: 'ご', kun: 'かたる' }`;
    expect(extractCharsFromSource(source, 'kanji')).toEqual(['語']);
  });

  it('returns an empty array when the field is not present', () => {
    expect(extractCharsFromSource('export const x = 1;', 'char')).toEqual([]);
  });
});

describe('extractStrokePaths', () => {
  it('extracts d attributes from a flat list of paths (kana-style)', () => {
    const svg = `
      <g id="kvg:StrokePaths_03042">
        <g id="kvg:03042" kvg:element="あ">
          <path id="kvg:03042-s1" d="M31.01,33c0.88,0.88"/>
          <path id="kvg:03042-s2" d="M49.76,17.62c0.88,1"/>
        </g>
      </g>
    `;
    expect(extractStrokePaths(svg)).toEqual(['M31.01,33c0.88,0.88', 'M49.76,17.62c0.88,1']);
  });

  it('extracts d attributes across nested radical groups in document order (kanji-style)', () => {
    const svg = `
      <g id="kvg:08a9e">
        <g id="kvg:08a9e-g1" kvg:element="言">
          <path id="kvg:08a9e-s1" kvg:type="㇔" d="M26,15.25c2.82,1.41"/>
          <g id="kvg:08a9e-g2" kvg:element="口">
            <path id="kvg:08a9e-s2" kvg:type="㇑" d="M17.14,71.9c0.63,0.62"/>
          </g>
        </g>
        <g id="kvg:08a9e-g3" kvg:element="吾">
          <path id="kvg:08a9e-s3" d="M51.79,17.49c1.38,0.26"/>
        </g>
      </g>
    `;
    expect(extractStrokePaths(svg)).toEqual([
      'M26,15.25c2.82,1.41',
      'M17.14,71.9c0.63,0.62',
      'M51.79,17.49c1.38,0.26',
    ]);
  });

  it('returns an empty array for malformed or empty input', () => {
    expect(extractStrokePaths('')).toEqual([]);
    expect(extractStrokePaths('<svg><g></g></svg>')).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run scripts/kanjivg-parser.test.mjs`
Expected: FAIL — `Cannot find module './kanjivg-parser.mjs'` (file doesn't exist yet).

- [ ] **Step 3: Write the minimal implementation**

```js
// scripts/kanjivg-parser.mjs

export function extractCharsFromSource(sourceText, fieldName) {
  const regex = new RegExp(`\\b${fieldName}:\\s*'([^']*)'`, 'g');
  const chars = [];
  let match;
  while ((match = regex.exec(sourceText)) !== null) {
    chars.push(match[1]);
  }
  return chars;
}

export function extractStrokePaths(svgText) {
  const pathTags = svgText.match(/<path\b[^>]*>/g) ?? [];
  const paths = [];
  for (const tag of pathTags) {
    const match = tag.match(/\sd="([^"]*)"/);
    if (match) paths.push(match[1]);
  }
  return paths;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run scripts/kanjivg-parser.test.mjs`
Expected: PASS (7 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/kanjivg-parser.mjs scripts/kanjivg-parser.test.mjs
git commit -m "feat: add pure parsing functions for KanjiVG stroke data extraction"
```

---

### Task 2: Fetch script — generate `src/data/strokes.ts` from KanjiVG

**Files:**
- Create: `scripts/fetch-kanjivg.mjs`
- Create: `src/data/strokes.ts` (generated by running the script — not hand-written)
- Modify: `package.json` (add a `fetch:strokes` script entry)

**Interfaces:**
- Consumes: `extractCharsFromSource`, `extractStrokePaths` from `./kanjivg-parser.mjs` (Task 1).
- Produces: `src/data/strokes.ts` exporting `STROKE_VIEWBOX: string` and `strokeData: Record<string, string[]>`, consumed by the UI components in Tasks 3, 4, and 7.

This task's script does network I/O and file writing — per this project's testing philosophy (see `docs/superpowers/specs/2026-08-12-bomb-game-design.md`'s "no animation/timing tests" precedent), it is not unit tested. It is verified by actually running it and inspecting the output.

- [ ] **Step 1: Write the script**

```js
// scripts/fetch-kanjivg.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractCharsFromSource, extractStrokePaths } from './kanjivg-parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const CONCURRENCY = 8;

function readChars(relativePath, fieldName) {
  const source = readFileSync(path.join(root, relativePath), 'utf-8');
  return extractCharsFromSource(source, fieldName);
}

async function fetchStrokesForChar(char) {
  const hex = char.codePointAt(0).toString(16).padStart(5, '0');
  const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const svg = await res.text();
    const strokes = extractStrokePaths(svg);
    return strokes.length > 0 ? strokes : null;
  } catch {
    return null;
  }
}

async function run() {
  const hiraganaChars = readChars('src/data/hiragana.ts', 'char');
  const katakanaChars = readChars('src/data/katakana.ts', 'char');
  const kanjiChars = readChars('src/data/kanji.ts', 'kanji');
  const chars = [...new Set([...hiraganaChars, ...katakanaChars, ...kanjiChars])];

  const strokeData = {};
  const skipped = [];

  for (let i = 0; i < chars.length; i += CONCURRENCY) {
    const batch = chars.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async char => [char, await fetchStrokesForChar(char)]));
    for (const [char, strokes] of results) {
      if (strokes) strokeData[char] = strokes;
      else skipped.push(char);
    }
    console.log(`Fetched ${Math.min(i + CONCURRENCY, chars.length)}/${chars.length}`);
  }

  const output = `// Generated by scripts/fetch-kanjivg.mjs — do not edit by hand.
// Stroke data (c) KanjiVG project (https://kanjivg.tagaini.net), CC BY-SA 3.0.

export const STROKE_VIEWBOX = '0 0 109 109';

export const strokeData: Record<string, string[]> = ${JSON.stringify(strokeData, null, 2)};
`;

  writeFileSync(path.join(root, 'src/data/strokes.ts'), output);
  console.log(`Wrote strokes for ${Object.keys(strokeData).length}/${chars.length} characters.`);
  if (skipped.length > 0) {
    console.log(`Skipped (no KanjiVG data found): ${skipped.join(' ')}`);
  }
}

run();
```

- [ ] **Step 2: Add a package.json script entry**

In `package.json`, add to `"scripts"`:

```json
"fetch:strokes": "node scripts/fetch-kanjivg.mjs"
```

- [ ] **Step 3: Run the script for real**

Run: `npm run fetch:strokes`
Expected: Progress lines printing `Fetched N/M`, finishing with `Wrote strokes for <count>/<total> characters.` This takes a few minutes (network-bound); give it a generous timeout (10+ minutes) or run it in the background and poll for completion.

- [ ] **Step 4: Spot-check the generated file**

`src/data/strokes.ts` is TypeScript, so spot-check it with `grep` rather than trying to `node -e` import it directly:

```bash
grep -o '"あ": \[' src/data/strokes.ts
grep -o '"語": \[' src/data/strokes.ts
wc -l src/data/strokes.ts
```

Expected: both `あ` and `語` keys are present, and the file has a substantial number of lines (hundreds to low thousands, one line per stroke path roughly). If the "Skipped" log line listed more than a handful of characters, open `src/data/strokes.ts` and confirm the missing characters are genuinely obscure/uncommon — a large skip count for common hiragana/katakana would indicate a bug in the codepoint calculation, not a real KanjiVG gap.

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch-kanjivg.mjs package.json src/data/strokes.ts
git commit -m "feat: fetch and bake KanjiVG stroke-order data into src/data/strokes.ts"
```

---

### Task 3: `StrokeOrderAnimation` component

**Files:**
- Create: `src/components/write/StrokeOrderAnimation.tsx`
- Test: `src/components/write/StrokeOrderAnimation.test.tsx`

**Interfaces:**
- Consumes: `STROKE_VIEWBOX` from `src/data/strokes.ts` (Task 2). The caller in Task 7 supplies `strokes` from `strokeData`, also in `src/data/strokes.ts`.
- Produces: `StrokeOrderAnimation({ strokes: string[], speed: 'slow' | 'normal', playToken: number })` — a React component, consumed by Task 7's page.

**Important jsdom gotcha:** jsdom does not implement `SVGPathElement.prototype.getTotalLength` — calling it throws/logs "not implemented". Tests must stub it before rendering.

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/write/StrokeOrderAnimation.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { StrokeOrderAnimation } from './StrokeOrderAnimation';

const STROKES = ['M0,0 L1,1', 'M1,1 L2,2', 'M2,2 L3,3'];

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom does not implement getTotalLength; stub it so the draw-on effect can run.
  SVGPathElement.prototype.getTotalLength = () => 100;
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('StrokeOrderAnimation', () => {
  it('renders one animated path per stroke', () => {
    const { container } = render(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={0} />);
    const animatedGroup = container.querySelectorAll('svg > g')[1];
    expect(animatedGroup.querySelectorAll('path')).toHaveLength(STROKES.length);
  });

  it('reveals strokes one at a time as fake timers advance', () => {
    const { container } = render(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={0} />);
    const animatedPaths = container.querySelectorAll('svg > g')[1].querySelectorAll('path');

    vi.advanceTimersByTime(0);
    expect(animatedPaths[0].style.strokeDashoffset).toBe('0');
    expect(animatedPaths[1].style.strokeDashoffset).toBe('100');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('100');

    vi.advanceTimersByTime(650);
    expect(animatedPaths[1].style.strokeDashoffset).toBe('0');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('100');

    vi.advanceTimersByTime(650);
    expect(animatedPaths[2].style.strokeDashoffset).toBe('0');
  });

  it('clears all pending timeouts on unmount', () => {
    const clearSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={0} />);
    unmount();
    expect(clearSpy).toHaveBeenCalledTimes(STROKES.length);
  });

  it('restarts the animation from the beginning when playToken changes', () => {
    const { container, rerender } = render(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={0} />);
    vi.advanceTimersByTime(10000);
    const animatedPaths = container.querySelectorAll('svg > g')[1].querySelectorAll('path');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('0');

    rerender(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={1} />);
    expect(animatedPaths[0].style.strokeDashoffset).toBe('100');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('100');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/write/StrokeOrderAnimation.test.tsx`
Expected: FAIL — module `./StrokeOrderAnimation` not found.

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/components/write/StrokeOrderAnimation.tsx
'use client';

import { useEffect, useRef } from 'react';
import { STROKE_VIEWBOX } from '@/data/strokes';

const DURATION_MS: Record<'slow' | 'normal', number> = { slow: 900, normal: 500 };
const PAUSE_MS = 150;

interface StrokeOrderAnimationProps {
  strokes: string[];
  speed: 'slow' | 'normal';
  playToken: number;
}

export function StrokeOrderAnimation({ strokes, speed, playToken }: StrokeOrderAnimationProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const duration = DURATION_MS[speed];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    pathRefs.current.forEach(pathEl => {
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      pathEl.style.transition = 'none';
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = `${length}`;
    });

    strokes.forEach((_, index) => {
      const timeout = setTimeout(() => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;
        pathEl.style.transition = `stroke-dashoffset ${duration}ms linear`;
        pathEl.style.strokeDashoffset = '0';
      }, index * (duration + PAUSE_MS));
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [strokes, speed, playToken]);

  return (
    <svg viewBox={STROKE_VIEWBOX} className="h-64 w-64 bg-white" role="img" aria-label="stroke order animation">
      <g stroke="#f9c9d9" strokeWidth={0.5}>
        <line x1="0" y1="54.5" x2="109" y2="54.5" />
        <line x1="54.5" y1="0" x2="54.5" y2="109" />
      </g>
      <g fill="none" stroke="#e5e7eb" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => (
          <path key={`ghost-${index}`} d={d} />
        ))}
      </g>
      <g fill="none" stroke="#4338ca" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => (
          <path
            key={`stroke-${index}`}
            d={d}
            ref={el => {
              pathRefs.current[index] = el;
            }}
          />
        ))}
      </g>
    </svg>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/write/StrokeOrderAnimation.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/write/StrokeOrderAnimation.tsx src/components/write/StrokeOrderAnimation.test.tsx
git commit -m "feat: add StrokeOrderAnimation component with draw-on stroke reveal"
```

---

### Task 4: `CharacterGrid` component

**Files:**
- Create: `src/components/write/CharacterGrid.tsx`
- Test: `src/components/write/CharacterGrid.test.tsx`

**Interfaces:**
- Produces: `CharacterGrid({ items: { char: string; searchText: string }[], selected: string, onSelect: (char: string) => void, searchPlaceholder: string })`, consumed by Task 7's page.

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/write/CharacterGrid.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterGrid } from './CharacterGrid';

const ITEMS = [
  { char: 'あ', searchText: 'あ a' },
  { char: 'い', searchText: 'い i' },
];

describe('CharacterGrid', () => {
  it('renders a button for every item by default', () => {
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={() => {}} searchPlaceholder="Search..." />);
    expect(screen.getByRole('button', { name: 'あ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'い' })).toBeInTheDocument();
  });

  it('filters by search text, case-insensitively', () => {
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={() => {}} searchPlaceholder="Search..." />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'I' } });
    expect(screen.queryByRole('button', { name: 'あ' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'い' })).toBeInTheDocument();
  });

  it('calls onSelect with the clicked character', () => {
    const onSelect = vi.fn();
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={onSelect} searchPlaceholder="Search..." />);
    fireEvent.click(screen.getByRole('button', { name: 'い' }));
    expect(onSelect).toHaveBeenCalledWith('い');
  });

  it('visually distinguishes the selected character', () => {
    render(<CharacterGrid items={ITEMS} selected="い" onSelect={() => {}} searchPlaceholder="Search..." />);
    expect(screen.getByRole('button', { name: 'い' }).className).toContain('border-pink-500');
    expect(screen.getByRole('button', { name: 'あ' }).className).not.toContain('border-pink-500');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/write/CharacterGrid.test.tsx`
Expected: FAIL — module `./CharacterGrid` not found.

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/components/write/CharacterGrid.tsx
'use client';

import { useState } from 'react';

interface CharacterGridItem {
  char: string;
  searchText: string;
}

interface CharacterGridProps {
  items: CharacterGridItem[];
  selected: string;
  onSelect: (char: string) => void;
  searchPlaceholder: string;
}

export function CharacterGrid({ items, selected, onSelect, searchPlaceholder }: CharacterGridProps) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(item => item.searchText.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="mb-4 w-full rounded border border-pink-300 bg-white px-3 py-2 focus:border-pink-500 focus:outline-none"
      />
      <div className="flex max-h-96 flex-wrap gap-2 overflow-y-auto">
        {filtered.map(item => (
          <button
            key={item.char}
            onClick={() => onSelect(item.char)}
            className={
              item.char === selected
                ? 'h-12 w-12 rounded border-2 border-pink-500 bg-pink-100 text-xl font-bold text-indigo-900'
                : 'h-12 w-12 rounded border border-pink-200 bg-white text-xl text-indigo-900 hover:border-pink-400'
            }
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/write/CharacterGrid.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/write/CharacterGrid.tsx src/components/write/CharacterGrid.test.tsx
git commit -m "feat: add CharacterGrid character picker component"
```

---

### Task 5: i18n dictionary entries

**Files:**
- Modify: `src/i18n/dictionaries/en.json`
- Modify: `src/i18n/dictionaries/th.json`

**Interfaces:**
- Produces: `t.nav.write: string` and `t.write.{title,hiragana,katakana,kanji,searchPlaceholder,play,replay,slow,normal,strokeLabel,noAnimation,attribution}: string`, consumed by Task 6 (Nav) and Task 7 (page).

No test file — these are data-only JSON edits, verified by the components/pages that consume them in later tasks (and by `LanguageContext.test.tsx`, which already exercises the dictionaries and will fail to type-check if the two files diverge).

- [ ] **Step 1: Add the `write` section and `nav.write` key to `en.json`**

In `src/i18n/dictionaries/en.json`, add `"write": "Write"` to the `"nav"` object (after `"kanji"`), and add a new top-level `"write"` object (e.g. after the `"kanji"` section):

```json
"write": {
  "title": "Writing Practice",
  "hiragana": "Hiragana",
  "katakana": "Katakana",
  "kanji": "Kanji",
  "searchPlaceholder": "Search characters...",
  "play": "Play",
  "replay": "Replay",
  "slow": "Slow",
  "normal": "Normal",
  "strokeLabel": "Strokes",
  "noAnimation": "No stroke animation available for this character yet.",
  "attribution": "Stroke order data from the KanjiVG project (CC BY-SA 3.0)."
}
```

- [ ] **Step 2: Add the matching Thai section to `th.json`**

In `src/i18n/dictionaries/th.json`, add `"write": "เขียน"` to the `"nav"` object (after `"kanji"`), and the matching top-level `"write"` object:

```json
"write": {
  "title": "ฝึกเขียน",
  "hiragana": "ฮิรางานะ",
  "katakana": "คาตากานะ",
  "kanji": "คันจิ",
  "searchPlaceholder": "ค้นหาตัวอักษร...",
  "play": "เล่นอนิเมชัน",
  "replay": "เล่นซ้ำ",
  "slow": "ช้า",
  "normal": "ปกติ",
  "strokeLabel": "จำนวนขีด",
  "noAnimation": "ยังไม่มีข้อมูลอนิเมชันสำหรับตัวอักษรนี้",
  "attribution": "ข้อมูลลำดับขีดจากโปรเจกต์ KanjiVG (CC BY-SA 3.0)"
}
```

- [ ] **Step 3: Verify the existing i18n test suite still passes**

Run: `npx vitest run src/i18n/LanguageContext.test.tsx`
Expected: PASS (2 tests) — confirms the JSON is still valid and the app still builds the `Dictionary` type correctly.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/dictionaries/en.json src/i18n/dictionaries/th.json
git commit -m "feat: add i18n strings for the writing practice page"
```

---

### Task 6: Nav link

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: `t.nav.write` (Task 5).

- [ ] **Step 1: Update the failing test first**

In `src/components/Nav.test.tsx`, add this line right after the existing `expect(screen.getByText('คันจิ')).toBeInTheDocument();` line:

```tsx
expect(screen.getByText('เขียน')).toBeInTheDocument();
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Nav.test.tsx`
Expected: FAIL — `เขียน` not found in the document.

- [ ] **Step 3: Add the link**

In `src/components/Nav.tsx`, add a new `Link` right after the Kanji link and before the Grammar link:

```tsx
<Link href="/kanji" className="hover:text-pink-600">
  {t.nav.kanji}
</Link>
<Link href="/write" className="hover:text-pink-600">
  {t.nav.write}
</Link>
<Link href="/grammar" className="hover:text-pink-600">
  {t.nav.grammar}
</Link>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Nav.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: add Write nav link"
```

---

### Task 7: `/write` page

**Files:**
- Create: `src/app/write/page.tsx`

**Interfaces:**
- Consumes: `hiragana` (`src/data/hiragana.ts`), `katakana` (`src/data/katakana.ts`), `kanji` (`src/data/kanji.ts`), `strokeData` (`src/data/strokes.ts`, Task 2), `CharacterGrid` (Task 4), `StrokeOrderAnimation` (Task 3), `useLanguage` (`src/i18n/LanguageContext.tsx`), `t.write.*` and `t.kanji.{onColumn,kunColumn,meaningColumn}` (Task 5 + existing).

No dedicated test file — this project has no tests for any `src/app/**/page.tsx` file (verified: `find src/app -iname '*.test.tsx'` returns nothing); page-level behavior is covered by the component tests in Tasks 3–4 plus manual verification below.

- [ ] **Step 1: Write the page**

```tsx
// src/app/write/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CharacterGrid } from '@/components/write/CharacterGrid';
import { StrokeOrderAnimation } from '@/components/write/StrokeOrderAnimation';
import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';
import { kanji } from '@/data/kanji';
import { strokeData } from '@/data/strokes';

type Tab = 'hiragana' | 'katakana' | 'kanji';

function firstCharFor(tab: Tab): string {
  if (tab === 'hiragana') return hiragana[0]?.char ?? '';
  if (tab === 'katakana') return katakana[0]?.char ?? '';
  return kanji[0]?.kanji ?? '';
}

export default function WritePage() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<Tab>('hiragana');
  const [selected, setSelected] = useState<string>(() => firstCharFor('hiragana'));
  const [speed, setSpeed] = useState<'slow' | 'normal'>('normal');
  const [playToken, setPlayToken] = useState(0);

  function selectTab(next: Tab) {
    setTab(next);
    setSelected(firstCharFor(next));
    setPlayToken(0);
  }

  const items = useMemo(() => {
    if (tab === 'hiragana') return hiragana.map(e => ({ char: e.char, searchText: `${e.char} ${e.romaji}` }));
    if (tab === 'katakana') return katakana.map(e => ({ char: e.char, searchText: `${e.char} ${e.romaji}` }));
    return kanji.map(e => ({
      char: e.kanji,
      searchText: `${e.kanji} ${e.on} ${e.kun} ${e.meaningTh} ${e.meaningEn}`,
    }));
  }, [tab]);

  const strokes = strokeData[selected];
  const kanaEntry = tab !== 'kanji' ? (tab === 'hiragana' ? hiragana : katakana).find(e => e.char === selected) : undefined;
  const kanjiEntry = tab === 'kanji' ? kanji.find(k => k.kanji === selected) : undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.write.title}</h1>
      <div className="my-4 flex gap-2">
        <button
          onClick={() => selectTab('hiragana')}
          className={tab === 'hiragana' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.hiragana}
        </button>
        <button
          onClick={() => selectTab('katakana')}
          className={tab === 'katakana' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.katakana}
        </button>
        <button
          onClick={() => selectTab('kanji')}
          className={tab === 'kanji' ? 'font-bold text-pink-600 underline' : 'text-gray-500'}
        >
          {t.write.kanji}
        </button>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <CharacterGrid
            items={items}
            selected={selected}
            onSelect={char => {
              setSelected(char);
              setPlayToken(0);
            }}
            searchPlaceholder={t.write.searchPlaceholder}
          />
        </div>
        <div className="flex flex-col items-center gap-3 md:w-1/2">
          {strokes ? (
            <>
              <StrokeOrderAnimation strokes={strokes} speed={speed} playToken={playToken} />
              <p className="text-sm text-gray-600">
                {t.write.strokeLabel}: {strokes.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayToken(p => p + 1)}
                  className="rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
                >
                  {playToken === 0 ? t.write.play : t.write.replay}
                </button>
                <button
                  onClick={() => setSpeed('slow')}
                  className={
                    speed === 'slow'
                      ? 'rounded bg-indigo-900 px-3 py-2 text-white'
                      : 'rounded border border-pink-300 px-3 py-2 text-indigo-900'
                  }
                >
                  {t.write.slow}
                </button>
                <button
                  onClick={() => setSpeed('normal')}
                  className={
                    speed === 'normal'
                      ? 'rounded bg-indigo-900 px-3 py-2 text-white'
                      : 'rounded border border-pink-300 px-3 py-2 text-indigo-900'
                  }
                >
                  {t.write.normal}
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">{t.write.noAnimation}</p>
          )}
          {kanaEntry && <p className="text-lg text-indigo-900">{kanaEntry.romaji}</p>}
          {kanjiEntry && (
            <p className="text-center text-sm text-indigo-900">
              {t.kanji.onColumn}: {kanjiEntry.on} / {t.kanji.kunColumn}: {kanjiEntry.kun}
              <br />
              {t.kanji.meaningColumn}: {language === 'th' ? kanjiEntry.meaningTh : kanjiEntry.meaningEn}
            </p>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400">{t.write.attribution}</p>
    </div>
  );
}
```

- [ ] **Step 2: Manually verify in the dev server**

Run: `npm run dev`, open `http://localhost:3000/write`.

Check:
- Hiragana tab is selected by default, grid shows all hiragana, first character (あ) is selected and animates on load... actually it does **not** auto-play (per spec, animation only starts on Play click) — confirm the animation area shows the static ghost only until "Play" is clicked, then strokes draw in order.
- Click "Replay" — animation restarts from stroke 1.
- Click "Slow" — replay again, strokes draw more slowly.
- Switch to Katakana and Kanji tabs — grid content changes, a character auto-selects, its reading/meaning shows correctly (romaji for kana, on/kun/meaning for kanji, respecting the language toggle in the nav).
- Type in the search box — grid filters live.
- If any character shows "No stroke animation available..." instead of an animation, confirm that character was in the `skipped` list logged by Task 2's fetch run (i.e. it's a real KanjiVG gap, not a bug).

- [ ] **Step 3: Commit**

```bash
git add src/app/write/page.tsx
git commit -m "feat: add /write page for kana and kanji writing practice"
```

---

### Task 8: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests pass, including the new ones from Tasks 1, 3, 4, 5, 6.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. Pay particular attention to `src/data/strokes.ts` (generated file) and `src/app/write/page.tsx` — a mismatch between `KanaEntry`/`KanjiEntry` field names and the page's usage would surface here.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: build succeeds and emits the static `out/write/` route, consistent with the other static routes (`out/kana/`, `out/kanji/`, etc.).

- [ ] **Step 5: Fix and re-verify if anything failed**

If any of the above fail, fix the issue in the relevant task's files, re-run that specific check, then re-run the full sequence (Steps 1–4) once more before proceeding.

No commit for this task unless Step 5 required fixes — in that case, commit the fix with a message describing what was wrong (e.g. `fix: correct strokeData import in write page`).

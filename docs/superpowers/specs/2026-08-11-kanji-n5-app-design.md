# Kanji N5 Learning App — Design

## Background

Existing app was deployed directly from the Cloudflare dashboard with no
separate source repository. Rebuilding it as a Next.js project tracked in
GitHub (`Jakkaphatbreez/Kanji`), deployed to Cloudflare Pages as a new,
separate project. The old dashboard-deployed site stays live, unchanged,
until the new site is ready to cut over.

Content is being recreated from scratch (not migrated from the old site).

## Scope (v1)

- Hiragana / Katakana reference tables
- N5 vocabulary reference table
- Particles and basic grammar reference
- Quiz covering all of the above, with a choice of multiple-choice or
  typing mode
- Thai / English UI toggle

Explicitly out of scope for v1: database, user accounts, progress
tracking/SRS, content editing UI. These can be added later without a
rewrite (see Architecture trade-offs).

## Architecture & Tech Stack

- Next.js 15 (App Router) + TypeScript
- `output: 'export'` — fully static export, deployed as a static site on
  Cloudflare Pages (no Workers/Functions, no `next-on-pages` adapter)
- Tailwind CSS for styling
- No backend, no API routes, no database — everything runs client-side
  after build
- Repo `Jakkaphatbreez/Kanji` connected to a Cloudflare Pages project;
  push to `main` triggers auto-deploy

**Trade-off accepted:** if a database/auth is added later (e.g. progress
tracking), the project moves to Cloudflare Pages Functions with the
`next-on-pages` adapter at that point. Static export was chosen because
v1 has no server-side requirement at all — adding the adapter now would be
unused complexity.

## Data Model

Content lives in `src/data/` as typed TypeScript modules (no fetching,
bundled at build time):

- `hiragana.ts`, `katakana.ts` — `{ char, romaji, group }[]`, grouped by
  row (あ/か/さ/...)
- `vocab-n5.ts` — `{ jp, kana, romaji, meaningTh, meaningEn, category }[]`
- `particles.ts` — `{ particle, usageTh, usageEn, example: { jp, th, en } }[]`
- `grammar.ts` — `{ pattern, meaningTh, meaningEn, example: { jp, th, en } }[]`

Content translations (Thai/English meanings) are stored as sibling fields
on each data entry — they are content, not UI copy. UI copy (buttons,
labels, headings) lives separately in `th.json` / `en.json` dictionaries.

The quiz reads directly from these same datasets; there is no separate
quiz-only dataset.

## Pages & Components

No i18n routing (no `/en`, `/th` paths). Language is a client-side
`LanguageContext` persisted to `localStorage`; toggling it re-renders text
in place.

**Pages (App Router):**
- `/` — home, navigation to each section
- `/kana` — hiragana/katakana tables (tab switch)
- `/vocab` — N5 vocab table (search/filter by category)
- `/grammar` — particles + grammar patterns (reference, tab switch)
- `/quiz` — pick category (kana/vocab/particle/grammar) + mode
  (multiple-choice/typing) → quiz session → results

**Components:**
- `LanguageToggle`
- `DataTable` (reusable search/filter table, shared by kana/vocab pages)
- `QuizSetup`, `QuizSession`, `MultipleChoiceQuestion`, `TypingQuestion`,
  `QuizResult`

**Quiz mechanics:**
- Each session draws N random questions (e.g. 10) from the selected
  dataset, shuffled
- Multiple choice: 1 correct answer + 3 distractors from the same
  dataset, preferring the same category
- Typing:
  - kana → type the romaji
  - vocab → type the meaning (in the active UI language) or romaji
  - particle/grammar → fill-in-the-blank: type the missing
    particle/pattern in the given example sentence (typing a full
    grammar explanation isn't practical, so this mode uses the example
    sentence instead)

## Error Handling & Edge Cases

- If a chosen quiz category has fewer entries than the requested question
  count, reduce the question count to what's available and show a small
  notice — not an error
- Distractors must not duplicate the correct answer; prefer same-category
  entries, falling back to the full dataset if a category is too small to
  supply enough distractors
- Typing answers are trimmed and compared case-insensitively (romaji)
- No network calls anywhere in the app (fully static) — no API
  loading/error states to handle

## Testing

- **Vitest** for unit tests:
  - Data integrity: every entry has required fields populated
    (e.g. `meaningTh`/`meaningEn` non-empty), no duplicate keys
  - Quiz logic: distractor generation never duplicates the correct
    answer, scoring is correct, typing-answer comparison is
    trim/case-insensitive
- No E2E tests for v1 — scope is small with no auth or complex flows;
  can be added later if needed

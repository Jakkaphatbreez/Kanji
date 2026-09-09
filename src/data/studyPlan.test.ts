import { describe, it, expect } from 'vitest';
import { studyPlan } from './studyPlan';

const VALID_HREFS = ['/', '/kana', '/vocab', '/kanji', '/write', '/grammar', '/quiz', '/game'];
const VALID_CATEGORIES = ['hiragana', 'katakana', 'vocab', 'kanji', 'particle', 'grammar'];
const VALID_MODES = ['multiple-choice', 'typing'];

describe('study plan data', () => {
  it('has 5 months, numbered 1 through 5 in order', () => {
    expect(studyPlan.map(m => m.month)).toEqual([1, 2, 3, 4, 5]);
  });

  it('every month has non-empty bilingual titles/summaries and at least one week', () => {
    for (const month of studyPlan) {
      expect(month.titleTh.length).toBeGreaterThan(0);
      expect(month.titleEn.length).toBeGreaterThan(0);
      expect(month.summaryTh.length).toBeGreaterThan(0);
      expect(month.summaryEn.length).toBeGreaterThan(0);
      expect(month.weeks.length).toBeGreaterThan(0);
    }
  });

  it('every week has non-empty bilingual labels/goals and at least one task', () => {
    for (const month of studyPlan) {
      for (const week of month.weeks) {
        expect(week.weekLabelTh.length).toBeGreaterThan(0);
        expect(week.weekLabelEn.length).toBeGreaterThan(0);
        expect(week.goalTh.length).toBeGreaterThan(0);
        expect(week.goalEn.length).toBeGreaterThan(0);
        expect(week.tasks.length).toBeGreaterThan(0);
      }
    }
  });

  it('every task has non-empty bilingual labels, and any href points to a real site route', () => {
    for (const month of studyPlan) {
      for (const week of month.weeks) {
        for (const task of week.tasks) {
          expect(task.labelTh.length).toBeGreaterThan(0);
          expect(task.labelEn.length).toBeGreaterThan(0);
          if (task.href !== undefined) {
            expect(VALID_HREFS).toContain(task.href);
          }
        }
      }
    }
  });

  it('every week exercise (when present) uses a real quiz category and a valid mode', () => {
    for (const month of studyPlan) {
      for (const week of month.weeks) {
        if (week.exercise) {
          expect(VALID_CATEGORIES).toContain(week.exercise.category);
          expect(VALID_MODES).toContain(week.exercise.mode);
        }
      }
    }
  });

  it('has exactly 20 weeks total (4 per month)', () => {
    const totalWeeks = studyPlan.reduce((sum, m) => sum + m.weeks.length, 0);
    expect(totalWeeks).toBe(20);
  });
});

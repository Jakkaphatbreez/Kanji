import { describe, it, expect } from 'vitest';
import { stories } from './stories';

const VALID_CATEGORIES = ['tale', 'daily'];

describe('stories data', () => {
  it('has 20 entries', () => {
    expect(stories).toHaveLength(20);
  });

  it('has 10 tales and 10 daily-life stories', () => {
    expect(stories.filter(s => s.category === 'tale')).toHaveLength(10);
    expect(stories.filter(s => s.category === 'daily')).toHaveLength(10);
  });

  it('every story has a non-empty title, a valid category, and at least 5 sentences', () => {
    for (const story of stories) {
      expect(story.title.length).toBeGreaterThan(0);
      expect(VALID_CATEGORIES).toContain(story.category);
      expect(story.sentences.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('every sentence has non-empty jp/th/en text', () => {
    for (const story of stories) {
      for (const sentence of story.sentences) {
        expect(sentence.jp.length).toBeGreaterThan(0);
        expect(sentence.th.length).toBeGreaterThan(0);
        expect(sentence.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('every story has at least 1 question with 4 choices and a valid correctIndex', () => {
    for (const story of stories) {
      expect(story.questions.length).toBeGreaterThanOrEqual(1);
      for (const question of story.questions) {
        expect(question.questionJp.length).toBeGreaterThan(0);
        expect(question.choicesJp).toHaveLength(4);
        for (const choice of question.choicesJp) {
          expect(choice.length).toBeGreaterThan(0);
        }
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('every question has a non-empty bilingual translation and explanation', () => {
    for (const story of stories) {
      for (const question of story.questions) {
        expect(question.questionTh.length).toBeGreaterThan(0);
        expect(question.questionEn.length).toBeGreaterThan(0);
        expect(question.explanationTh.length).toBeGreaterThan(0);
        expect(question.explanationEn.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate story ids or titles', () => {
    const ids = stories.map(s => s.id);
    const titles = stories.map(s => s.title);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

import { describe, it, expect } from 'vitest';
import { conjugationGroups } from './conjugation';

const VALID_GROUP_IDS = ['group1', 'group2', 'group3', 'iAdjective', 'naAdjective', 'copula'];

describe('conjugation data', () => {
  it('has one entry for each expected group, in order', () => {
    expect(conjugationGroups.map(g => g.groupId)).toEqual(VALID_GROUP_IDS);
  });

  it('every group has non-empty titles and rule explanations in both languages', () => {
    for (const group of conjugationGroups) {
      expect(group.titleTh.length).toBeGreaterThan(0);
      expect(group.titleEn.length).toBeGreaterThan(0);
      expect(group.ruleTh.length).toBeGreaterThan(0);
      expect(group.ruleEn.length).toBeGreaterThan(0);
    }
  });

  it('every group has at least 2 example words', () => {
    for (const group of conjugationGroups) {
      expect(group.examples.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('every example has a form for every formId declared by its group, in the same order', () => {
    for (const group of conjugationGroups) {
      for (const example of group.examples) {
        expect(example.forms.map(f => f.formId)).toEqual(group.formIds);
      }
    }
  });

  it('every form value and every meaning is non-empty', () => {
    for (const group of conjugationGroups) {
      for (const example of group.examples) {
        expect(example.word.length).toBeGreaterThan(0);
        expect(example.meaningTh.length).toBeGreaterThan(0);
        expect(example.meaningEn.length).toBeGreaterThan(0);
        for (const form of example.forms) {
          expect(form.value.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('has no duplicate example words within a group', () => {
    for (const group of conjugationGroups) {
      const words = group.examples.map(e => e.word);
      expect(new Set(words).size).toBe(words.length);
    }
  });
});

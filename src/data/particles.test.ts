import { describe, it, expect } from 'vitest';
import { particles } from './particles';

describe('particles data', () => {
  it('has 18 entries', () => {
    expect(particles).toHaveLength(18);
  });

  it('every entry has non-empty usage text and at least one example that contains the particle', () => {
    for (const entry of particles) {
      expect(entry.usageTh.length).toBeGreaterThan(0);
      expect(entry.usageEn.length).toBeGreaterThan(0);
      expect(entry.examples.length).toBeGreaterThan(0);
      for (const example of entry.examples) {
        expect(example.jp).toContain(entry.particle);
        expect(example.th.length).toBeGreaterThan(0);
        expect(example.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate example sentences within a particle', () => {
    for (const entry of particles) {
      const sentences = entry.examples.map(e => e.jp);
      expect(new Set(sentences).size).toBe(sentences.length);
    }
  });

  it('has no duplicate particles', () => {
    const values = particles.map(e => e.particle);
    expect(new Set(values).size).toBe(values.length);
  });
});

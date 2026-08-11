import { describe, it, expect } from 'vitest';
import { particles } from './particles';

describe('particles data', () => {
  it('has 8 entries', () => {
    expect(particles).toHaveLength(8);
  });

  it('every entry has non-empty usage text and an example that contains the particle', () => {
    for (const entry of particles) {
      expect(entry.usageTh.length).toBeGreaterThan(0);
      expect(entry.usageEn.length).toBeGreaterThan(0);
      expect(entry.example.jp).toContain(entry.particle);
      expect(entry.example.th.length).toBeGreaterThan(0);
      expect(entry.example.en.length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate particles', () => {
    const values = particles.map(e => e.particle);
    expect(new Set(values).size).toBe(values.length);
  });
});

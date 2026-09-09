import { describe, it, expect } from 'vitest';
import { splitIntoSpeechSegments } from './speech';

describe('splitIntoSpeechSegments', () => {
  it('returns a single segment for text with no reading-pause comma', () => {
    expect(splitIntoSpeechSegments('わたしはがくせいです。')).toEqual(['わたしはがくせいです。']);
  });

  it('splits on the Japanese reading-pause comma into trimmed segments', () => {
    expect(splitIntoSpeechSegments('たべる、たべます')).toEqual(['たべる', 'たべます']);
  });

  it('drops empty segments produced by a trailing comma', () => {
    expect(splitIntoSpeechSegments('たべる、')).toEqual(['たべる']);
  });

  it('returns an empty array for empty input', () => {
    expect(splitIntoSpeechSegments('')).toEqual([]);
  });
});

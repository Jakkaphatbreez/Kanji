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

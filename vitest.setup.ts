import '@testing-library/jest-dom/vitest';

// jsdom (as of v29) does not implement SVGPathElement (or the SVGGraphicsElement
// chain) — <path> elements created via document.createElementNS resolve to plain
// SVGElement instances, and the global SVGPathElement is undefined. Alias it to
// SVGElement so tests can do `SVGPathElement.prototype.getTotalLength = ...` and
// have the stub land on the same prototype real <path> elements use.
if (typeof globalThis.SVGPathElement === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).SVGPathElement = globalThis.SVGElement;
}

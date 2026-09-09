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
    const animatedGroup = container.querySelectorAll('svg > g')[2];
    expect(animatedGroup.querySelectorAll('path')).toHaveLength(STROKES.length);
  });

  it('reveals strokes one at a time as fake timers advance', () => {
    const { container } = render(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={0} />);
    const animatedPaths = container.querySelectorAll('svg > g')[2].querySelectorAll('path');

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
    const animatedPaths = container.querySelectorAll('svg > g')[2].querySelectorAll('path');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('0');

    rerender(<StrokeOrderAnimation strokes={STROKES} speed="normal" playToken={1} />);
    expect(animatedPaths[0].style.strokeDashoffset).toBe('100');
    expect(animatedPaths[2].style.strokeDashoffset).toBe('100');
  });
});

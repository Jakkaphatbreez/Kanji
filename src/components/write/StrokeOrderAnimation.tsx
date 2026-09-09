'use client';

import { useEffect, useRef } from 'react';
import { STROKE_VIEWBOX } from '@/data/strokes';

const DURATION_MS: Record<'slow' | 'normal', number> = { slow: 900, normal: 500 };
const PAUSE_MS = 150;

interface StrokeOrderAnimationProps {
  strokes: string[];
  speed: 'slow' | 'normal';
  playToken: number;
}

export function StrokeOrderAnimation({ strokes, speed, playToken }: StrokeOrderAnimationProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const duration = DURATION_MS[speed];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    pathRefs.current.forEach(pathEl => {
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      pathEl.style.transition = 'none';
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = `${length}`;
    });

    strokes.forEach((_, index) => {
      const timeout = setTimeout(() => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;
        pathEl.style.transition = `stroke-dashoffset ${duration}ms linear`;
        pathEl.style.strokeDashoffset = '0';
      }, index * (duration + PAUSE_MS));
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [strokes, speed, playToken]);

  return (
    <svg viewBox={STROKE_VIEWBOX} className="h-64 w-64 bg-white" role="img" aria-label="stroke order animation">
      <g stroke="#f9c9d9" strokeWidth={0.5}>
        <line x1="0" y1="54.5" x2="109" y2="54.5" />
        <line x1="54.5" y1="0" x2="54.5" y2="109" />
      </g>
      <g fill="none" stroke="#e5e7eb" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => (
          <path key={`ghost-${index}`} d={d} />
        ))}
      </g>
      <g fill="none" stroke="#4338ca" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => (
          <path
            key={`stroke-${index}`}
            d={d}
            ref={el => {
              pathRefs.current[index] = el;
            }}
          />
        ))}
      </g>
    </svg>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { shuffle } from '@/lib/quiz/shuffle';
import type { SentenceOrderingItem } from '@/types/content';

interface PoolSegment {
  key: number;
  text: string;
}

interface SentenceOrderExerciseProps {
  item: SentenceOrderingItem;
  checkLabel: string;
  onResult: (correct: boolean) => void;
}

export function SentenceOrderExercise({ item, checkLabel, onResult }: SentenceOrderExerciseProps) {
  const initialPool = useMemo(
    () => shuffle(item.segments.map((text, key) => ({ key, text }))),
    [item]
  );
  const [pool, setPool] = useState<PoolSegment[]>(initialPool);
  const [built, setBuilt] = useState<PoolSegment[]>([]);
  const [checked, setChecked] = useState(false);

  function moveToBuilt(segment: PoolSegment) {
    if (checked) return;
    setPool(prev => prev.filter(s => s.key !== segment.key));
    setBuilt(prev => [...prev, segment]);
  }

  function moveToPool(segment: PoolSegment) {
    if (checked) return;
    setBuilt(prev => prev.filter(s => s.key !== segment.key));
    setPool(prev => [...prev, segment]);
  }

  function handleCheck() {
    const correct = built.map(s => s.text).join('') === item.segments.join('');
    setChecked(true);
    onResult(correct);
  }

  return (
    <div>
      <div
        data-testid="built-sentence"
        className="mb-3 min-h-12 rounded border border-pink-300 bg-white p-2 text-lg"
      >
        {built.map((segment, i) => (
          <button
            key={segment.key}
            data-testid={`built-segment-${i}`}
            onClick={() => moveToPool(segment)}
            disabled={checked}
            className="mr-1 mb-1 rounded border border-indigo-300 bg-indigo-50 px-2 py-1 disabled:opacity-70"
          >
            {segment.text}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {pool.map(segment => (
          <button
            key={segment.key}
            onClick={() => moveToBuilt(segment)}
            disabled={checked}
            className="rounded border border-pink-200 bg-white px-3 py-1 hover:border-pink-400 disabled:opacity-50"
          >
            {segment.text}
          </button>
        ))}
      </div>

      {pool.length === 0 && !checked && (
        <button
          onClick={handleCheck}
          className="mt-3 rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
        >
          {checkLabel}
        </button>
      )}
    </div>
  );
}

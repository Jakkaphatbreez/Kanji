'use client';

import type { Bomb } from '@/lib/game/types';

interface LaneProps {
  bomb: Bomb;
  onFortClick: (choice: string) => void;
  onBombLanded: () => void;
  onExplosionEnd: () => void;
}

export function Lane({ bomb, onFortClick, onBombLanded, onExplosionEnd }: LaneProps) {
  return (
    <div className="relative w-40">
      <div className="relative h-48 w-full overflow-hidden">
        {bomb.phase === 'falling' && (
          <div
            key={bomb.spawnId}
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{ animation: `bomb-fall ${bomb.fallDurationMs}ms linear forwards` }}
            onAnimationEnd={onBombLanded}
          >
            <div className="text-4xl">💣</div>
            <div className="text-2xl font-bold text-indigo-900">{bomb.question.prompt}</div>
          </div>
        )}
        {bomb.phase === 'exploding' && (
          <div
            key={`explosion-${bomb.spawnId}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl"
            style={{ animation: 'bomb-explode 400ms ease-out forwards' }}
            onAnimationEnd={onExplosionEnd}
          >
            💥
          </div>
        )}
      </div>
      {bomb.phase === 'falling' && (
        <div className="grid grid-cols-2 gap-2">
          {bomb.question.choices.map(choice => (
            <button
              key={choice}
              onClick={() => onFortClick(choice)}
              className="rounded border-2 border-pink-400 bg-pink-100 px-2 py-2 text-sm font-semibold text-indigo-900 hover:bg-pink-200"
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

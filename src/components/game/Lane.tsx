'use client';

import type { Bomb } from '@/lib/game/types';
import { BombIcon } from './BombIcon';
import { WarPlane } from './WarPlane';

interface LaneProps {
  bomb: Bomb;
  isPlaying: boolean;
  onFortClick: (choice: string) => void;
  onBombLanded: () => void;
  onExplosionEnd: () => void;
}

export function Lane({ bomb, isPlaying, onFortClick, onBombLanded, onExplosionEnd }: LaneProps) {
  return (
    <div className="relative w-64">
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="absolute top-0 left-0 inline-block"
          style={isPlaying ? { animation: 'plane-fly 6s linear infinite' } : undefined}
        >
          <WarPlane className="block h-auto w-24" />
        </div>
        {bomb.phase === 'falling' && (
          <div
            key={bomb.spawnId}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ animation: `bomb-fall ${bomb.fallDurationMs}ms linear forwards` }}
            onAnimationEnd={onBombLanded}
          >
            <BombIcon label={bomb.question.prompt} />
          </div>
        )}
        {bomb.phase === 'exploding' && (
          <div
            key={`explosion-${bomb.spawnId}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl"
            style={{ animation: 'bomb-explode 400ms ease-out forwards' }}
            onAnimationEnd={onExplosionEnd}
          >
            💥
          </div>
        )}
      </div>
      {bomb.phase === 'falling' && (
        <div className="grid grid-cols-2 gap-3">
          {bomb.question.choices.map(choice => (
            <button
              key={choice}
              onClick={() => onFortClick(choice)}
              className="rounded border-2 border-pink-400 bg-pink-100 px-3 py-3 text-base font-semibold text-indigo-900 hover:bg-pink-200"
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

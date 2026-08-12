'use client';

import type { Bomb } from '@/lib/game/types';
import { BombIcon } from './BombIcon';

interface LaneProps {
  bomb: Bomb;
  onFortClick: (choice: string) => void;
  onBombLanded: () => void;
  onExplosionEnd: () => void;
}

export function Lane({ bomb, onFortClick, onBombLanded, onExplosionEnd }: LaneProps) {
  const isFalling = bomb.phase === 'falling';

  return (
    <div className="relative w-full max-w-md">
      <div className="relative h-72 w-full overflow-hidden">
        {isFalling && (
          <div
            key={bomb.spawnId}
            className="absolute bottom-0 left-1/2"
            style={{ animation: `bomb-fall ${bomb.fallDurationMs}ms linear forwards` }}
            onAnimationEnd={onBombLanded}
          >
            <BombIcon label={bomb.question.prompt} />
          </div>
        )}
        {bomb.phase === 'exploding' && (
          <div
            key={`explosion-${bomb.spawnId}`}
            className="absolute bottom-0 left-1/2 text-6xl"
            style={{ animation: 'bomb-explode 400ms ease-out forwards' }}
            onAnimationEnd={onExplosionEnd}
          >
            💥
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {bomb.question.choices.map(choice => (
          <button
            key={choice}
            onClick={() => onFortClick(choice)}
            disabled={!isFalling}
            className={`rounded border-2 border-pink-400 bg-pink-100 px-2 py-3 text-sm font-semibold text-indigo-900 hover:bg-pink-200 ${isFalling ? '' : 'invisible'}`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

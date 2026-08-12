'use client';

import type { Bomb } from '@/lib/game/types';
import { BombIcon } from './BombIcon';

interface LaneProps {
  bomb: Bomb;
  onFortClick: (choice: string) => void;
  onBombLanded: () => void;
  onExplosionEnd: () => void;
}

// Deterministic per-spawn horizontal spot, so the falling bomb and its
// explosion (same spawnId, two separate renders) always land in the same place.
function horizontalPercentForSpawn(spawnId: number): number {
  const pseudoRandom = Math.abs(Math.sin(spawnId * 12.9898)) % 1;
  return 20 + pseudoRandom * 60;
}

export function Lane({ bomb, onFortClick, onBombLanded, onExplosionEnd }: LaneProps) {
  const isFalling = bomb.phase === 'falling';
  const leftPercent = horizontalPercentForSpawn(bomb.spawnId);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative h-72 w-full overflow-hidden">
        {isFalling && (
          <div
            key={bomb.spawnId}
            className="absolute bottom-0"
            style={{ left: `${leftPercent}%`, animation: `bomb-fall ${bomb.fallDurationMs}ms linear forwards` }}
            onAnimationEnd={onBombLanded}
          >
            <BombIcon label={bomb.question.prompt} />
          </div>
        )}
        {bomb.phase === 'exploding' && (
          <div
            key={`explosion-${bomb.spawnId}`}
            className="absolute bottom-0 text-6xl"
            style={{ left: `${leftPercent}%`, animation: 'bomb-explode 400ms ease-out forwards' }}
            onAnimationEnd={onExplosionEnd}
          >
            💥
          </div>
        )}
      </div>
      <div className="grid min-h-[144px] grid-cols-4 gap-3">
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

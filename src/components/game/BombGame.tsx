'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { applyAnswer, createIdleState, createInitialState } from '@/lib/game/gameState';
import { Lane } from './Lane';
import { HeartsDisplay } from './HeartsDisplay';
import { ScoreDisplay } from './ScoreDisplay';
import { GameOverOverlay } from './GameOverOverlay';
import { WarPlane } from './WarPlane';

const MAX_HEARTS = 3;

export function BombGame() {
  const { t, language } = useLanguage();
  const [state, setState] = useState(createIdleState());

  function handleStart() {
    setState(createInitialState(language));
  }

  function handleFortClick(laneId: number, spawnId: number, choice: string, correctAnswer: string) {
    setState(current =>
      applyAnswer(current, {
        laneId,
        spawnId,
        outcome: choice === correctAnswer ? 'correct' : 'wrong',
        language,
      })
    );
  }

  function handleBombLanded(laneId: number, spawnId: number) {
    setState(current => applyAnswer(current, { laneId, spawnId, outcome: 'missed', language }));
  }

  function handleExplosionEnd(laneId: number, spawnId: number) {
    setState(current => applyAnswer(current, { laneId, spawnId, outcome: 'explosionEnd', language }));
  }

  if (state.status === 'idle') {
    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-indigo-900">{t.game.title}</h1>
        <button
          onClick={handleStart}
          className="mt-4 rounded bg-pink-500 px-6 py-3 text-lg text-white hover:bg-pink-600"
        >
          {t.game.start}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-indigo-900">{t.game.title}</h1>
      <div className="my-3 flex items-center justify-between text-lg">
        <HeartsDisplay hearts={state.hearts} maxHearts={MAX_HEARTS} />
        <ScoreDisplay score={state.score} />
      </div>
      <div className="relative overflow-hidden rounded-xl border-4 border-slate-800 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-400 p-6 shadow-xl">
        <div
          className="mb-4"
          style={state.status === 'playing' ? { animation: 'plane-fly 3s ease-in-out infinite' } : undefined}
        >
          <WarPlane className="h-14 w-32" />
        </div>
        {state.status === 'gameover' ? (
          <GameOverOverlay score={state.score} onPlayAgain={handleStart} />
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {state.bombs.map(bomb => (
              <Lane
                key={bomb.laneId}
                bomb={bomb}
                onFortClick={choice => handleFortClick(bomb.laneId, bomb.spawnId, choice, bomb.question.correctAnswer)}
                onBombLanded={() => handleBombLanded(bomb.laneId, bomb.spawnId)}
                onExplosionEnd={() => handleExplosionEnd(bomb.laneId, bomb.spawnId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

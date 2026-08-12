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
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-indigo-900">{t.game.title}</h1>
          <button
            onClick={handleStart}
            className="mt-4 rounded bg-pink-500 px-6 py-3 text-lg text-white hover:bg-pink-600"
          >
            {t.game.start}
          </button>
        </div>
      </div>
    );
  }

  const bomb = state.bombs[0];

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold text-indigo-900">{t.game.title}</h1>
        <div className="my-3 flex items-center justify-between text-lg">
          <HeartsDisplay hearts={state.hearts} maxHearts={MAX_HEARTS} />
          <ScoreDisplay score={state.score} />
        </div>
        <div className="relative overflow-hidden rounded-xl border-4 border-slate-800 bg-[url('/battlefield.png')] bg-cover bg-center p-6 shadow-xl">
          {state.status === 'gameover' ? (
            <GameOverOverlay score={state.score} onPlayAgain={handleStart} />
          ) : (
            <div className="relative flex justify-center">
              <div
                className="pointer-events-none absolute top-0 left-0 z-10 inline-block"
                style={state.status === 'playing' ? { animation: 'plane-fly 6s linear infinite' } : undefined}
              >
                <WarPlane className="block h-auto w-32" />
              </div>
              <Lane
                bomb={bomb}
                onFortClick={choice => handleFortClick(bomb.laneId, bomb.spawnId, choice, bomb.question.correctAnswer)}
                onBombLanded={() => handleBombLanded(bomb.laneId, bomb.spawnId)}
                onExplosionEnd={() => handleExplosionEnd(bomb.laneId, bomb.spawnId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

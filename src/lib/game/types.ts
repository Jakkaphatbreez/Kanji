export type BombPhase = 'falling' | 'exploding';

export interface GameQuestion {
  id: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
}

export interface Bomb {
  laneId: number;
  spawnId: number;
  question: GameQuestion;
  fallDurationMs: number;
  phase: BombPhase;
}

export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface GameState {
  status: GameStatus;
  hearts: number;
  score: number;
  bombs: Bomb[];
  nextSpawnId: number;
}

export interface Level {
  minScore: number;
  fallDurationMs: number;
}

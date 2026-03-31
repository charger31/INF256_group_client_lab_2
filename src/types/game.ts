//----------------------------------------------
//Name: game type
//Abstract: This type holds all of the important game state information.
//----------------------------------------------


import type { Card } from "./card";

export type RoundResult = "player" | "computer" | "tie" | null;
export type GamePhase = "waiting" | "revealed";

export interface GameState {
  playerDeck: Card[];
  computerDeck: Card[];
  playerCard: Card | null;
  computerCard: Card | null;
  roundResult: RoundResult;
  roundCount: number;
  warPile: Card[];
  phase: GamePhase;
  gameOver: boolean;
  winner: "player" | "computer" | null;
}
import { RefObject } from "react";

export type GameState = {
  message: string;
  playerId: number;
  lobby: Lobby | null;
  playerName: string;
};

export type GameContexType = {
  gameState: GameState;
  setGameState: (value: GameState) => void;
  gameStateInRef: RefObject<GameState | undefined>;
};

export type Lobby = {
  name: string;
  owner: string;
  players: string[];
};

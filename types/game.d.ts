import { DataItem } from "./types";

export interface CardData extends DataItem {
  guessedFrom: number;
  selected: boolean;
}

export interface Player {
  username: string;
  score: number;
}

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
  players: Player[];
};

import { Socket } from "socket.io-client";
import { DataItem } from "./types";

export interface CardData extends DataItem {
  guessedFrom: number;
  selected: boolean;
}

export interface Player {
  username: string;
  score: number;
}

/**
 * @param {number} turn is the player ID
 */
export type GameState = {
  message: string;
  playerId: number;
  lobby: Lobby | null;
  playerName: string;
  cardDeck: CardData[];
  turn: number; //Player Id
};

export type GameContexType = {
  gameState: GameState;
};

export type SocketContextType = {
  socket: Socket;
};

export type Lobby = {
  name: string;
  owner: string;
  players: Player[];
};

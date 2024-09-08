import { Socket } from "socket.io-client";
import { DataItem } from "./types";

export interface CardData extends DataItem {
  guessedFrom: number;
  selected: boolean;
}

export interface Player {
  username: string;
  score: number;
  user_id: number;
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
  gameState: ClientGameState;
};

export type SocketContextType = {
  socket: ClientGameState;
};

export type Lobby = {
  name: string;
  owner: number; // User_id
  players: Player[];
  turn: number; // User_id
};

export type ServerGameState = {
  turn: number;
  cardDeck: CardData[];
};

export type ServerLobby = {
  name: string;
  owner: number; // User_id
  players: Set<Player>;
  gameState: ServerGameState;
};

export interface ClientGameState extends ServerGameState {
  username: string;
  user_id: number;
}

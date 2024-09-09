import { Socket } from 'socket.io-client'
import { DataItem } from './types'

export interface CardData extends DataItem {
  guessedFrom: number
  selected: boolean
}

export interface Player {
  username: string
  score: number
  user_id: number
}

export type GameContexType = {
  gameState: ClientGameState
}

export type SocketContextType = {
  socket: Socket
}

export type ServerGameState = {
  turn: number
  cardDeck: CardData[]
}

export type ServerLobby = {
  name: string
  owner: number // User_id
  players: Set<Player>
  gameState: ServerGameState
}

export interface ClientGameState extends ServerGameState {
  username: string
  user_id: number
}

//quick answer client state in server
//quick answer game state in client

export type QuickAnswerGameServerState = {
  players: Player[]
  problems: contentForQuickAnswer[]
  deals: contentForQuickAnswer[][]
  currentTurn: number
  // rank:
}
export interface contentForQuickAnswer {
  content_id: number,
  japanese_slang: string,
  english_slang: string,
  formal_version: string,
  description: string
}

export type QuickAnswerServerLobby = {
  name: string
  owner: number // User_id
  gameState: QuickAnswerGameServerState
}
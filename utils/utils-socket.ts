import { GameScoreResult, Player, ServerLobby } from '@/types/game';
import { ParsedUrlQuery } from 'querystring';

/**
 * Extract the data from the query of the socket
 * @param query Query from socket connection
 * @returns objects with user_id, username and lobby_id or throw an error
 */
export function extractDataFromQuery(query: ParsedUrlQuery) {
  const user_id_q = query.user_id;
  const username_q = query.username;
  const lobby_id_q = query.lobby_id;

  // Parse the query values
  const user_id = Number(Array.isArray(user_id_q) ? user_id_q[0] : user_id_q);
  const username = Array.isArray(username_q) ? username_q[0] : username_q;
  const lobby_id = Number(Array.isArray(lobby_id_q) ? lobby_id_q[0] : lobby_id_q);

  // Check query values
  if (isNaN(user_id)) {
    throw new Error('Invalid user_id: must be a valid number.');
  }
  if (!username) {
    throw new Error('Invalid username: must be a non-empty string.');
  }
  if (isNaN(lobby_id)) {
    throw new Error('Invalid lobby_id: must be a valid number.');
  }

  const player: Player = {
    username,
    score: 0,
    user_id,
  };

  return { player, lobby_id };
}

export function serializeServerObject(serverLobby: ServerLobby) {
  const serialized = {
    ...serverLobby,
    players: Array.from(serverLobby.players),
  };
  return serialized;
}

export function getPlayerFromSet(players: Set<Player> | undefined, user_id: number | undefined) {
  if (players && user_id) {
    let foundPlayer: Player = {} as Player;
    players.forEach((value: Player) => {
      if (value.user_id === user_id) foundPlayer = value;
    });
    return foundPlayer;
  }
  return {} as Player;
}

export function createScoreData(players: Set<Player>) {
  let result: GameScoreResult = {} as GameScoreResult;
  const playerArray = Array.from(players);

  if (playerArray[0].score >= 4) {
    result.score = playerArray[0].score;
    result.winner = playerArray[0].user_id;
    result.loser = playerArray[1].user_id;
  } else {
    result.score = playerArray[1].score;
    result.winner = playerArray[1].user_id;
    result.loser = playerArray[0].user_id;
  }
  return result;
}

import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/next';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as IOServer } from 'socket.io';
import { CardData, Player, ServerGameState, ServerLobby, QuickAnswerGameServerState, QuickAnswerServerLobby, contentForQuickAnswer } from '@/types/game';
import { extractDataFromQuery, serializeQuickAnswerServerObject, serializeServerObject } from '@/utils/utils-socket';
import { checkCardMatch, checkDataSelectable, getSelectedCards } from '@/utils/utils-data';

import path from 'path';
import { promises as fs } from 'fs';
import { guessQuickAnswer } from '@/types/types';
import { DefaultEventsMap } from 'node_modules/socket.io/dist/typed-events';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io');

    const httpServer: NetServer = res.socket.server as any;

    const io = new IOServer(httpServer, {
      path: '/api/socket',
    });

    const lobbies: { [key: string]: QuickAnswerServerLobby } = {};

    io.on('connection', async (socket: Socket) => {
      // Get data from query connection
      //Only first user in the room creates the lobbyid
      //The others who will join later use the lobby id again.
      const { player, lobby_id } = extractDataFromQuery(socket.handshake.query);
      let lobby: QuickAnswerServerLobby | undefined;
      let gameState: QuickAnswerGameServerState;

      //Socket join the room;
      socket.join(lobby_id.toString());

      if (lobbies[lobby_id] === undefined) {
        // Create the game state
        //fetch all data from API
        gameState = {
          players: [{ username: "Bob", score: 0, user_id: 0 }, { username: "Ken", score: 0, user_id: 1 },
          { username: "Hoooqeuy", score: 0, user_id: 2 }, { username: "Abubuth", score: 0, user_id: 3 }],
          problems: [{
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }, {
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          },
          {
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }
          ],
          deals: [[{
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }, {
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }], [{
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }, {
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }], [{
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }, {
            "content_id": 3,
            "japanese_slang": "ちょい待って！ (ちょいまって！)",
            "english_slang": "Wait!",
            "formal_version": "ちょっと待って。 (ちょっとまって。)",
            "description": "This slang means 'wait a bit' or 'hold on.' The polite way is '少々お待ちください。 (しょうしょうおまちください。)'"
          }]],
          currentTurn: 0,
          answeredUserId: []
        };

        // Create the lobby - first connection
        lobbies[lobby_id] = {
          name: 'Game',
          owner: player.user_id,
          gameState: gameState,
        };

        // Save the actual lobby
        lobby = lobbies[lobby_id];

        //Add the player to the lobby
        lobby.gameState.players.push(player);

        console.log('New client connected ', player.username);
        console.log('New lobby created ', lobby);
        io.emit('join', serializeQuickAnswerServerObject(lobby));
      } else if (lobbies[lobby_id].gameState.players.length <= 3) {
        lobby = lobbies[lobby_id];
        lobby.gameState.players.push(player);
        console.log('New client connected ', player.username);
        console.log('Change lobby ', lobby);
        // Send the new lobby to everyone
        io.emit('join', serializeQuickAnswerServerObject(lobby));
        //START GAME
      }
      //If user press start button under 4 users, user can start the game any time they like.

      //Check every request from users.
      socket.on('guessAnswerFromClient', (arg: guessQuickAnswer) => {
        console.log(arg)
        if (arg.gueesedAnswerId === gameState.problems[gameState.currentTurn].content_id) {
          //Update score

          //update current turn

          //if game should continue,
          //send next set of a problem and deals

          //if the game should end,
          //send result information to each client
          //update scores to DB
          //and close connection
        }

        //if every one is answered and no one find the answer, game will change to next step
        //if a certain time passed, emit, update score and send the next information or finish the game

      })

      //if user wants to start the game quickly, game should start.

      //disconnet button
      socket.on('disconnect', () => {
        // Send the new lobby to everyone
        io.emit('left', lobbies[lobby_id]);
        // Remove player from lobby
        if (player && lobby) {
          // Remove from the array
          lobby.players.delete(player);

          // Update all the user is disconnected
          io.emit('left', lobby);
          console.log('Client left and emit and update to everyone. ');
          // Delete the lobby if empty
          if (lobby.players.size === 0) {
            lobby = undefined;
            delete lobbies[lobby_id];
            console.log('Delete the lobby');
          }
        }

        console.log('Client disconnected ', player.username);
      });

      //finish game process
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;



const updateScore = (currentPlayers: Player[], playerId: number) => {
  const copied = currentPlayers
  for (const i of copied) {
    if (i.user_id === playerId) {
      i.score++
      break
    }
  }
  return copied
}

// const sendNextTurnData = async (problems: contentForQuickAnswer[], currentTurn: number) => {
//   return problems[currentTurn++]
// }

const endGame = async (socket: Socket, currentPlayers: Player[],
  io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, lobbyId: number) => {
  //send game result
  io.to(lobbyId.toString())

  //insert record to db
  //disconnect web socket

}



// Prepare card deck with initial values
/**
 * Helper function for retrive data from file
 * @returns {CardData} with initial default values
 */
const prepareCardDeckFromServer = async (): Promise<CardData[]> => {
  try {
    // Trova il percorso assoluto della directory "data"
    const jsonDirectory = path.join(process.cwd(), 'data');

    // Leggi il file "data.json"
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');

    // Converte il contenuto del file in JSON
    const cardDeck = JSON.parse(fileContents);

    // Verifica che il file abbia il formato corretto (es. che contenga una proprietà "data" con un array)
    if (!Array.isArray(cardDeck.data)) {
      throw new Error("Invalid data format: expected 'data' to be an array.");
    }

    // Espande ogni card aggiungendo le proprietà "guessedFrom" e "selected"
    const expandedDeck: CardData[] = cardDeck.data.map((card: CardData) => {
      return {
        ...card,
        guessedFrom: 0,
        selected: false,
      };
    });

    return expandedDeck;
  } catch (error) {
    console.error('Error preparing card deck:', error);
    throw new Error('Failed to prepare card deck from server.');
  }
};

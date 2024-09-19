import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/next';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as IOServer } from 'socket.io';
import { CardData, GameResultType, Player, ServerGameState, ServerLobby } from '@/types/game';
import { createScoreData, extractDataFromQuery, serializeServerObject } from '@/utils/utils-socket';
import {
  checkCardMatch,
  checkDataSelectable,
  getBackendURL,
  getSelectedCards,
  isUngussedCardsAvaible,
} from '@/utils/utils-data';
import axios from 'axios';

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

    const lobbies: { [key: string]: ServerLobby } = {};

    io.on('connection', async (socket: Socket) => {
      // Get data from query connection
      const { player, lobby_id } = extractDataFromQuery(socket.handshake.query);
      let lobby: ServerLobby | undefined;
      let gameState: ServerGameState;
      const lobbyRoom = lobby_id.toString();

      //Socket join the room;
      socket.join(lobbyRoom);

      if (lobbies[lobby_id] === undefined) {
        // Create the game state
        gameState = {
          cardDeck: await prepareCardDeckFromServer(), //Prepare the deck
          turn: player.user_id,
        };

        // Create the lobby - first connection
        lobbies[lobby_id] = {
          name: 'Game',
          owner: player.user_id,
          players: new Set<Player>(),
          gameState: gameState,
          startTime: new Date(),
          started: false,
        };

        // Save the actual lobby
        lobby = lobbies[lobby_id];

        //Add the player to the lobby
        lobby.players.add(player);

        console.log('New client connected ', player.username);
        console.log('New lobby created ', lobby);
        io.to(lobbyRoom).emit('join', serializeServerObject(lobby));
      } else {
        lobby = lobbies[lobby_id];
        if (lobby.players.size >= 2) {
          socket.emit('lobby-full', 'Already 2 players');
          socket.disconnect();
          return;
        } else {
          lobby.players.add(player);
          console.log('New client connected ', player.username);
          console.log('Change lobby ', lobby);
          // Send the new lobby to everyone
          io.to(lobbyRoom).emit('join', serializeServerObject(lobby));
        }
      }

      // // When a user press Start to start the game the status will propagate to everyone
      socket.on('start', () => {
        console.log('Game start!');
        // Set the start timer
        if (lobby) {
          lobby.startTime = new Date();
          lobby.started = true;
        }
        io.to(lobbyRoom).emit('start');
        // Delete the lobby from the DB
        axios({ url: `${getBackendURL()}/api/lobbies/${lobby_id}/`, method: 'DELETE' })
          .then(() => console.log('Lobby deleted succefully'))
          .catch(() => console.log('Cannot delete the lobby'));
      });

      socket.on('send-game-update', (cardDeck: CardData[]) => {
        let responseMessage = '';

        console.log('Received card deck');
        console.log('Check the number of selected cards');
        const selectedCardsIndexes = getSelectedCards(cardDeck);
        console.log('There is/are ', selectedCardsIndexes.length, ' cards');
        if (checkDataSelectable(cardDeck)) {
          // First send the deck update and after check if match
          console.log('Emit an update and check the match');
          console.log('New card deck');
          io.to(lobbyRoom).emit('receive-game-update', cardDeck, lobby?.gameState.turn);

          const selectedCards = getSelectedCards(cardDeck);
          // Check if the card match
          if (checkCardMatch(cardDeck)) {
            // Change card to gueseed
            // Extract index of the selected cards
            const cardIndex1 = selectedCards[0];
            const cardIndex2 = selectedCards[1];
            // Change the state to gueeesed
            cardDeck[cardIndex1].guessedFrom = player.user_id;
            cardDeck[cardIndex2].guessedFrom = player.user_id;
            // Change to unselected
            cardDeck[cardIndex1].selected = false;
            cardDeck[cardIndex2].selected = false;

            console.log('Card guessed!');
            if (player) {
              responseMessage = `${player.username} guessed 2 cards!`;
              player.score = player.score + 1;
            }
          } else if (selectedCards.length === 2) {
            // Extract index of the selected cards
            const cardIndex1 = selectedCards[0];
            const cardIndex2 = selectedCards[1];
            // Change to unselected
            cardDeck[cardIndex1].selected = false;
            cardDeck[cardIndex2].selected = false;

            console.log('Wrong!');
            if (player) {
              responseMessage = `${player.username} made a mistake!`;
            }
          }

          if (lobby?.players.size === 2) {
            // Swap the player id with for change turn
            const playerArray = Array.from(lobby.players);
            if (playerArray[0].user_id === lobby.gameState.turn) lobby.gameState.turn = playerArray[1].user_id;
            else if (playerArray[1].user_id === lobby.gameState.turn) lobby.gameState.turn = playerArray[0].user_id;
          }
          // Update the card deck
          if (lobby) lobby.gameState.cardDeck = cardDeck;
          console.log('New server lobby with change turn is ', lobby);
          if (lobby) io.to(lobbyRoom).emit('change-turn', serializeServerObject(lobby));
          io.to(lobbyRoom).emit('message', responseMessage);

          // Check the end of the game
          if (isUngussedCardsAvaible(cardDeck)) {
            if (lobby) {
              const duration = new Date().getTime() - lobby.startTime.getTime();
              const result: GameResultType = {
                players: Array.from(lobby.players),
                time: duration,
              };

              // Save the score
              const scoreData = createScoreData(lobby.players);
              const response = axios({
                url: `${getBackendURL()}/api/scores/create`,
                method: 'POST',
                data: scoreData,
              });
              console.log(response);
              // Send to everyone the game ends
              io.to(lobbyRoom).emit('end-game', result);
            }
          }
        } else {
          console.log('Emit an update no change turn');
          console.log('New card deck');
          io.to(lobbyRoom).emit('receive-game-update', cardDeck, lobby?.gameState.turn);
        }
      });

      socket.on('disconnect', () => {
        // Remove player from lobby
        if (player && lobby) {
          // Remove from the array
          lobby.players.delete(player);

          // Update all the user is disconnected
          io.to(lobbyRoom).emit('left', serializeServerObject(lobby));
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
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;

// Prepare card deck with initial values
/**
 * Helper function for retrive data from file
 * @returns {CardData} with initial default values
 */
const prepareCardDeckFromServer = async (): Promise<CardData[]> => {
  try {
    const cardDeck = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memo-game/game-contents`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => data.data);

    // const jsonDirectory = path.join(process.cwd(), 'data');
    // const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');
    // const cardDeck = JSON.parse(fileContents);

    if (!Array.isArray(cardDeck)) {
      throw new Error("Invalid data format: expected 'data' to be an array.");
    }

    const expandedDeck: CardData[] = cardDeck.map((card: CardData) => {
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

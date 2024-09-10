import dynamic from 'next/dynamic';
import GameStateProvider from '../../components/context/GameStateProvider';
import SocketProvider from '../../components/context/SocketProvider';
import GamePair from '../../components/GamePair';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CardData, ClientGameState, ServerLobby } from '@/types/game';
import { getSession } from 'next-auth/react';
import Message from '@/components/game/findPairGame/Message';
import { useRouter } from 'next/router';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const FindPair = () => {
  // Before show the cards you need to show the lobby Components and the players must be 2 and the owner should press start
  // List of players inside the ServerLobby

  // Socket or state
  const [useSocket, setSocket] = useState<Socket>({} as Socket);
  const [useClientGameState, setClientGameState] = useState<ClientGameState>({} as ClientGameState);
  const [useServerLobby, setServerLobby] = useState<ServerLobby>({} as ServerLobby);
  //Message state
  const [useMessage, setMessage] = useState('');

  //State to start the game,  states
  const [start, setStart] = useState<boolean>(false);
  const [players, setPlayers] = useState<any[]>([]);

  //the game requires 2 or more players to start
  const isReadyToStart = players.length >= 2;

  // State if game is ready or not
  const [isGameStateReady, setGameStateReady] = useState(false);
  const [isSocketReady, setSocketReady] = useState(false);

  // Get query arguments
  const router = useRouter();
  const { game_id, name } = router.query;

  // Initialize game state
  useEffect(() => {
    console.log('Initilialize gameState');
    setGameStateReady(false);

    getSession().then((session) => {
      const username = session?.user.username || 'Player';
      const user_id = session?.user.pk || 0;
      setClientGameState({ username, user_id, cardDeck: [], turn: 0 });
    });
  }, []);

  useEffect(() => {
    console.log('Client game state ready');
    console.log(useClientGameState);
    setGameStateReady(true);
  }, [useClientGameState]);

  // Initilialize socket after the gameState
  useEffect(() => {
    if (isGameStateReady && useClientGameState.username !== undefined) {
      const newSocket: Socket = io({
        query: {
          user_id: useClientGameState.user_id,
          username: useClientGameState.username,
          lobby_id: game_id,
        },
        path: '/api/socket',
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('start', () => {
        console.log('Game is started');
        setStart(true); // Update the start state to true
        // send to server the event start //io.emit("start");
      });

      newSocket.on('join', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players);
        console.log('New player joined the lobby', receivedLobby.players);
        setServerLobby(receivedLobby);
        setClientGameState({
          ...useClientGameState,
          cardDeck: receivedLobby.gameState.cardDeck,
          turn: receivedLobby.gameState.turn,
        });
        //show players on join page
        setPlayers(Array.from(receivedLobby.players));
      });

      newSocket.on('left', (receivedLobby: ServerLobby) => {
        console.log('A player left the lobby', receivedLobby.players);
        setServerLobby(receivedLobby);
      });

      // Get the update of the deck
      newSocket.on('receive-game-update', (cardDeck: CardData[], turn: number) => {
        console.log('Received an update, turn: ', turn);
        setMessage(`Received a deck update...`);
        setClientGameState({ ...useClientGameState, cardDeck, turn });
      });

      newSocket.on('message', (message: string) => {
        setMessage(message);
      });

      newSocket.on('change-turn', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players);
        console.log('Time to change turn! Now is ', receivedLobby.gameState.turn);
        // Wait 1 seconds before change turn!
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          setMessage(`Change turn to ${receivedLobby.gameState.turn}`);
          // This update the score
          setServerLobby(receivedLobby);
          // This update the deck and the turn
          setClientGameState({
            ...useClientGameState,
            turn: receivedLobby.gameState.turn,
            cardDeck: receivedLobby.gameState.cardDeck,
          });
        });
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      setSocket(newSocket);
      setSocketReady(true);

      return () => {
        newSocket.disconnect();
      };
    } else setGameStateReady(false);
  }, [isGameStateReady]);

  // Get the update from the child and emit to every client!
  const handleUpdateDeck = (cardDeck: CardData[]) => {
    console.log('Handle update', cardDeck);
    setClientGameState({ ...useClientGameState, cardDeck });
    console.log('Send update to server');
    useSocket.emit('send-game-update', cardDeck, useClientGameState.user_id);
  };

  if (!isGameStateReady || !isSocketReady || useClientGameState.cardDeck.length === 0) {
    return (
      <div>
        <h1>Please wait...</h1>
        <p>The game is still loading...</p>
      </div>
    );
  }

  //handle start button send to server the event start
  const handleStartButton = () => {
    useSocket.emit('start');
  };

  return (
    <div>
      {start === false ? (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full border border-[#A4161A]">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#A4161A] mb-4">Game ID: {game_id}</h1>
              <h2 className="text-xl font-semibold mb-4">Room: {name}</h2>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4 text-[#A4161A]">Players in Room</h2>
              <ul>
                {players.map((player) => (
                  <li key={player.id} className="text-[#A4161A] mb-2">
                    {player.username}
                  </li>
                ))}
              </ul>
              {players.length < 2 && (
                <p className="text-red-600 mt-4">Need at least one more player to start the game.</p>
              )}
            </div>

            <div className="text-center mb-6">
              <button
                onClick={() => handleStartButton()}
                disabled={!isReadyToStart}
                className={`py-3 px-6 rounded-md shadow-md ${
                  isReadyToStart ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'
                }`}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SocketProvider parentSocket={useSocket}>
          <GameStateProvider parentGameState={useClientGameState}>
            <Message message={useMessage} />
            <GamePair
              players={useServerLobby.players}
              gameState={useClientGameState}
              handleUpdateDeck={handleUpdateDeck}
            />
          </GameStateProvider>
        </SocketProvider>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(FindPair), {
  ssr: false,
});

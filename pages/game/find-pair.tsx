import dynamic from 'next/dynamic';
import GameStateProvider from '@/components/context/GameStateProvider';
import SocketProvider from '@/components/context/SocketProvider';
import GamePair from '@/components/game/findPairGame/GamePair';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CardData, ClientGameState, GameResultType, ServerLobby } from '@/types/game';
import { getSession } from 'next-auth/react';
import Message from '@/components/game/findPairGame/Message';
import { useRouter } from 'next/router';
import FlexModal from '@/components/modal';
import { GetServerSideProps } from 'next';
import { getPlayerFromSet } from '@/utils/utils-socket';

interface Props {
  gameId: string | string[] | undefined;
  lobbyName: string | string[] | undefined;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      gameId: query.game_id,
      lobbyName: query.name,
    },
  };
};

const TIMER_BEFORE_CHANGE_TURN_AND_FLIP_CARD = 1500; // ms

const FindPair = ({ gameId, lobbyName }: Props) => {
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

  const game_id_ref = useRef(game_id);
  const name_ref = useRef(name);
  const router_ref = useRef(router);

  // Modal state
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const openModal = (message: string) => {
    setModalMessage('');
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const [disconnectModalOpen, setDisconnectModalOpen] = useState<boolean>(false);
  const [disconnectModalMessage, setDisconnectModalMessage] = useState<string>('');
  const errorMessage = useRef<string | null>(null);

  // Initialize game state
  useEffect(() => {
    // If no game id or name redirect to lobby
    if (game_id_ref.current === undefined || name_ref.current === undefined) {
      // If no data from router get from props
      if (gameId === undefined || lobbyName === undefined) {
        router_ref.current.push({ pathname: '../lobby' });
        return;
      } else {
        game_id_ref.current = gameId;
        name_ref.current = lobbyName;
      }
    }
    console.log('Initilialize gameState');
    setGameStateReady(false);

    getSession().then((session) => {
      const username = session?.user.username || 'Player';
      const user_id = session?.user.pk || 0;
      setClientGameState({ username, user_id, cardDeck: [], turn: 0 });
    });
    window.onbeforeunload = () => {
      return 'show warning';
    };
  }, []);

  useEffect(() => console.log(start), [start]);

  useEffect(() => {
    console.log('Client game state ready');
    setGameStateReady(true);
  }, [useClientGameState]);

  // Initilialize socket after the gameState
  useEffect(() => {
    if (isGameStateReady && useClientGameState.username !== undefined) {
      const newSocket: Socket = io({
        query: {
          user_id: useClientGameState.user_id,
          username: useClientGameState.username,
          lobby_id: game_id_ref.current,
        },
        path: '/api/socket',
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('start', () => {
        console.log('Game is started');
        setStart(true); // Update the start state to true
      });

      newSocket.on('join', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players);
        console.log('New player joined the lobby');
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
        console.log('A player left the lobby');
        receivedLobby.players = new Set(receivedLobby.players);
        setServerLobby(receivedLobby);
        //show players on join page
        setPlayers(Array.from(receivedLobby.players));
        if (receivedLobby.started) {
          setDisconnectModalMessage('A player has disconnected. You will be redirected to the lobby.');
          setDisconnectModalOpen(true);
          setTimeout(() => {
            router.push('/lobby');
          }, 5000);
        }
      });

      // Get the update of the deck
      newSocket.on('receive-game-update', (cardDeck: CardData[], turn: number) => {
        // setMessage(`Received a deck update...`);
        setClientGameState({ ...useClientGameState, cardDeck, turn });
      });

      newSocket.on('message', (message: string) => {
        setMessage(message);
      });

      newSocket.on('change-turn', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players);
        // Wait 1 seconds before change turn!
        new Promise((resolve) => setTimeout(resolve, TIMER_BEFORE_CHANGE_TURN_AND_FLIP_CARD)).then(() => {
          setMessage(`Now is ${getPlayerFromSet(receivedLobby.players, receivedLobby.gameState.turn).username}'s turn`);
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

      newSocket.on('end-game', async (result: GameResultType) => {
        const stringResult = JSON.stringify(result);
        errorMessage.current = 'SKIP';
        router_ref.current.push({
          pathname: './game-result',
          query: { result: stringResult },
        });
        return;
      });

      newSocket.on('lobby-full', () => {
        console.log('Lobby is full!');
        errorMessage.current = 'Lobby is full';
        // router.push({ pathname: '/lobby', query: { error: 'lobby-full' } });
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
    setClientGameState({ ...useClientGameState, cardDeck });
    useSocket.emit('send-game-update', cardDeck, useClientGameState.user_id);
  };

  if (!isGameStateReady || !isSocketReady || useClientGameState.cardDeck.length === 0) {
    return (
      <div>
        {disconnectModalOpen && (
          <FlexModal closeModal={closeModal}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{disconnectModalMessage}</h2>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => router.push({ pathname: '/lobby' })}
                  className="bg-[#4e92b2] text-white py-2 px-4 rounded mr-2"
                >
                  OK
                </button>
              </div>
            </div>
          </FlexModal>
        )}
        <div className="flex flex-col items-center justify-center h-screen text-center text-4xl text-white">
          <h1>Please wait...</h1>
          <p>The game is still loading...</p>
        </div>
      </div>
    );
  }

  //handle start button send to server the event start
  const handleStartButton = () => {
    useSocket.emit('start');
  };

  //handle quit button inside modal
  const handleQuit = () => {
    router.push('/lobby');
  };

  return (
    <div>
      {start === false ? (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full border border-[#A4161A]">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#A4161A] mb-4">Game ID: {game_id_ref.current}</h1>
              <h2 className="text-xl font-semibold mb-4">Room: {name_ref.current}</h2>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4 text-[#A4161A]">Players in Room</h2>
              <ul>
                {players.map((player, index) => (
                  <li key={index} className="text-[#A4161A] mb-2">
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
            <div className="flex">
              <Message message={useMessage} />
              <button
                onClick={() => openModal('')} // Open the modal on click
                className=" bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 m-4"
              >
                X
              </button>
            </div>
            <GamePair
              players={useServerLobby.players}
              gameState={useClientGameState}
              handleUpdateDeck={handleUpdateDeck}
            />

            {ModalOpen && (
              <FlexModal closeModal={closeModal}>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Are you sure you want to quit?</h2>
                  <p className="mb-4">Exiting the game will result in losing your progress.</p>
                  <div className="flex justify-end">
                    <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded mr-2">
                      Cancel
                    </button>
                    <button onClick={handleQuit} className="bg-red-500 text-white py-2 px-4 rounded">
                      Quit Game
                    </button>
                  </div>
                </div>
              </FlexModal>
            )}
            {disconnectModalOpen && (
              <FlexModal closeModal={closeModal}>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{disconnectModalMessage}</h2>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setDisconnectModalOpen(false)}
                      className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </FlexModal>
            )}
          </GameStateProvider>
        </SocketProvider>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(FindPair), {
  ssr: false,
});

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Matrix } from "@/components/game/findPairGame/Matrix";
import PlayerList from "@/components/game/PlayerList";
import { isObjectEmpty } from "@/utils/utils-data";
import { CardData, GameState, Player } from "@/types/game";

type Props = {
  gameState: GameState;
  handleUpdateDeck: (cardDeck: CardData[]) => void;
};

export default function GamePair({ gameState, handleUpdateDeck }: Props) {
  const { socket } = useSocket();

  const [useGameState, setGameState] = useState(gameState);
  const [usePlayerList, setPlayerList] = useState<Player[]>();
  const [usePlayerTurn, setPlayerTurn] = useState(1);

  // Game state
  const [useReady, setReady] = useState(false);

  //From the parent update
  useEffect(() => {
    setGameState(gameState);
    setPlayerTurn(gameState.turn);
  }, [gameState]);

  // Refresh users
  useEffect(() => {
    handleUpdateLobby();
  }, [useGameState]);

  // Fetch data cards
  useEffect(() => {}, []);

  // Game will start from here
  const handleGameStart = () => {
    if (useGameState.lobby) {
      if (useGameState.lobby?.players.length > 1) {
        setReady(true);
        socket.emit("start");
      } else {
        alert("You need more players!");
      }
    }
  };

  const handleUpdateLobby = () => {
    setPlayerList(useGameState.lobby?.players);
  };

  if (isObjectEmpty(socket)) {
    console.log("The game is not ready");
    return <p>The game state and the socket is loading...</p>;
  }

  return (
    <>
      <Matrix
        handleUpdateDeck={handleUpdateDeck}
        gameState={useGameState}
      ></Matrix>
      <div className="m-5">
        <button className="bg-green-700 m-2" onClick={handleUpdateLobby}>
          Refresh
        </button>

        <button className="bg-green-700 m-2 " onClick={handleGameStart}>
          Start
        </button>
        {useReady ? <p>Game is running</p> : <p></p>}
        <p>Players</p>
        <PlayerList
          currentPlayerUsername={useGameState.playerName}
          players={usePlayerList}
        ></PlayerList>
      </div>
    </>
  );
}

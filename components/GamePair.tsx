import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useGameState } from "./GameStateProvider";
import { Matrix } from "./game/findPairGame/Matrix";
import PlayerList from "./game/PlayerList";

export default function GamePair() {
  const { gameState, gameStateInRef } = useGameState();
  const [usePlayerList, setPlayerList] = useState<string[]>();

  // Game state
  const [useReady, setReady] = useState(false);

  useEffect(() => {
    console.log("Update players! ", gameState.lobby?.players);
  }, [gameState.lobby?.players.length]);

  // Request a refresh of joined users
  const handleUpdateLobby = () => {
    setPlayerList(gameState.lobby?.players);
  };

  // Game will start from here
  const handleGameStart = () => {
    if (gameState.lobby) {
      if (gameState.lobby?.players.length > 1) {
        setReady(true);
      }
    }
  };

  return (
    <>
      <Matrix></Matrix>
      <div className="m-5">
        <button className="bg-green-700 m-2" onClick={handleUpdateLobby}>
          Refresh
        </button>

        <button className="bg-green-700 m-2 " onClick={handleGameStart}>
          Start
        </button>
        <p>Players</p>
        <PlayerList
          currentPlayerUsername={gameState.playerName}
          players={usePlayerList}
        ></PlayerList>
      </div>
    </>
  );
}

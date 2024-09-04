import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useGameState } from "./GameStateProvider";
import { Matrix } from "./game/findPairGame/Matrix";
import PlayerList from "./game/PlayerList";
import { fetchData } from "../utils/utils-data";
import { DataItem } from "../types/types";

export default function GamePair() {
  const socket = useSocket();
  const [useCardData, setCardData] = useState<DataItem[]>([] as DataItem[]);
  const { gameState, gameStateInRef } = useGameState();
  const [usePlayerList, setPlayerList] = useState<string[]>();

  // Game state
  const [useReady, setReady] = useState(false);

  useEffect(() => {
    console.log("Update players! ", gameState.lobby?.players);
  }, [gameState.lobby?.players.length]);

  // Fetch data cards
  useEffect(() => {
    fetchData().then((data) => {
      setCardData(data);
    });
  }, []);

  // Request a refresh of joined users
  const handleUpdateLobby = () => {
    setPlayerList(gameState.lobby?.players);
  };

  // Game will start from here
  const handleGameStart = () => {
    if (gameState.lobby) {
      if (gameState.lobby?.players.length > 1) {
        setReady(true);
        socket.emit("start");
      } else {
        alert("You need more players!");
      }
    }
  };

  return (
    <>
      <Matrix cardData={useCardData}></Matrix>
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
          currentPlayerUsername={gameState.playerName}
          players={usePlayerList}
        ></PlayerList>
      </div>
    </>
  );
}

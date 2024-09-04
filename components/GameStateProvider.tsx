import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GameStateProviderProps } from "../types/next";
import { GameState, Lobby, GameContexType } from "../types/game";
import { getSession, useSession } from "next-auth/react";
import { getUserDataWithToken, getUserSession } from "../utils/utils-session";

//Define all contexts

const GameStateContext = createContext<GameContexType>({} as GameContexType);

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const updateGameState = () => {
  return;
};

const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    message: "",
    lobby: null,
    playerId: 0,
    playerName: "",
  });
  const gameStateInRef = useRef<GameState>();
  gameStateInRef.current = gameState;

  useEffect(() => {
    console.log("Initiziale game state...");

    const session = getSession().then((session) => {
      const newGameState: GameState = {
        message: "Test",
        lobby: null,
        playerName: session?.user.username || "Player",
        playerId: session?.user.pk || 0,
      };
      setGameState(newGameState);
    });
  }, []);

  useEffect(() => {
    console.log("Game state has been changed--> ", gameState);
  }, [gameState]);

  const handleUpdateContext = (lobby: Lobby) => {
    const newGameState = gameState;
    newGameState.lobby = lobby;
    setGameState(newGameState);
    console.log("Handle and update of game state");
  };

  return (
    <GameStateContext.Provider
      value={{ gameState, setGameState, gameStateInRef }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;

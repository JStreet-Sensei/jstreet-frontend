import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GameStateProviderProps } from "@/types/next";
import { GameState, Lobby, GameContexType } from "@/types/game";
import { getSession } from "next-auth/react";
import { useSocket } from "./SocketProvider";

//Define all contexts

const GameStateContext = createContext<GameContexType>({} as GameContexType);

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const updateGameState = () => {
  return;
};

interface MyGameStateProviderProps extends GameStateProviderProps {
  parentGameState: GameState;
}

const GameStateProvider: React.FC<MyGameStateProviderProps> = ({
  children,
  parentGameState,
}) => {
  // Initiliaize the game state
  const [gameState, setGameState] = useState<GameState>(parentGameState);

  return (
    <GameStateContext.Provider value={{ gameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;

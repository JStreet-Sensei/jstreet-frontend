import { createContext, useContext, useState } from "react";
import { GameStateProviderProps } from "../globals/types/next";
import { GameState } from "../globals/types/game";

//Define all contexts
const GameStateContext = createContext<GameState>({} as GameState);

export const useGameState = () => {
  return useContext(GameStateContext);
};

const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({} as GameState);
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;

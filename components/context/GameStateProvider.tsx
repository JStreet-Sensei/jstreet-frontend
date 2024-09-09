import { createContext, useContext, useEffect, useState } from 'react';
import { GameStateProviderProps } from '@/types/next';
import { GameContexType, ClientGameState } from '@/types/game';

//Define all contexts

const GameStateContext = createContext<GameContexType>({} as GameContexType);

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const updateGameState = () => {
  return;
};

interface MyGameStateProviderProps extends GameStateProviderProps {
  parentGameState: ClientGameState;
}

const GameStateProvider: React.FC<MyGameStateProviderProps> = ({ children, parentGameState }) => {
  // Initiliaize the game state
  const [gameState, setGameState] = useState<ClientGameState>(parentGameState);

  useEffect(() => {
    setGameState(gameState);
  }, [parentGameState]);

  return <GameStateContext.Provider value={{ gameState }}>{children}</GameStateContext.Provider>;
};

export default GameStateProvider;

import { createContext, useContext, useEffect, useState } from "react";
import SocketIOClient, { io, Socket } from "socket.io-client";
import { SocketProviderProps } from "../globals/types/next";
import { useGameState } from "./GameStateProvider";
import { Lobby } from "../globals/types/game";

//Define all contexts
const SocketContext = createContext<Socket>({} as Socket);
const SocketUpdateContext = createContext<Socket>({} as Socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const useUpdateSocket = () => {
  return useContext(SocketUpdateContext);
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const { gameState, setGameState } = useGameState();

  useEffect(() => {
    if (gameState) {
      console.log("Socket provider state:", gameState);
      const newSocket: Socket = io({
        query: {
          user_id: gameState.playerId,
          username: gameState.playerName,
        },
        path: "/api/socket",
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("join", (lobby: Lobby) => {
        console.log("New player joined the lobby", lobby);
        if (lobby) {
          const newGameState = gameState;
          newGameState.lobby = lobby;
          setGameState(newGameState);
        }
      });

      newSocket.on("start", () => {
        console.log("Game is started");
      });

      newSocket.on("message", (msg: string) => {
        console.log("New message:", msg);
        // useGameState().message = msg;
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [gameState]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

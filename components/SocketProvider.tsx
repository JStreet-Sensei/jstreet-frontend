import { createContext, useContext, useEffect, useState } from "react";
import SocketIOClient, { io, Socket } from "socket.io-client";
import { SocketProviderProps } from "../globals/types/next";

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

  useEffect(() => {
    const newSocket: Socket = io({
      query: {
        user_id: "1",
      },
      path: "/api/socket",
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
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
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

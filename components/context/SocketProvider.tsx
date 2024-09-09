import { createContext, useContext, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketProviderProps } from '@/types/next';
import { SocketContextType } from '@/types/game';

//Define all contexts
const SocketContext = createContext<SocketContextType>({} as SocketContextType);
const SocketUpdateContext = createContext<Socket>({} as Socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const useUpdateSocket = () => {
  return useContext(SocketUpdateContext);
};

interface MySocketProviderProps extends SocketProviderProps {
  parentSocket: Socket;
}

const SocketProvider: React.FC<MySocketProviderProps> = ({ children, parentSocket }) => {
  const [socket, setSocket] = useState(parentSocket);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

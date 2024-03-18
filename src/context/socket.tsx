import * as React from 'react';

import {PropsWithChildren, createContext, useContext} from 'react';

import {Socket} from 'socket.io-client';
import useSocket from '../hooks/forum/useSocket';

export const SocketContext = createContext<Socket>({} as Socket);

export function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    console.log('useSocketContext must be use within SocketContextProvider!');
    return;
  }

  return context;
}

export function SocketProvider({children}: PropsWithChildren) {
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket as Socket}>
      {children}
    </SocketContext.Provider>
  );
}

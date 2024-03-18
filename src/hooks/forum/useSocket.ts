import {useEffect, useState} from 'react';

import {Socket, io} from 'socket.io-client';
import useAuth from '../../_store/useAuth';

export default function useSocket() {
  const [socket, setSocket] = useState<Socket>();

  const {data: user, logout} = useAuth();

  useEffect(() => {
    try {
      const socketIns = io('http://0.tcp.ap.ngrok.io:19654', {
        withCredentials: true,
        query: {
          token: user?.accessToken,
          room: user?.notificationRoom,
        },
        transports: ['websocket'],
      });

      setSocket(socketIns);

      socketIns.on('connect_error', (err: any) => {
        console.log('socket error >>>', err?.description);

        if (err?.description?.message?.includes('401')) {
          logout();
        }
      });

      socketIns.on('connect', () => {
        console.log('Socket has connected!');
      });

      socketIns.on('error', error => {
        console.error('Socket error:', error);
        // Handle socket errors here
      });

      return () => {
        if (socketIns) {
          socketIns.disconnect();
        }
      };
    } catch (error) {
      console.error('Error connecting to socket:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.accessToken, user?.notificationRoom]);

  return socket;
}

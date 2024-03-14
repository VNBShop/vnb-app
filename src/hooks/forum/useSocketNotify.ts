import {useEffect, useState} from 'react';

import {Socket, io} from 'socket.io-client';

import {API_SOCKET} from '@env';
import useAuth from '../../_store/useAuth';

type IProps = {
  room: string;
};

export default function useSocketNotify({room}: IProps) {
  const {data} = useAuth();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!room) {
      return;
    }
    try {
      const socketIns = io('https://three-bears-worry.loca.lt/notification', {
        withCredentials: true,
        query: {
          room: room,
          token: data?.accessToken,
        },
        transports: ['websocket', 'polling'],
      });

      console.log('socket inS', socketIns);

      setSocket(socketIns);

      socketIns.on('connect_error', err => {
        console.log('socket notify error >>>', err?.message);
      });

      socketIns.on('connect', () => {
        console.log('Socket notify has connected!');
      });

      return () => {
        if (socketIns) {
          socketIns.disconnect();
        }
      };
    } catch (error) {
      console.error('Error connecting to socket notify:', error);
    }
  }, [room, data?.accessToken]);

  return socket;
}

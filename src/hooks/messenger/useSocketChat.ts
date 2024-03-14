import {useEffect, useState} from 'react';

import {Socket, io} from 'socket.io-client';

import {ChatResponse} from '../../../types/messenger';
import useAuth from '../../_store/useAuth';
import {API_SOCKET} from '@env';

type IProps = {
  room: ChatResponse['room'];
};

export default function useSocketChat({room}: IProps) {
  const {data} = useAuth();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!room) {
      return;
    }
    try {
      const socketIns = io(`${API_SOCKET}/chat`, {
        withCredentials: true,
        query: {
          room: room,
          token: data?.accessToken,
        },
        transports: ['websocket', 'polling'],
      });

      setSocket(socketIns);

      socketIns.on('connect_error', err => {
        console.log('socket error >>>', err?.message);
      });

      socketIns.on('connect', () => {
        console.log('Socket chat connected!');
      });

      return () => {
        if (socketIns) {
          socketIns.disconnect();
        }
      };
    } catch (error) {
      console.error('Error connecting to socket:', error);
    }
  }, [room, data?.accessToken]);

  return socket;
}

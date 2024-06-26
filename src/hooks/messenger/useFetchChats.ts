import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {DataResponse} from '../../../types/auth';
import {ChatCard} from '../../../types/messenger';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {MESSAGE_SERVICE} from '../../libs/microservice';

export default function useFetchChats() {
  const axios = useAxiosPrivate();

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<ChatCard[]>([]);

  const {data, refetch, isPending, isError} = useQuery({
    queryKey: ['get-messages', page],
    queryFn: async ({queryKey}) => {
      const res: DataResponse<{
        messages: ChatCard[];
        nextPage: number;
      }> = await axios.get(`${MESSAGE_SERVICE}/messages`, {
        params: {
          currentPage: queryKey[1],
          pageSize: 30,
        },
      });

      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.messages as ChatCard[],
          hasNextPage: !!res?.data?.metadata?.nextPage ?? false,
        };
      } else {
        throw new Error('Cant not fetch this message!');
      }
    },
    refetchOnWindowFocus: false,
  });

  const onFetchNextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setMessages(prev => [...prev, ...(data?.messages ?? [])]);
  }, [data?.messages]);

  return {
    messages,
    isError,
    isPending,
    hasNextPage: data?.hasNextPage,
    setMessages,
    onFetchNextPage,
    refetch,
  };
}

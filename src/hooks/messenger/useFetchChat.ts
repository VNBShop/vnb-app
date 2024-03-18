import {useEffect, useState} from 'react';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {Chat} from '../../../types/messenger';
import {useQuery} from '@tanstack/react-query';
import {DataResponse} from '../../../types/auth';
import {MESSAGE_SERVICE} from '../../libs/microservice';

type IProps = {
  chatId: number;
};

export default function useFetchChat({chatId}: IProps) {
  const axios = useAxiosPrivate();

  const [page, setPage] = useState(1);
  const [chats, setChats] = useState<Chat[]>([]);

  const {data, isPending, isError} = useQuery({
    queryKey: [
      'get-message',
      {
        chatId,
        page,
      },
    ],
    queryFn: async ({queryKey}) => {
      const res: DataResponse<{
        messages: Chat[];
        nextPage: number;
        room: string;
      }> = await axios.get(`${MESSAGE_SERVICE}/messages/${chatId}`, {
        params: {
          currentPage: (queryKey[1] as {page: number})?.page,
          pageSize: 50,
        },
      });

      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.messages as Chat[],
          hasNextPage: !!res?.data?.metadata?.nextPage ?? false,
          room: res?.data?.metadata?.room as string,
        };
      } else {
        throw new Error('Cant not fetch this message!');
      }
    },
    enabled: !!chatId,
    refetchOnWindowFocus: false,
  });

  const onFetchNextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setChats(prev => [...(data?.messages ?? []), ...prev]);
  }, [data?.messages]);

  return {
    chats,
    room: data?.room ?? null,
    isError,
    isPending,
    hasNextPage: data?.hasNextPage,
    onFetchNextPage,
    setChats,
  };
}

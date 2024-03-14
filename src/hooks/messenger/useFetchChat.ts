import {useInfiniteQuery} from '@tanstack/react-query';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataResponse} from '../../../types/auth';
import {Chat, ChatCommunicate} from '../../../types/messenger';
import {MESSAGE_SERVICE} from '../../libs/microservice';

type IProps = {
  chatId: string | number;
};

export default function useFetchChat({chatId}: IProps) {
  const axios = useAxiosPrivate();

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-message', chatId],
    queryFn: async ({pageParam: currentPage}) => {
      const res: DataResponse<{
        messages: Chat[];
        total: number;
        room: ChatCommunicate['room'];
      }> = await axios.get(`${MESSAGE_SERVICE}/messages/${chatId}`, {
        params: {
          currentPage,
          pageSize: 10,
        },
      });

      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.messages as Chat[],
          total: res?.data?.metadata?.total as number,
          room: res?.data?.metadata?.room as string,
        };
      } else {
        throw new Error('Cant not fetch this message!');
      }
    },
    enabled: !!chatId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const messages = data?.pages?.flatMap(({messages}) => messages) ?? [];
  const room = data?.pages[0]?.room ?? null;

  // console.log('data >>', data)

  return {
    messages,
    room,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {DataResponse} from '../../../types/auth';
import {Notification} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {MESSAGE_SERVICE} from '../../libs/microservice';

export default function useFetchNotify() {
  const axios = useAxiosPrivate();

  const [notifys, setNotifys] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);

  const {data, isPending, isError, refetch} = useQuery({
    queryKey: ['get-posts', page],
    queryFn: async ({queryKey}) => {
      const res: DataResponse<{
        messages: {
          notifications: Notification[];
        };
        nextPage: number;
      }> = await axios.get(`${MESSAGE_SERVICE}/notifications`, {
        params: {
          currentPage: queryKey[1],
          pageSize: 10,
        },
      });

      if (res?.data?.success) {
        return {
          notifications: res?.data?.metadata?.messages?.notifications,
          hasNextPage: !!res?.data?.metadata?.nextPage ?? false,
        };
      } else {
        throw new Error('');
      }
    },
    refetchOnWindowFocus: false,
  });

  const onFetchNextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setNotifys(prev => [...prev, ...(data?.notifications ?? [])]);
  }, [data?.notifications]);

  return {
    notifys,
    isPending,
    isError,
    hasNextPage: data?.hasNextPage,
    onFetchNextPage,
    setNotifys,
    refetch,
  };
}

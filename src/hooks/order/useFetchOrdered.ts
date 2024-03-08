import {useInfiniteQuery} from '@tanstack/react-query';
import {Ordered, OrderedStatus} from '../../../types/order';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataResponse} from '../../../types/auth';
import {ORDER_SERVICE} from '../../libs/microservice';

export type OrderedFilter = {
  status?: OrderedStatus;
};

type IProps = {
  filter: OrderedFilter;
};
export default function useFetchOrdered({filter}: IProps) {
  const axios = useAxiosPrivate();
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['get-ordered', filter],
    queryFn: async ({pageParam: currentPage, queryKey}) => {
      const filterK = queryKey[1] as OrderedFilter;
      const res: DataResponse<{
        total: number;
        data: Ordered[];
      }> = await axios.get(`${ORDER_SERVICE}/orders/user`, {
        params: {
          currentPage,
          pageSize: 10,
          ...filterK,
        },
      });

      if (res?.data?.success) {
        return {
          total: res?.data?.metadata?.total,
          ordered: res?.data?.metadata?.data,
        };
      } else {
        throw new Error('');
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  const orders = data?.pages?.flatMap(({ordered}) => ordered) ?? [];

  return {
    orders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    refetch,
  };
}

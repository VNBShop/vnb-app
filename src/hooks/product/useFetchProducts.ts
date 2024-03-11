/* eslint-disable @typescript-eslint/no-shadow */
import {useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {getProducts} from '../../api/public/product';

export type FilterProps = {
  brandIds?: string;
  storeIds?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
};

type IProps = {
  currentPage?: number;
  pageSize?: number;
};

export default function useFetchProduct({currentPage, pageSize}: IProps = {}) {
  const [filter, setFilter] = React.useState<FilterProps>({});

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['get-products', filter],
    queryFn: ({pageParam, queryKey}) =>
      getProducts({
        currentPage: currentPage ? currentPage : (pageParam as number),
        filter: queryKey[1],
        ...(pageSize && {pageSize}),
      }),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / (pageSize ?? 10)) > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  const products = data?.pages?.flatMap(({products}) => products) ?? [];

  return {
    products,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    filter,
    setFilter,
  };
}

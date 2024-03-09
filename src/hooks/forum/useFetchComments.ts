import {useInfiniteQuery} from '@tanstack/react-query';

import {Comment, Post} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataResponse} from '../../../types/auth';
import {FORUM_SERVICE} from '../../libs/microservice';

export type MetaCommentssResponse = {
  data: Comment[];
  maxPage: number;
  nextPage: number;
  currentPage: number;
  previousPage: number;
  total: number;
};

type IProps = {
  postId: Post['postId'];
};

export default function useFetchComments({postId}: IProps) {
  const axios = useAxiosPrivate();

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['get-comments', postId],
    queryFn: async ({pageParam: currentPage, queryKey}) => {
      const res: DataResponse<{
        data: Comment[];
        total: number;
      }> = await axios.get(`${FORUM_SERVICE}/comments/${queryKey[1]}`, {
        params: {
          currentPage,
          pageSize: 5,
        },
      });

      if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
        return {
          comments: res?.data?.metadata?.data,
          total: res?.data?.metadata?.total,
        };
      } else {
        throw new Error('');
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 5) > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!postId,
    retry: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const comments = data?.pages?.flatMap(({comments}) => comments) ?? [];

  return {
    comments,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}

import {useInfiniteQuery} from '@tanstack/react-query';
import {DataResponse} from '../../../types/auth';
import {ProductComment, ProductDetail} from '../../../types/product';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {PRODUCT_SERVICE} from '../../libs/microservice';

type IProps = {
  productId: ProductDetail['productId'];
};

export type MetaProductCommentsResponse = {
  data: ProductComment[];
  maxPage: number;
  nextPage: number;
  currentPage: number;
  previousPage: number;
  total: number;
};

export default function useFetchProductComments({productId}: IProps) {
  const axios = useAxiosPrivate();

  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-product-comments', productId],
    queryFn: async ({queryKey, pageParam}) => {
      const res: DataResponse<{
        data: ProductComment[];
        total: number;
      }> = await axios.get(
        `${PRODUCT_SERVICE}/products/comments/products/${queryKey[1]}`,
        {
          params: {
            currentPage: pageParam,
            pageSize: 5,
          },
        },
      );

      if (res?.data?.success) {
        return {
          comments: res?.data?.metadata?.data,
          total: res?.data?.metadata?.total,
        };
      } else {
        throw new Error('Cant not fetch this product comments');
      }
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!productId,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const comments = data?.pages?.flatMap(({comments}) => comments) ?? [];

  return {
    comments,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

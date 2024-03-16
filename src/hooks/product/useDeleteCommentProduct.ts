import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ProductComment, ProductDetail} from '../../../types/product';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {PRODUCT_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type DeleteProductCmtPayload = {
  commentId: ProductComment['commentId'];
};

type IProps = {
  onSuccess: () => void;
  productId: ProductDetail['productId'];
};

export default function useDeleteProductCmt({onSuccess, productId}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const {top} = useSafeAreaInsets();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    DeleteProductCmtPayload
  >({
    mutationFn: async payload => {
      return axios.delete(
        `${PRODUCT_SERVICE}/products/comments/${payload?.commentId}`,
      );
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-product-comments', productId],
        });
        onSuccess();
      }
    },
    onError: err => {
      console.log('err', err);

      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not delete this comment!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: top,
      });
    },
  });
  return {
    loading: isPending,
    onDeleteCmtProduct: mutate,
  };
}

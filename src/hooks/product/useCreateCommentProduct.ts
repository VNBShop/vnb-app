import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ProductDetail} from '../../../types/product';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {PRODUCT_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type CreateProductCmtPayload = {
  productId: ProductDetail['productId'];
  comment: string;
};

type IProps = {
  onSuccess: () => void;
};

export default function useCreateProductCmt({onSuccess}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const {top} = useSafeAreaInsets();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    CreateProductCmtPayload
  >({
    mutationFn: async payload => {
      return axios.post(`${PRODUCT_SERVICE}/products/comments`, payload);
    },
    onSuccess: async (res, paload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['product', paload?.productId],
        });
        await client.invalidateQueries({
          queryKey: ['get-product-comments', paload?.productId],
        });
        onSuccess();
      }
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not comment on this product!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: top,
      });
    },
  });
  return {
    loading: isPending,
    onCreateCmt: mutate,
  };
}

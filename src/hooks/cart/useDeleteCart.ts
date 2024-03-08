import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Cart} from '../../../types/order';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {ORDER_SERVICE} from '../../libs/microservice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type DeleteCartPayload = {
  id: Cart['cartId'];
};

export default function useDeleteCart() {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const insets = useSafeAreaInsets();

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    DeleteCartPayload
  >({
    mutationFn: async payload => {
      return await axios.delete(`${ORDER_SERVICE}/carts/${payload.id}`);
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-user-cart'],
        });
      }
    },
    onError: async error => {
      Toast.show({
        type: 'error',
        topOffset: insets.top,
        text2:
          error?.response?.data?.metadata?.message ?? 'Cant delete this cart!',
      });
    },
  });
  return {
    onDeleteCart: mutate,
    loadingDeleteCart: isPending,
  };
}

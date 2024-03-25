import {useMutation} from '@tanstack/react-query';

import {PaymentType} from '../../../types/order';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {ORDER_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type CreateOrderPayload = {
  cartIds: number[];
  paymentType: PaymentType;
  voucherCode?: string;
};

type IProps = {
  onSuccess?: () => void;
};

export default function useCreateOrder({onSuccess}: IProps) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    CreateOrderPayload
  >({
    mutationFn: async payload => {
      return axios.post(`${ORDER_SERVICE}/orders/checkout-by-cart`, payload);
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Order successfully!',
          text2Style: {
            fontSize: 13,
          },
        });
        onSuccess?.();
      }
    },
    onError: err => {
      Toast.show({
        topOffset: insets.top,
        type: 'error',
        text2: (err?.response?.data?.metadata as string) ?? 'Cant order!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    loading: isPending,
    onCreateOrder: mutate,
  };
}

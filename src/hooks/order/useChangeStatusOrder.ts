import {useMutation, useQueryClient} from '@tanstack/react-query';
import {DataError, DataResponse} from '../../../types/auth';
import {Ordered, OrderedStatus} from '../../../types/order';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {ORDER_SERVICE} from '../../libs/microservice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export type ChangeStatusOrder = {
  orderStatus: OrderedStatus;
  orderId: Ordered['orderId'];
  search: string;
};

type IProps = {
  onSuccess: () => void;
};

export default function useChangeStatusOrder({onSuccess}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const insets = useSafeAreaInsets();

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    ChangeStatusOrder
  >({
    mutationFn: async payload => {
      return await axios.put(
        `${ORDER_SERVICE}/orders/deliver/${payload?.orderId}`,
        {
          orderStatus: payload?.orderStatus,
          reason: '',
        },
      );
    },
    onSuccess: async (res, variables) => {
      console.log('variables', res);

      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-order-shipper', variables?.search],
        });
        Toast.show({
          type: 'success',
          text2: 'Update status successfully!',
          text2Style: {
            fontSize: 13,
          },
          topOffset: insets.top,
        });
        onSuccess();
      }
    },
    onError(err) {
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Update status successfully!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
    },
  });

  return {
    onChangeStatusOrder: mutate,
    loadingChange: isPending,
  };
}

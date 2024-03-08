import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {DataError, DataResponse} from '../../../types/auth';
import {ProductStock} from '../../../types/product';
import {RootStackProps} from '../../../types/route';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {ORDER_SERVICE} from '../../libs/microservice';

export type CreateCartPayload = {
  productSizeId: ProductStock['productStockId'];
  quantity: number;
  isBuyNow?: boolean;
};

type IProps = {
  isMultiple?: boolean;
  navigation:
    | NativeStackNavigationProp<RootStackProps, 'ProductDetail', undefined>
    | NativeStackNavigationProp<RootStackProps, 'Cart', undefined>
    | NativeStackNavigationProp<RootStackProps, 'Ordered', undefined>;
  onSuccess?: () => void;
  onErr?: (messages: string[]) => void;
};

export default function useCreateCart({
  isMultiple,
  navigation,
  onSuccess,
  onErr,
}: IProps) {
  const client = useQueryClient();
  const insets = useSafeAreaInsets();
  const axios = useAxiosPrivate();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    CreateCartPayload | CreateCartPayload[]
  >({
    mutationFn: async payload => {
      return isMultiple
        ? await axios.post(`${ORDER_SERVICE}/carts/multiple`, {
            carts: payload,
          })
        : await axios.post(`${ORDER_SERVICE}/carts`, {
            productSizeId: (payload as CreateCartPayload)?.productSizeId,
            quantity: (payload as CreateCartPayload).quantity,
          });
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        if (isMultiple) {
          await client.refetchQueries({queryKey: ['get-user-cart']});
          navigation.push('Checkout');
        } else {
          await client.refetchQueries({queryKey: ['get-user-cart']});
          if ((payload as CreateCartPayload)?.isBuyNow) {
            onSuccess?.();
            navigation.push('Checkout');
          }
        }
      }
    },
    onError: (err: any) => {
      console.log('err add cart', err);

      if (isMultiple) {
        onErr?.(err?.response?.data?.metadata?.data);
      } else {
        Toast.show({
          type: 'error',
          text2:
            err?.response?.data?.metadata?.message ??
            'Cant not add to cart this product!',
          topOffset: insets.top,
          text2Style: {
            fontSize: 13,
          },
        });
      }
    },
  });
  return {
    onAddToCart: mutate,
    loading: isPending,
  };
}

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ProductStock} from '../../../types/product';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {ORDER_SERVICE} from '../../libs/microservice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../../types/route';
import Toast from 'react-native-toast-message';

export type CreateCartPayload = {
  productSizeId: ProductStock['productStockId'];
  quantity: number;
  isBuyNow?: boolean;
};

type IProps = {
  isMultiple?: boolean;
  navigation: NativeStackNavigationProp<
    RootStackProps,
    'ProductDetail',
    undefined
  >;
  onSuccess?: () => void;
};

export default function useCreateCart({
  isMultiple,
  navigation,
  onSuccess,
}: IProps) {
  const client = useQueryClient();
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
        Toast.show({
          type: 'error',
          text2:
            err?.response?.data?.metadata?.data?.join(' ') ??
            'Cant not add to cart this product!',
        });
      } else {
        Toast.show({
          type: 'error',
          text2:
            err?.response?.data?.metadata?.message ??
            'Cant not add to cart this product!',
          text2Style: {
            fontSize: 13,
          },
        });
        // toast.error(
        //   err?.response?.data?.metadata?.message ??
        //     'Cant not add to cart this product!',
        // );
      }
    },
  });
  return {
    onAddToCart: mutate,
    loading: isPending,
  };
}

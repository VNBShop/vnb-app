import {useMutation} from '@tanstack/react-query';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DataError, DataResponse} from '../../../types/auth';
import {ORDER_SERVICE} from '../../libs/microservice';
import {Voucher} from '../../../types/order';
import Toast from 'react-native-toast-message';

type AddVoucherPayload = {
  voucherCode: string;
};

type IProps = {
  onSuccess: (
    payload: Pick<Voucher, 'voucherCode' | 'maxDiscount' | 'voucherPercent'>,
  ) => void;
};

export default function useAddVoucher({onSuccess}: IProps) {
  const axios = useAxiosPrivate();
  const {top} = useSafeAreaInsets();

  const {mutate, isPending} = useMutation<
    DataResponse<Voucher>,
    DataError,
    AddVoucherPayload
  >({
    mutationFn: async payload => {
      return await axios.get(
        `${ORDER_SERVICE}/vouchers/use-voucher/${payload?.voucherCode}`,
      );
    },
    onSuccess: response => {
      if (response?.data?.success) {
        onSuccess({
          voucherPercent: response?.data?.metadata?.voucherPercent ?? 0,
          voucherCode: response?.data?.metadata?.voucherCode ?? '',
          maxDiscount: response?.data?.metadata?.maxDiscount ?? 0,
        });
      }
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not add this voucher!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: top,
      });
    },
  });
  return {
    onAddVoucher: mutate,
    loadingAddVoucher: isPending,
  };
}

import {API_URL} from '@env';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {DataError, DataResponse} from '../../../types/auth';

type ResendOTPPayload = {
  email: string;
  type: 'REGISTER' | 'RESET_PASSWORD';
};

type IProps = {
  onSuccess?: () => void;
};

export default function useResendOTP({onSuccess}: IProps = {}) {
  const {top} = useSafeAreaInsets();
  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    ResendOTPPayload
  >({
    mutationFn: async payload => {
      return await axios.post(
        `${API_URL}/user-service/api/v1/account/resend-confirmation-code`,
        payload,
      );
    },
    onSuccess: res => {
      if (res?.data?.success) {
        Toast.show({
          type: 'success',
          text2: 'Resend OTP successfully!',
          topOffset: top,
          text2Style: {
            fontSize: 13,
          },
        });
        onSuccess?.();
      }
    },
    onError: err => {
      console.log('err', err);

      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ?? 'Cant not resend OTP!',
        topOffset: top,
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });

  return {
    loading: isPending,
    onResendOTP: mutate,
  };
}

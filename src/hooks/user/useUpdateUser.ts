import {useMutation, useQueryClient} from '@tanstack/react-query';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import useAuth from '../../_store/useAuth';
import {DataError, DataResponse} from '../../../types/auth';
import {USER_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  gender?: 'MALE' | 'FEMALE';
  phoneNumber?: string;
  dateOfBirth?: any;
  avatar?: {
    assetId: string;
    secureUrl: string;
  };
  address?: string;
};

type IProps = {
  onSuccess?: () => void;
};

export default function useUpdateUser({onSuccess}: IProps = {}) {
  const client = useQueryClient();
  const axios = useAxiosPrivate();

  const insets = useSafeAreaInsets();

  const {onUpdateProfile} = useAuth();
  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    UpdateUserPayload
  >({
    mutationFn: async payload => {
      return axios.put(`${USER_SERVICE}/users`, payload);
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-user-profile'],
        });

        if (payload?.firstName) {
          onUpdateProfile({
            firstName: payload.firstName,
          });
        }

        if (payload?.lastName) {
          onUpdateProfile({
            lastName: payload.lastName,
          });
        }

        if (payload?.avatar?.secureUrl) {
          onUpdateProfile({
            avatar: payload.avatar.secureUrl,
          });
        }

        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Update user info successfully!',
          text2Style: {
            fontSize: 13,
          },
        });

        await client.refetchQueries({
          queryKey: ['get-posts-profile'],
        });

        onSuccess?.();
      }
    },
    onError: err => {
      Toast.show({
        topOffset: insets.top,
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ?? 'Cant update user info!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    loading: isPending,
    onUpdateInfo: mutate,
  };
}

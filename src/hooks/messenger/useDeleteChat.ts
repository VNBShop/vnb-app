import {useMutation, useQueryClient} from '@tanstack/react-query';

import {ChatCard} from '../../../types/messenger';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {MESSAGE_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';

export type DeleteChatPayload = {
  receiverId: ChatCard['receiverId'];
};

type IProps = {
  onSuccess?: () => void;
};

export default function useDeleteChat({onSuccess}: IProps = {}) {
  const axios = useAxiosPrivate();

  const insets = useSafeAreaInsets();

  const client = useQueryClient();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    DeleteChatPayload
  >({
    mutationFn: async payload => {
      return axios.delete(`${MESSAGE_SERVICE}/messages/${payload?.receiverId}`);
    },
    onSuccess: async response => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-messages'],
        });

        onSuccess?.();
      }
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not delete this message!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
    },
  });

  return {
    onDeleteMessage: mutate,
    loading: isPending,
  };
}

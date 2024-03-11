import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Photo} from '../../../types/user';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {FORUM_SERVICE} from '../../libs/microservice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type IProps = {
  onSuccess: () => void;
  onError: () => void;
  pageKey: 'get-posts' | 'get-posts-profile';
};

export type CreatePostPayload = {
  content: string;
  tags?: string[];
  postAssets?: Photo[];
};

export default function useCreatePost({onSuccess, onError}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const insets = useSafeAreaInsets();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    CreatePostPayload
  >({
    mutationFn: async payload => {
      return await axios.post(`${FORUM_SERVICE}/posts`, payload);
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: ['get-posts'],
        });
        onSuccess();
      }
    },
    onError: err => {
      onError();
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ?? 'Cant not create post!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
    },
  });
  return {
    onCreatePost: mutate,
    loading: isPending,
  };
}

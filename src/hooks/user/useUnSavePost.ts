import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {DataError, DataResponse} from '../../../types/auth';
import {Post} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {FORUM_SERVICE} from '../../libs/microservice';

type UnsavePostPayload = {
  postId: Post['postId'];
};

type IProps = {
  onSuccess?: () => void;
};

export default function useUnsavePost({onSuccess}: IProps = {}) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();
  const client = useQueryClient();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    UnsavePostPayload
  >({
    mutationFn: async payload => {
      return axios.delete(`${FORUM_SERVICE}/post-saves/${payload?.postId}`);
    },
    onSuccess: async response => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-posts-saved'],
        });
        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Post has been unsaved!',
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
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not unsave this post!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    onUnsavePost: mutate,
    loadingDelete: isPending,
  };
}

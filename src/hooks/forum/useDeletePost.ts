import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {DataError, DataResponse} from '../../../types/auth';
import {Post} from '../../../types/forum';
import {FORUM_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';

type DeletePostPayload = {
  postId: Post['postId'];
};

type IProps = {
  onSuccess?: () => void;
};

export default function useDeletePost({onSuccess}: IProps = {}) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();
  const client = useQueryClient();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    DeletePostPayload
  >({
    mutationFn: async payload => {
      return axios.delete(`${FORUM_SERVICE}/posts/${payload?.postId}`);
    },
    onSuccess: async response => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-posts'],
        });
        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Post has been delete!',
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
          'Cant not delete this post!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    onDeletePost: mutate,
    loadingDelete: isPending,
  };
}

import {useMutation, useQueryClient} from '@tanstack/react-query';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {FORUM_SERVICE} from '../../libs/microservice';
import {DataError, DataResponse} from '../../../types/auth';
import {Post} from '../../../types/forum';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type CreateCommentPayload = {
  comment: string;
};

type IProps = {
  onSuccess: () => void;
  postId: Post['postId'];
};

export default function useCreateComment({onSuccess, postId}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const insets = useSafeAreaInsets();

  const {isSuccess, isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async payload => {
      return await axios.post(`${FORUM_SERVICE}/comments`, {
        ...payload,
        postId,
      });
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: ['get-comments', postId],
        });
        onSuccess();
        // await client.invalidateQueries({
        //   queryKey: [queryKey],
        // });
      }
    },
    onError: err => {
      Toast.show({
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not create comment on this post!',
        text2Style: {
          fontSize: 13,
        },
        type: 'error',
        topOffset: insets.top,
      });
    },
  });

  return {
    onComment: mutate,
    loading: isPending,
    isSuccess,
  };
}

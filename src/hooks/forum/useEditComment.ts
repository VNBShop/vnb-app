import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Comment, Post} from '../../../types/forum';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {FORUM_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';

export type EditCommentPayload = {
  comment: string;
  commentId: Comment['commentId'];
};

type IProps = {
  onSuccess: () => void;
  postId: Post['postId'];
};

export default function useEditComment({onSuccess, postId}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const insets = useSafeAreaInsets();

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    EditCommentPayload
  >({
    mutationFn: async payload => {
      return await axios.put(
        `${FORUM_SERVICE}/comments/${payload?.commentId}`,
        {
          comment: payload.comment,
        },
      );
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-comments', postId],
        });
        onSuccess();
      }
    },
    onError: err => {
      console.log('err', err);

      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not create comment on this post!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
    },
  });

  return {
    onEditComment: mutate,
    loading: isPending,
  };
}

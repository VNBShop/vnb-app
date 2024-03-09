import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Comment, Post} from '../../../types/forum';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {FORUM_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';

export type CreateCommentPayload = {
  commnentId: Comment['commentId'];
};

type IProps = {
  onClose: () => void;
  postId: Post['postId'];
};

export default function useDeleteComment({onClose, postId}: IProps) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();

  const client = useQueryClient();

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async payload => {
      return await axios.delete(
        `${FORUM_SERVICE}/comments/${payload.commnentId}`,
      );
    },
    onSuccess: async res => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-comments', postId],
        });
        onClose();
        // await client.invalidateQueries({
        //   queryKey: [pageKey],
        // });
      }
    },

    onError: err => {
      Toast.show({
        type: 'error',
        text2:
          (err?.response?.data?.metadata as string) ??
          'Cant not delete this comment!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
    },
  });

  return {
    onDeleteComment: mutate,
    loading: isPending,
  };
}

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {QueryKey, useMutation, useQueryClient} from '@tanstack/react-query';
import {DataError, DataResponse} from '../../../types/auth';
import {Post} from '../../../types/forum';
import {FORUM_SERVICE} from '../../libs/microservice';
import Toast from 'react-native-toast-message';

type SavePostPayload = {
  postId: Post['postId'];
};

type IProps = {
  onSuccess?: () => void;
  queryKey: QueryKey;
};

export default function useSavePost({onSuccess, queryKey}: IProps) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();
  const client = useQueryClient();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    SavePostPayload
  >({
    mutationFn: async payload => {
      return axios.post(`${FORUM_SERVICE}/post-saves`, payload);
    },
    onSuccess: async response => {
      if (response?.data?.success) {
        console.log('queryKey >>', queryKey);

        await client.invalidateQueries({
          queryKey: queryKey,
        });

        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Post has been saved!',
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
          'Cant not save this post!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    onSavePost: mutate,
    loading: isPending,
  };
}

import {QueryKey, useMutation, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {DataError, DataResponse} from '../../../types/auth';
import {Post} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {FORUM_SERVICE} from '../../libs/microservice';

type ReportPostPayload = {
  postId: Post['postId'];
};

type IProps = {
  onSuccess?: () => void;
  queryKey: QueryKey;
};

export default function useReportPost({onSuccess, queryKey}: IProps) {
  const axios = useAxiosPrivate();
  const insets = useSafeAreaInsets();
  const client = useQueryClient();

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    ReportPostPayload
  >({
    mutationFn: async payload => {
      return axios.post(`${FORUM_SERVICE}/post-reports`, payload);
    },
    onSuccess: async response => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: queryKey,
        });

        Toast.show({
          topOffset: insets.top,
          type: 'success',
          text2: 'Post has been reported!',
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
          'Cant not report this post!',
        text2Style: {
          fontSize: 13,
        },
      });
    },
  });
  return {
    onReportPost: mutate,
    loadingReport: isPending,
  };
}

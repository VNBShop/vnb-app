import {Dispatch, SetStateAction} from 'react';

import {QueryKey, useMutation, useQueryClient} from '@tanstack/react-query';

import {Post} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataError, DataResponse} from '../../../types/auth';
import {FORUM_SERVICE} from '../../libs/microservice';

export type LikeActionPayload = {
  postId: Post['postId'];
  reacted: boolean;
};

type IProps = {
  queryKey: QueryKey;
  setReact: Dispatch<SetStateAction<boolean>>;
  setTotalReaction: Dispatch<SetStateAction<number>>;
};

export default function useLikePost({
  setReact,
  setTotalReaction,
  queryKey,
}: IProps) {
  const axios = useAxiosPrivate();
  const client = useQueryClient();

  const {mutate} = useMutation<DataResponse, DataError, LikeActionPayload>({
    mutationFn: async payload => {
      return axios.post(`${FORUM_SERVICE}/reactions`, payload);
    },
    onMutate: payload => {
      if (payload?.reacted) {
        setReact(false);
        setTotalReaction(prev => (prev > 0 ? prev - 1 : 0));
      } else {
        setReact(true);
        setTotalReaction(prev => prev + 1);
      }
    },
    onError: (_err, payload) => {
      if (payload?.reacted) {
        setReact(true);
        setTotalReaction(prev => prev + 1);
      } else {
        setReact(false);
        setTotalReaction(prev => (prev > 0 ? prev - 1 : 0));
      }
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return {
    onLike: mutate,
  };
}

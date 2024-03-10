import {useQuery} from '@tanstack/react-query';
import {Post} from '../../../types/forum';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {FORUM_SERVICE} from '../../libs/microservice';
import {DataResponse} from '../../../types/auth';

type IProps = {
  postId: Post['postId'];
};

export default function useFetchPost({postId}: IProps) {
  const axios = useAxiosPrivate();
  const {data, isPending} = useQuery({
    queryKey: ['get-post', postId],
    enabled: !!postId,
    queryFn: async ({queryKey}) => {
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/posts/${queryKey[1]}`,
      );
      if (res?.data?.success) {
        return res?.data?.metadata;
      } else {
        throw new Error('Cant not fetch this post');
      }
    },
  });

  return {
    postData: data,
    isPending,
  };
}

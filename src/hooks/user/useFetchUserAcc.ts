import {useQuery} from '@tanstack/react-query';

import {User} from '../../../types/user';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataResponse} from '../../../types/auth';
import {USER_SERVICE} from '../../libs/microservice';

type IProps = {
  userId: number | string;
};

export default function useFetchUserAcc({userId}: IProps) {
  const axios = useAxiosPrivate();

  const {isPending, data, isError} = useQuery({
    queryKey: ['get-user-account', userId],
    queryFn: async () => {
      const res: DataResponse = await axios.get(
        `${USER_SERVICE}/users/${userId}`,
      );

      if (res?.data?.success) {
        return res?.data?.metadata as User;
      } else {
        throw new Error('Cant not fetch user account');
      }
    },
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return {
    userAccount: data,
    isError,
    loading: isPending,
  };
}

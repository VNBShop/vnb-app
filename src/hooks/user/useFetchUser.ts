import {useQuery} from '@tanstack/react-query';

import {User} from '../../../types/user';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {DataResponse} from '../../../types/auth';
import {USER_SERVICE} from '../../libs/microservice';

export default function useFetchUser() {
  const axios = useAxiosPrivate();

  const {data, isPending} = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: async () => {
      const res: DataResponse = await axios.get(
        `${USER_SERVICE}/users/profile`,
      );
      if (res?.data?.success) {
        return res?.data?.metadata as User;
      } else {
        throw new Error('Cant not fetch user information');
      }
    },
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isPending,
  };
}

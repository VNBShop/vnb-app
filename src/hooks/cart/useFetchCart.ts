import {useQuery} from '@tanstack/react-query';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {ORDER_SERVICE} from '../../libs/microservice';
import {DataResponse} from '../../../types/auth';
import {Cart} from '../../../types/order';

export default function useFetchCart() {
  const axios = useAxiosPrivate();
  const {data, isPending, refetch} = useQuery({
    queryKey: ['get-user-cart'],
    queryFn: async () => {
      return (await axios.get(`${ORDER_SERVICE}/carts`)) as DataResponse;
    },
    refetchOnWindowFocus: false,
  });

  return {
    isPending,
    refetch,
    data: (data?.data?.metadata as Cart[]) ?? [],
  };
}

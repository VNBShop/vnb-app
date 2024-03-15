import {useQuery} from '@tanstack/react-query';
import {DataResponse} from '../../../types/auth';
import useAxiosPrivate from '../../api/private/hook/useAxiosPrivate';
import {ORDER_SERVICE} from '../../libs/microservice';
import {Ordered} from '../../../types/order';

type IProps = {
  phone: string;
};

export default function useFetchOrderShipper({phone}: IProps) {
  const axios = useAxiosPrivate();

  const {isLoading, data} = useQuery({
    queryKey: ['get-order-shipper', phone],
    queryFn: async ({queryKey}) => {
      const res: DataResponse<any> = await axios.get(
        `${ORDER_SERVICE}/orders/shipper`,
        {
          params: {
            phone: queryKey[1],
          },
        },
      );

      if (res?.data?.metadata?.length) {
        return res?.data?.metadata;
      } else {
        throw new Error('');
      }
    },
    enabled: !!phone,
    refetchOnMount: false,
    retry: 1,
  });

  console.log('data', data);

  return {
    orders: data as Ordered[],
    loading: isLoading,
  };
}

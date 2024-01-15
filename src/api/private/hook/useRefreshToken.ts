import {API_URL} from '@env';
import axios from 'axios';
import useAuth from '../../../_store/useAuth';

export const useRefreshToken = () => {
  const {data, onRefreshToken} = useAuth(state => state);

  const refresh = async () => {
    const res = await axios.post(
      `${API_URL}/user-service/api/v1/account/refresh-token`,
      {
        refreshToken: data?.refreshToken,
      },
    );

    if (res?.data?.success) {
      await onRefreshToken({
        refreshToken: res?.data?.metadata?.refreshToken,
        accessToken: res?.data?.metadata?.accessToken,
      });
    }
  };

  return refresh;
};

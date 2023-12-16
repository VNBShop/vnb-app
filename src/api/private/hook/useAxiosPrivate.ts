import {useEffect} from 'react';

import {axiosPrivate} from '../axios';
import useAuth from '../../../_store/useAuth';

export default function useAxiosPrivate() {
  const {accessToken} = useAuth(state => state.data);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
}

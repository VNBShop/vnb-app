'use client';

import {useEffect} from 'react';

import {useRefreshToken} from './useRefreshToken';

import {axiosPrivate} from '../axios';
import useAuth from '../../../_store/useAuth';

export default function useAxiosPrivate() {
  const {
    data: {accessToken},
    logout,
  } = useAuth(state => state);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      err => Promise.reject(err),
    );

    let isRefreshing = false;

    const responseIntercept = axiosPrivate.interceptors.response.use(
      res => res,
      async err => {
        if (err?.code === 'ERR_NETWORK') {
          logout();
          return;
        }
        const prevReq = err.config;

        if (err?.response?.status === 401 && !prevReq?.sent) {
          if (!isRefreshing) {
            isRefreshing = true;

            await refresh();
            isRefreshing = false;
          }
          prevReq.sent = true;

          prevReq.headers.Authorization = `Bearer ${accessToken}`;

          return axiosPrivate(prevReq);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return axiosPrivate;
}

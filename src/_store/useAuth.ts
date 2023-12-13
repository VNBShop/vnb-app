/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {AuthProps} from '../types/auth';

type useAuthProps = AuthProps & {
  isFirstApp: boolean;
  accessApp: () => void;
  login: () => void;
  reset: () => void;
};

const useAuth = create<useAuthProps>()(
  persist(
    (set, get) => ({
      accessToken: '',
      avatar: '',
      fullName: '',
      refreshToken: '',
      isFirstApp: true,
      login: () =>
        set(state => ({
          ...state,
          accessToken: '121231312',
          refreshToken: '212122',
        })),
      accessApp: () =>
        set(state => ({
          ...state,
          isFirstApp: false,
        })),
      reset: () =>
        set(state => ({
          accessToken: '',
          avatar: '',
          fullName: '',
          refreshToken: '',
          isFirstApp: true,
        })),
    }),
    {
      name: 'authenticate',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuth;

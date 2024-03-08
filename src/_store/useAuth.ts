/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {AuthProps} from '../../types/auth';

type useAuthProps = {
  isFirstApp: boolean;
  accessApp: () => void;
  login: (metadata: AuthProps) => void;
  logout: () => void;
  onRefreshToken: (
    payload: Pick<AuthProps, 'accessToken' | 'refreshToken'>,
  ) => void;
  data: AuthProps;
  onUpdateProfile: (data: Partial<AuthProps>) => void;
};

const useAuth = create<useAuthProps>()(
  persist(
    (set, get) => ({
      data: {} as AuthProps,
      isFirstApp: true,
      login: (metadata: AuthProps) =>
        set(state => ({
          ...state,
          data: metadata,
        })),
      accessApp: () =>
        set(state => ({
          ...state,
          isFirstApp: false,
        })),
      logout: () =>
        set(state => ({
          ...state,
          data: {} as AuthProps,
        })),
      onRefreshToken: async payload => {
        await set(state => ({
          ...state,
          data: {
            ...state.data,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        }));
      },
      onUpdateProfile: payload => {
        set(state => ({
          ...state,
          data: {
            ...state?.data,
            ...payload,
          },
        }));
      },
    }),
    {
      name: 'authenticate',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuth;

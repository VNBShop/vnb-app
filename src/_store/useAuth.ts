import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export type AuthProps = {
  name: string;
  token: string | undefined;
  setName: () => void;
};

const useAuth = create<AuthProps>()(
  persist(
    set => ({
      name: '',
      token: '',
      setName: () =>
        set(state => {
          return {
            ...state,
            name: 'Dzung',
          };
        }),
    }),
    {
      name: 'authenticate',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuth;

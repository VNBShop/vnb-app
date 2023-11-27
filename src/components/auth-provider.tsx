import {Dispatch, SetStateAction, createContext, useContext} from 'react';

export type AuthProviderProps = {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthProviderProps>(
  {} as AuthProviderProps,
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

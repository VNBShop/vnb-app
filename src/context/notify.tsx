import * as React from 'react';

import {PropsWithChildren, createContext, useContext} from 'react';

import useFetchNotify from '../hooks/forum/useFetchNotification';

type NotifyProps = ReturnType<typeof useFetchNotify>;

export const NotifyContext = createContext<NotifyProps>({} as NotifyProps);

export function useNotifyContext() {
  const context = useContext(NotifyContext);

  if (!context) {
    console.log('useNotifyContext must be use within NotifyContextProvider!');
    return;
  }

  return context;
}

export function NotifyProvider({children}: PropsWithChildren) {
  const notify = useFetchNotify();

  return (
    <NotifyContext.Provider value={notify}>{children}</NotifyContext.Provider>
  );
}

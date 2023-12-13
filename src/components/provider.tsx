import * as React from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren, useState} from 'react';

export default function RQProvider({children}: PropsWithChildren) {
  const [query] = useState(() => new QueryClient());

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}

export type AuthProps = {
  isFirstLogin: boolean;
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  provider: 'LOCAL' | 'GOOGLE';
  notificationRoom: string;
  userId: number;
  roles: ('ADMIN' | 'USER' | 'STORE_OWNER' | 'STORE_MEMBER' | 'SHIPPER')[];
};

export type DataResponse<TData = unknown> = {
  data: {
    metadata: TData & {message?: string};
    success: boolean;
  };
};

export type DataError<TData = unknown> = {
  response: {
    data: {
      metadata: TData & {message?: string};
      success: boolean;
    };
  };
};

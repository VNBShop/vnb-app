export type AuthProps = {
  isFirstLogin?: boolean;
  accessToken: string;
  refreshToken: string;
  fullName: string;
  avatar: string;
  username: string;
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

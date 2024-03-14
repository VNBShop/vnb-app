import {Post} from './forum';
import {User} from './user';

export type RootStackProps = {
  Root: undefined;
  Ordered: {
    tab?: number;
  };
  Cart: undefined;
  Checkout: undefined;
  ProductDetail: {
    productId: number;
  };
  Profile: undefined;
  Login: undefined;
  LoginOption: undefined;
  Wellcome: undefined;
  SignupOption: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    email: string;
  };
  ChangePassword: undefined;
  Identify: undefined;
  ConversationList: undefined;
  ConversationDetail: {
    userId: number;
  };
  UpdateProfile: {
    user?: User;
  };
  PostDetail: {
    post?: Partial<Post>;
  };
  PostSaved: undefined;
  UserProfile: {
    userId: number;
  };
};

export type BottomTabProps = {
  Home: undefined;
  Product: {
    type?: string;
  };
  Forum: undefined;
  Notification: undefined;
  Personal: undefined;
};

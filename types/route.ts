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
  ConversationDetail: undefined;
  UpdateProfile: {
    user?: User;
  };
  PostDetail: {
    post?: Partial<Post>;
  };
  PostSaved: undefined;
};

export type BottomTabProps = {
  Home: undefined;
  Product: undefined;
  Forum: undefined;
  Notification: undefined;
  Personal: undefined;
};

import {z} from 'zod';
import {signUpSchema} from '../../libs/validatetions/auth';
import {axiosUser} from '../axios/axios-user';

export default async function signUp(payload: z.infer<typeof signUpSchema>) {
  const res = await axiosUser.post('/account/signup', payload);

  return res;
}

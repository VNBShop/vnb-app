import {z} from 'zod';
import {loginSchema} from '../../libs/validatetions/auth';
import {axiosUser} from '../axios/axios-user';

export async function login(payload: z.infer<typeof loginSchema>) {
  const res = await axiosUser.post('/account/login', payload);

  return res;
}

export async function googleLogin(payload: {
  idToken: string;
  platform: string;
}) {
  const res = await axiosUser.post('/account/google-login', payload);

  return res;
}

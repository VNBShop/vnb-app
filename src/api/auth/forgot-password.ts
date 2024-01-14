import {z} from 'zod';
import {forgotPassSchema, signUpSchema} from '../../libs/validatetions/auth';
import {axiosUser} from '../axios/axios-user';

export async function forgotPassword(
  payload: z.infer<typeof forgotPassSchema>,
) {
  const res = await axiosUser.post(
    '/account/send-otp-mail-reset-password',
    payload,
  );

  return res;
}

export async function resetPassword(payload: z.infer<typeof signUpSchema>) {
  const res = await axiosUser.post('/account/reset-password', payload);
  return res;
}

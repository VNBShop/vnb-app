import axios from 'axios';
import {z} from 'zod';
import {forgotPassSchema, signUpSchema} from '../../libs/validatetions/auth';
import {API_URL} from '@env';

export async function forgotPassword(
  payload: z.infer<typeof forgotPassSchema>,
) {
  const res = await axios.post(
    `${API_URL}/account/send-otp-mail-reset-password`,
    payload,
  );
  return res;
}

export async function resetPassword(payload: z.infer<typeof signUpSchema>) {
  const res = await axios.post(`${API_URL}/account/reset-password`, payload);
  return res;
}

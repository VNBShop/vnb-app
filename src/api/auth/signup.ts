import {API_URL} from '@env';
import axios from 'axios';
import {z} from 'zod';
import {signUpSchema} from '../../libs/validatetions/auth';

export default async function signUp(payload: z.infer<typeof signUpSchema>) {
  const res = await axios.post(`${API_URL}/account/signup`, payload);

  return res;
}

import axios from 'axios';
import {z} from 'zod';
import {loginSchema} from '../../libs/validatetions/auth';
import {API_URL} from '@env';

export async function login(payload: z.infer<typeof loginSchema>) {
  const res = await axios.post(`${API_URL}/account/login`, payload);

  return res;
}

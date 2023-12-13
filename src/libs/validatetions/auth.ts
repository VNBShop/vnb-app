import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, {
    message: 'Please enter email address!',
  }),
  password: z.string().min(1, {
    message: 'Please enter password!',
  }),
});

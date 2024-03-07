import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const UpdateInfoOrderSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required',
    })
    .regex(phoneRegex, 'Phone number is not valid!'),
});

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  address: z.string(),
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Phone number is not valid!')
    .optional(),
  gender: z.string(),
  dateOfBirth: z.coerce.date(),
});

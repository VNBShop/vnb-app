import axios from 'axios';
import {API_URL} from '@env';

export type OTPPayloadProps = {
  otpCode: string;
  email: string;
  type: 'REGISTER' | 'RESET_PASSWORD';
};

export async function confirmOTP(payload: OTPPayloadProps) {
  const res = await axios.post(`${API_URL}/account/confirm-otp`, payload);
  return res;
}

import {API_URL} from '@env';
import axios from 'axios';

export const axiosUser = axios.create({
  baseURL: `${API_URL}/user-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

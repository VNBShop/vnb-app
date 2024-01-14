import {API_URL} from '@env';
import axios from 'axios';

export const axiosStore = axios.create({
  baseURL: `${API_URL}/store-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

import axios from 'axios';
import {API_URL} from '@env';

export const axiosProduct = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

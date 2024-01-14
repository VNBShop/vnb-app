import {API_URL} from '@env';
import axios from 'axios';

export const axiosProduct = axios.create({
  baseURL: `${API_URL}/product-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

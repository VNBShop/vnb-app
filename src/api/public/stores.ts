import {axiosStore} from '../axios/axios-store';

export default async function getStores() {
  const res = await axiosStore.get('/stores');
  return res;
}

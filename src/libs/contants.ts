import {BrandProps} from '../../types/product';
import {
  backpack,
  badminton,
  bag,
  banking,
  cashondelivery,
  delivery,
  logout,
  pant,
  password,
  processing,
  racket,
  refund,
  shipping,
  shirt,
  shoe,
  skirt,
  tenis,
  vnpay,
} from '../assets';

export const navList = [
  {
    id: 1,
    label: 'Racket',
    icon: racket,
  },
  {
    id: 2,
    label: 'Shoes',
    icon: shoe,
  },
  {
    id: 3,
    label: 'Shirt',
    icon: shirt,
  },
  {
    id: 4,
    label: 'Skirt',
    icon: skirt,
  },
  {
    id: 5,
    label: 'Pant',
    icon: pant,
  },
  {
    id: 6,
    label: 'Bag',
    icon: bag,
  },
  {
    id: 7,
    label: 'Backpack',
    icon: backpack,
  },
];

export const fakeData = [
  {
    id: 1,
    image: tenis,
    name: 'Babolat Pure Drive Team 2021',
    price: 3200000,
  },
  {
    id: 2,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
  {
    id: 3,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
  {
    id: 4,
    image: tenis,
    name: 'Babolat Pure Drive Team 2021',
    price: 3200000,
  },
  {
    id: 5,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
  {
    id: 6,
    image: tenis,
    name: 'Babolat Pure Drive Team 2021',
    price: 3200000,
  },
  {
    id: 7,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
  {
    id: 8,
    image: tenis,
    name: 'Babolat Pure Drive Team 2021',
    price: 3200000,
  },
  {
    id: 9,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
  {
    id: 10,
    image: badminton,
    name: 'Yonex Nanoflare X7',
    price: 2800000,
  },
];

export const paymentMethod = [
  {
    id: 1,
    label: 'VNPay',
    logo: vnpay,
  },
  {
    id: 2,
    label: 'Banking',
    logo: banking,
  },
  {
    id: 3,
    label: 'Cash on delivery',
    logo: cashondelivery,
  },
];

export const navPerson = [
  {
    id: 1,
    label: 'Processing',
    logo: processing,
  },
  {
    id: 2,
    label: 'Shipping',
    logo: shipping,
  },
  {
    id: 3,
    label: 'Delivered',
    logo: delivery,
  },
  {
    id: 4,
    label: 'Returned',
    logo: refund,
  },
];

export const actionOption = [
  {
    id: 1,
    label: 'Change password',
    icon: password,
    bgColor: '#FFC0D9',
    redirect: 'ChangePassword',
  },
  // {
  //   id: 2,
  //   label: 'Save',
  //   icon: save,
  //   bgColor: '#4FC0D0',
  // },
  {
    id: 2,
    label: 'Logout',
    bgColor: '#C1AEFC',
    icon: logout,
  },
];

export const brands: BrandProps[] = [
  {
    brandId: 1,
    brandName: 'Victor',
  },
  {
    brandId: 2,
    brandName: 'Yonex',
  },
  {
    brandId: 3,
    brandName: 'RSL',
  },
  {
    brandId: 4,
    brandName: 'Carlton',
  },
  {
    brandId: 5,
    brandName: 'Bad M',
  },
  {
    brandId: 6,
    brandName: 'Fz Forza',
  },
  {
    brandId: 7,
    brandName: 'Dunlop',
  },
  {
    brandId: 8,
    brandName: 'Babolat',
  },
  {
    brandId: 9,
    brandName: 'Adidas',
  },
  {
    brandId: 10,
    brandName: 'Slazenger',
  },
  {
    brandId: 12,
    brandName: 'Badminton Nederland',
  },
  {
    brandId: 13,
    brandName: 'Kawasaki',
  },
];

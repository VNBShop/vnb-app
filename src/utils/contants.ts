import {
  accessorie,
  backpack,
  badminton,
  bag,
  banking,
  cashondelivery,
  delivery,
  pant,
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
  {
    id: 8,
    label: 'Other',
    icon: accessorie,
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

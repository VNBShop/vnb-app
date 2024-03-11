import {OrderedStatus} from '../../types/order';
import {ProductBrand} from '../../types/product';
import {
  backpack,
  badminton,
  bag,
  cartWhite,
  cashondelivery,
  delivery,
  logout,
  orderWhite,
  pant,
  password,
  processing,
  racket,
  refund,
  save,
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
    label: 'Cash on delivery',
    value: 'CASH',
    logo: cashondelivery,
  },
  {
    id: 2,
    label: 'VNPay',
    value: 'CREDIT',
    logo: vnpay,
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
    label: 'Cancelled',
    logo: refund,
  },
];

export const actionOption = [
  {
    id: 5,
    label: 'Save',
    icon: save,
    bgColor: '#B47B84',
    redirect: 'PostSaved',
  },
  {
    id: 4,
    label: 'Cart',
    icon: cartWhite,
    bgColor: '#A5DD9B',
    redirect: 'Cart',
  },
  {
    id: 3,
    label: 'Ordered',
    icon: orderWhite,
    bgColor: '#9caeff',
    redirect: 'Ordered',
  },
  {
    id: 1,
    label: 'Change password',
    icon: password,
    bgColor: '#FFC0D9',
    redirect: 'ChangePassword',
  },
  {
    id: 2,
    label: 'Logout',
    bgColor: '#C1AEFC',
    icon: logout,
  },
];

export const brands: ProductBrand[] = [
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

export const sorts = [
  {
    id: 1,
    label: 'A-Z',
    value: 'name.asc',
  },
  {
    id: 2,
    label: 'Z-A',
    value: 'name.desc',
  },
  {
    id: 3,
    label: 'Price increasing',
    value: 'price.asc',
  },
  {
    id: 4,
    label: 'Price decreasing',
    value: 'price.desc',
  },
];

export const colorsOrderedStatus: Record<
  OrderedStatus,
  {
    color: string;
    backgroundColor: string;
  }
> = {
  CANCELLED: {
    color: '#fa4515',
    backgroundColor: '#ffe4d5',
  },
  DELIVER_FAILED: {
    backgroundColor: '#fceae7',
    color: '#aa2629',
  },
  DELIVERING: {
    color: '#492E87',
    backgroundColor: '#e0dfff',
  },
  PENDING: {
    color: '#ca8d04',
    backgroundColor: '#fefac3',
  },
  RE_DELIVERING: {
    color: '#773f17',
    backgroundColor: '#fdf3d7',
  },
  SUCCESS: {
    color: '#5d8e22',
    backgroundColor: '#e9f5d2',
  },
};

export const orderedStatusOption: {
  label: string;
  value: OrderedStatus;
}[] = [
  {
    label: 'Success',
    value: 'SUCCESS',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Delivering',
    value: 'DELIVERING',
  },
  {
    label: 'Re delivering',
    value: 'RE_DELIVERING',
  },
  {
    label: 'Failed',
    value: 'DELIVER_FAILED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
];

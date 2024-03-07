export type Cart = {
  cartId: number;
  productId: number;
  productName: string;
  productSizeName: string;
  productImage: string;
  quantity: number;
  productPriceUnit: number;
  productSizeId: number;
};

export type PaymentType = 'CASH' | 'CREDIT';

export type Ordered = {
  orderId: number;
  customer: {
    customerId: number;
    customerName: string;
  };
  orderStatus: OrderedStatus;
  paymentType: PaymentType;
  totalPrice: number;
  products: ProductOrdered[];
  orderDate: Date;
};

export type ProductOrdered = {
  productId: number;
  productName: string;
  productSizeId: number;
  productSizeName: string;
  quantity: number;
  priceUnit: number;
  productImage: string;
};

export type OrderedStatus =
  | 'PENDING'
  | 'CANCELLED'
  | 'DELIVERING'
  | 'RE_DELIVERING'
  | 'SUCCESS'
  | 'DELIVER_FAILED';

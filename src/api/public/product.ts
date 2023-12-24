import {ProductDetail} from '../../../types/product';
import {axiosProduct} from '../axios/axios-product';

export async function getProducts({
  currentPage = 1,
  filter,
}: {
  currentPage?: number;
  filter?: any;
}) {
  if (filter?.price_range) {
    const splitPrice = filter.price_range.split('-');

    filter = {
      ...filter,
      minPrice: splitPrice[0],
      maxPrice: splitPrice[1],
    };

    delete filter.price_range;
  }

  const res = await axiosProduct.get('/product', {
    params: {
      currentPage,
      pageSize: 10,
      ...filter,
    },
  });

  if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
    return res?.data?.metadata?.data;
  } else {
    throw new Error('');
  }
}

export async function getProductDetail(productId: any) {
  const res = await axiosProduct.get(`/product/${productId}`);

  if (res?.data?.success) {
    return res?.data?.metadata as ProductDetail;
  } else {
    throw new Error('');
  }
}

import {ProductDetail} from '../../../types/product';
import {axiosProduct} from '../axios/axios-product';

export async function getProducts({
  currentPage = 1,
  pageSize = 10,
  filter,
}: {
  currentPage?: number;
  pageSize?: number;
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

  const res = await axiosProduct.get('/products', {
    params: {
      currentPage,
      pageSize: pageSize,
      ...filter,
    },
  });

  if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
    return {
      products: res?.data?.metadata?.data,
      total: res?.data?.metadata?.total,
    };
  } else {
    throw new Error('');
  }
}

export async function getProductDetail(productId: any) {
  const res = await axiosProduct.get(`/products/${productId}`);

  if (res?.data?.success) {
    return res?.data?.metadata as ProductDetail;
  } else {
    throw new Error('');
  }
}

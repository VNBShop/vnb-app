export type Products = {
  productId: number;
  productName: string;
  productImages: string[];
  productPrice: number;
};

export type ProductsList = {
  data: Products[];
  maxPage?: number;
  nextPage: number;
  currentPage: number;
  previousPage?: number;
  total: number;
};

export type ProductDetail = Products & {
  productBrand: string;
  productRating: number;
  productStatus: number;
  productDetail: Record<string, string | undefined | null>;
  productComments: ProductComment[];
  productStores: ProductStore[];
};

export type ProductComment = {
  commenterId: string;
  comment: string;
  commenterName: string;
  commenterAvatar: string;
  commentedAt: string;
};

export type BrandProps = {
  brandId: number;
  brandName: string;
};

export type ProductStore = {
  storeId: number;
  storeName: string;
};

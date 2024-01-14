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
  productStatus: boolean;
  productDetail: Record<string, string | undefined | null>;
  productComments: ProductComment[];
  productStores: ProductStore[];
  productStocks: ProductStock[];
  productIsHaveSize: boolean;
};

export type ProductComment = {
  commentId: string;
  commentContent: string;
  commentAuthor: string;
  commentAuthorAvatar: string;
  commentDate: string;
};

export type ProductStock = {
  productStockId: number;
  productStockSize: string;
  productStockQuantity: string;
};

export type ProductBrand = {
  brandId: number;
  brandName: string;
};

export type ProductStore = {
  storeId: number;
  storeName: string;
  storeAddress?: string;
  storePhone?: string;
  storeEmail?: string;
  productSizeIds?: string[];
};

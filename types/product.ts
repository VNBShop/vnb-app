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
  productStores: ProductStore[];
  productStocks: ProductStock[];
  productIsHaveSize: boolean;
  canComment: boolean;
};

export type ProductComment = {
  commentId: number;
  commentContent: string;
  commentAuthor: string;
  commentDate: Date;
  commentAuthorAvatar: string;
  yourComment: boolean;
};

export type ProductStock = {
  productStockId: number;
  productStockSize: string;
  productStockQuantity: number;
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

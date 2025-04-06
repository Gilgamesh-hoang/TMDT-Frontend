export interface Product {
  id: number;
  thumbnail: string;
  name: string;
  rating: number;
  sold: number;
  price: number;
  isOnSale?: boolean;
  discountPercent?: number;
  discountPrice?: number;
}

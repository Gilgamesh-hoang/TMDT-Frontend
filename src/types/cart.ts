import { ProductSummaryResponse } from "@/types/product.ts";

export interface CartItem {
  id: string;
  product: ProductSummaryResponse;
  quantity: number;
}

export interface AddCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  cartItemId: string;
  productId: string;
  quantity: number;
}

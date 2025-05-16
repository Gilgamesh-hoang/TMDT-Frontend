import { Category } from "@/types/category.ts";
import { ImageResponse } from "./image";

export interface ProductSummaryResponse {
  id: string;
  category: Category;
  name: string;
  totalViews: number;
  volume: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  rating?: number;
  sold?: number;
}
export interface Product {
  images: ImageResponse[];
  product: ProductSummaryResponse;
  description: string;
}

export interface ProductCreateRequest {
  name: string;
  categoryId: string;
  description: string;
  status: number;
  thumbnail?: string;
  imageIds?: string[];
  volume: string;
  price: number;
  discountPrice: number;
  quantity: number;
}

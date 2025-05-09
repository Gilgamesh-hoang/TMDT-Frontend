import { Category } from "@/types/category.ts";
import { ImageResponse } from "./image";

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  images: ImageResponse[];
  totalViews: number;
  volume: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  rating?: number;
  sold?: number;
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

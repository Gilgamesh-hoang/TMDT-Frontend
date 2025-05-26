import { Category } from "@/types/category.ts";
import { ImageResponse } from "./image";
import { PaginationRequest } from "@/types/pagination";
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
export enum SortOption {
  NEWEST = "NEWEST",
  BEST_SELLER = "BEST_SELLER",
  PRICE = "PRICE",
  MOST_VIEWED = "MOST_VIEWED"
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export interface ProductFilterDTO {
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortOption?: SortOption;
  sortDirection?: SortDirection;
   priceSortDirection?: SortDirection;
}

export interface SearchFilterRequest extends PaginationRequest {
  search?: string;
  filter?: ProductFilterDTO;
}
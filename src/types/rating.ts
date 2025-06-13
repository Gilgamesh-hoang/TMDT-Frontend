import { Author } from "./comment";

export interface RatingCreateRequest {
  productId: string;
  content: string;
  rating: number;
}

export interface RatingStatsResponse {
  count: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
}
export interface RatingReponse {
  id: string;
  rating: number;
  author: Author;
  createdDate: string;
  content: string;
}

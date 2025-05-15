import { User } from "@/types/models.ts";

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  currentPage: number;
  totalPage: number;
  data: T;
}

export interface AppNotificationResponse {
  message: string;
  sender: string;
}

export interface JwtResponse {
  token: string;
}
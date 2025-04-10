import {User} from "@/types/models.ts";

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginGoogleRequest {
    token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword?: string;
    fullName?: string;
    phone: string;
}
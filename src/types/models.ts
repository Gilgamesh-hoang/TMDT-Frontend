export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    role: UserRole;
}
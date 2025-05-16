export enum UserRole {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_EMPLOYEE = 'ROLE_EMPLOYEE',
    ROLE_ADMIN = 'ROLE_ADMIN',
}



export interface User {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    roles: UserRole[];
}
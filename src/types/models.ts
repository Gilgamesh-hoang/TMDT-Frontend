export enum UserRole {
  ROLE_CUSTOMER = "ROLE_CUSTOMER",
  ROLE_EMPLOYEE = "ROLE_EMPLOYEE",
  ROLE_ADMIN = "ROLE_ADMIN",
}
export interface CustomerDetailResponse extends AdminAccountResponse {
  deliveredOrderCount: number;
  cancelledOrderCount: number;
  totalSpent: number;
}

export interface AdminAccountResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  status: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  roles: UserRole[];
}

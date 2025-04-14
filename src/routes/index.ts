import { ADMIN_ROUTES, ROUTES } from "@/types/constant.ts";
import { CustomerLayout } from "@/layouts/CustomerLayout.tsx";
import { Home } from "@/pages/customer/Home.tsx";
import { AdminLayout } from "@/layouts/AdminLayout.tsx";
import { Login } from "@/pages/customer/Login.tsx";
import { Register } from "@/pages/customer/Register.tsx";
import { Dashboard } from "@/pages/admin/Dashboard";
import { VerifyEmail } from "@/pages/customer/VerifyEmail";
import ForgotPassword from "@/pages/customer/ForgotPassword.tsx";

export interface RouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  children?: RouteType[];
}

export const publicRoutes: RouteType[] = [
  {
    path: ROUTES.HOME,
    element: Home,
    layout: CustomerLayout,
  },
  {
    path: ROUTES.LOGIN,
    element: Login,
    layout: CustomerLayout,
  },
  {
    path: ROUTES.REGISTER,
    element: Register,
    layout: CustomerLayout,
  },
  {

    path: ROUTES.VERIFY_EMAIL,
    element: VerifyEmail,
    layout: CustomerLayout,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: ForgotPassword,
    layout: CustomerLayout,
  },

];

export const customerPrivateRoutes: RouteType[] = [];

export const adminRoutes: RouteType[] = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: Dashboard,
    layout: AdminLayout,
  },
];

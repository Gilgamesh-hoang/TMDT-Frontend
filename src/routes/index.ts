import { ADMIN_ROUTES, ROUTES } from "@/types/constant.ts";
import { CustomerLayout } from "@/layouts/CustomerLayout.tsx";
import { Home } from "@/pages/customer/Home.tsx";
import { AdminLayout } from "@/layouts/AdminLayout.tsx";
import { Login } from "@/pages/customer/Login.tsx";
import { Register } from "@/pages/customer/Register.tsx";
import { Dashboard } from "@/pages/admin/Dashboard";
import { VerifyEmail } from "@/pages/customer/VerifyEmail";
import ForgotPassword from "@/pages/customer/ForgotPassword.tsx";
import Cart from "@/pages/customer/Cart.tsx";
import { ProductDetail } from "@/pages/customer/ProductDetail.tsx";
import { Wishlist } from "@/pages/customer/Wishlist";
import CheckoutForm from "@/pages/customer/CheckoutForm.tsx";

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
    path: ROUTES.PRODUCT_DETAIL,
    element: ProductDetail,
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

export const customerPrivateRoutes: RouteType[] = [
  {
    path: ROUTES.CART,
    element: Cart,
    layout: CustomerLayout,
  },
  {
    path: ROUTES.WISHLIST,
    element: Wishlist,
    layout: CustomerLayout,
  },
  {
    path: ROUTES.CHECKOUT,
    element: CheckoutForm,
    layout: CustomerLayout,
  },
];

export const adminRoutes: RouteType[] = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: Dashboard,
    layout: AdminLayout,
  },
];

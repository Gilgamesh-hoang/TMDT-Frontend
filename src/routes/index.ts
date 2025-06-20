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
import { Wishlist } from "@/pages/customer/Wishlist";
import { ProductDetail } from "@/pages/customer/ProductDetail";
import { SearchPage } from "@/pages/customer/SearchPage";
import CheckoutForm from "@/pages/customer/CheckoutForm.tsx";
import { ManageProduct } from "@/pages/admin/manage-product";
import { ProductSaveForm } from "@/pages/admin/manage-product/ProductSaveForm";
import { ManageCategory } from "@/pages/admin/manage-category";
import { CategoryDetail } from "@/pages/admin/manage-category/CategoryDetail";
import { ManageOrder } from "@/pages/admin/manage-order";
import { OrderDetail } from "@/pages/admin/manage-order/order-detail/OrderDetail";
import { ManageDeletedProduct } from "@/pages/admin/manage-deleted-product";
import { ProductUpdateForm } from "@/pages/admin/manage-product/ProductUpdateForm";
import { ImageUpdateForm } from "@/pages/admin/manage-product/ImageUpdateForm";
import { ManageComment } from "@/pages/admin/manage-comment";
import { ManageRating } from "@/pages/admin/manage-rating";
import UserProfile from "@/pages/customer/profile/UserProfile";
import { UpdateEmail } from "@/pages/customer/profile/UpdateEmail";

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
    path: ROUTES.SEARCH_PRODUCT,
    element: SearchPage,
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
   {
    path: ROUTES.PROFILE,
    element: UserProfile,
    layout: CustomerLayout,
  },
   {
    path: ROUTES.UPDATE_EMAIL,
    element: UpdateEmail,
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
  {
    path: ADMIN_ROUTES.MANAGE_CATEGORY,
    element: ManageCategory,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.MANAGE_PRODUCT,
    element: ManageProduct,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.MANAGE_DELETED_PRODUCT,
    element: ManageDeletedProduct,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.CATEGORY_DETAIL,
    element: CategoryDetail,
    layout: AdminLayout,
  },
  {
    path: `${ADMIN_ROUTES.MANAGE_PRODUCT}/${ADMIN_ROUTES.SAVE_PRODUCT}`,
    element: ProductSaveForm,
    layout: AdminLayout,
  },
  {
    path: `${ADMIN_ROUTES.MANAGE_PRODUCT}/:productId/${ADMIN_ROUTES.SAVE_PRODUCT}`,
    element: ProductUpdateForm,
    layout: AdminLayout,
  },
  {
    path: `${ADMIN_ROUTES.MANAGE_PRODUCT}/:productId/${ADMIN_ROUTES.SAVE_PRODUCT}/images`,
    element: ImageUpdateForm,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.MANAGE_ORDER,
    element: ManageOrder,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.MANAGE_COMMENT,
    element: ManageComment,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.MANAGE_RATING,
    element: ManageRating,
    layout: AdminLayout,
  },
  {
    path: ADMIN_ROUTES.ORDER_DETAIL,
    element: OrderDetail,
    layout: AdminLayout,
  },
];

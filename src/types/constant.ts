import { ManageRating } from "@/pages/admin/manage-rating";

export const ACCESS_TOKEN_LOCALSTORAGE = "access_token";
export const SERVER_URL = "http://localhost:8182/api/v1";
export const CLIENT_URL = "http://localhost:5173";
export const WEBSOCKER_URL = "ws://localhost:8182/ws";
export const ENABLE_WEBSOCKET = false;
export const AVATAR_SRC = "https://avatar.iran.liara.run/public";
export const MOMO_IMAGE =
  "https://cdn.prod.website-files.com/64199d190fc7afa82666d89c/6491bee997eba92836f95d0c_momo_wallet.png";
export const VNPAY_IMAGE =
  "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-350x65.png";

export const ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/dang-nhap",
  REGISTER: "/dang-ky",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/quen-mat-khau",
  CART: "/gio-hang",
  PRODUCT_DETAIL: "/san-pham/:productId",
  WISHLIST: "/wishlist",
  CHECKOUT: "/thanh-toan",
  SEARCH_PRODUCT: "/tim-kiem",
});

export const ADMIN_ROUTES = Object.freeze({
  DASHBOARD: "/admin/dashboard",
  UNAUTHORIZED: "/admin/unauthorized",
  MANAGE_PRODUCT: "/admin/manage-products",
  MANAGE_DELETED_PRODUCT: "/admin/manage-deleted-products",
  MANAGE_ORDER: "/admin/manage-orders",
  ORDER_DETAIL: "/admin/manage-orders/:id",
  MANAGE_CATEGORY: "/admin/manage-categories",
  MANAGE_COMMENT: "/admin/manage-comments",
  MANAGE_RATING: "/admin/manage-ratings",
  MANAGE_CUSTOMER: "/admin/manage-customers",
  MANAGE_EMPLOYEE: "/admin/manage-employees",
  CATEGORY_DETAIL: "/admin/manage-categories/:id",
  SAVE_PRODUCT: "save",
});

export const ADMIN_ONLY = [
  ADMIN_ROUTES.MANAGE_RATING,
  ADMIN_ROUTES.MANAGE_EMPLOYEE,
];

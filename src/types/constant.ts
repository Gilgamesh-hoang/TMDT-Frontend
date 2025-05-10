export const ACCESS_TOKEN_LOCALSTORAGE = "access_token";
export const SERVER_URL = "http://localhost:8182/api/v1";

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
  MANAGE_PRODUCT: "/admin/manage-products",
  MANAGE_CATEGORY: "/admin/manage-categories",
  CATEGORY_DETAIL: "/admin/manage-categories/:id",
  SAVE_PRODUCT: "save",
});

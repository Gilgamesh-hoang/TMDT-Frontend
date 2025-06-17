import { authApi } from "@/api/auth.ts";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice.ts";
import cartReducer from "@/redux/slices/cartSlice.ts";
import wishlistReducer from "@/redux/slices/wishlistSlice.ts";
import { userApi } from "@/api/customerApi/user.ts";
import { productApi } from "@/api/customerApi/product.ts";
import { cartApi } from "@/api/customerApi/cart.ts";
import { addressApi } from "@/api/customerApi/address.ts";
import { adminProductApi } from "@/api/adminApi/product";
import { adminCategoryApi } from "@/api/adminApi/category";
import { adminImageApi } from "@/api/adminApi/image";
import { vnpayApi } from "@/api/customerApi/vnpay.ts";
import { momoApi } from "@/api/customerApi/momo.ts";
import { categoryApi } from "@/api/customerApi/category";
import { commentApi } from "@/api/customerApi/comment";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { adminOrderApi } from "@/api/adminApi/order";
import { ratingApi } from "@/api/customerApi/rating";
import { adminCommentApi } from "@/api/adminApi/comment";
import { adminRatingApi } from "@/api/adminApi/rating";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
    [adminProductApi.reducerPath]: adminProductApi.reducer,
    [adminCommentApi.reducerPath]: adminCommentApi.reducer,
    [adminRatingApi.reducerPath]: adminRatingApi.reducer,
    [adminCategoryApi.reducerPath]: adminCategoryApi.reducer,
    [adminImageApi.reducerPath]: adminImageApi.reducer,
    [adminOrderApi.reducerPath]: adminOrderApi.reducer,
    [vnpayApi.reducerPath]: vnpayApi.reducer,
    [momoApi.reducerPath]: momoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(productApi.middleware)
      .concat(addressApi.middleware)
      .concat(commentApi.middleware)
      .concat(ratingApi.middleware)
      .concat(adminProductApi.middleware)
      .concat(adminCategoryApi.middleware)
      .concat(adminImageApi.middleware)
      .concat(adminOrderApi.middleware)
      .concat(adminCommentApi.middleware)
      .concat(adminRatingApi.middleware)
      .concat(vnpayApi.middleware)
      .concat(momoApi.middleware)
      .concat(categoryApi.middleware)
      .concat(addressApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

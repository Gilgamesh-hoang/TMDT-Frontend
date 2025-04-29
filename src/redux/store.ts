import { authApi } from "@/api/auth.ts";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice.ts";
import cartReducer from "@/redux/slices/cartSlice.ts";
import wishlistReducer from "@/redux/slices/wishlistSlice.ts";
import { userApi } from "@/api/customerApi/user.ts";
import { productApi } from "@/api/customerApi/product.ts";
import { cartApi } from "@/api/customerApi/cart.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(productApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

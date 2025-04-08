import {exampleApi} from "@/api/customerApi/exampleApi";
import {authApi} from "@/api/auth.ts";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice.ts";
import {userApi} from "@/api/customerApi/user.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [exampleApi.reducerPath]: exampleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(exampleApi.middleware)
            .concat(userApi.middleware)
            .concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
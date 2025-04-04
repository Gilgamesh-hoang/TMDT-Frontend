import { exampleApi } from "@/api/customerApi/exampleApi";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exampleApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

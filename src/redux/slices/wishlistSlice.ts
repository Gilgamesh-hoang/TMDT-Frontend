import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem } from "@/types/wishlist";
const loadWishlist = () => {
  const store = localStorage.getItem("wishlist");
  if (store == null) return [];
  return JSON.parse(store) as WishlistItem[];
};
interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: loadWishlist(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === newItem.product.id,
      );
      if (existingItem) return;
      state.items.push(newItem);
      syncLocalStorage(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
      syncLocalStorage(state.items);
    },
  },
});

const syncLocalStorage = (items: WishlistItem[]) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

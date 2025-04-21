import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem} from "@/types/cart.ts";

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

// State ban đầu
const initialState: CartState = {
    items: [],
    totalPrice: 0,
};

// Hàm tính tổng tiền
const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
        const price = item.product.discountPrice || item.product.price;
        return total + price * item.quantity;
    }, 0);
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (existingItem) {
                // Nếu CartItem đã tồn tại (trường hợp cập nhật), thay thế
                existingItem.quantity = newItem.quantity;
                existingItem.product = newItem.product;
            } else {
                // Nếu CartItem mới, thêm vào danh sách
                state.items.push(newItem);
            }

            // Cập nhật tổng tiền
            state.totalPrice = calculateTotalPrice(state.items);
        },

        // Tăng số lượng CartItem
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const cartItemId = action.payload;
            const item = state.items.find((item) => item.id === cartItemId);

            if (item) {
                item.quantity += 1;
                state.totalPrice = calculateTotalPrice(state.items);
            }
        },

        // Giảm số lượng CartItem
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const cartItemId = action.payload;
            const item = state.items.find((item) => item.id === cartItemId);

            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    // Nếu số lượng về 0, xóa CartItem
                    state.items = state.items.filter((item) => item.id !== cartItemId);
                }
                state.totalPrice = calculateTotalPrice(state.items);
            }
        },

        // Xóa một CartItem
        removeFromCart: (state, action: PayloadAction<string>) => {
            const cartItemId = action.payload;
            state.items = state.items.filter((item) => item.id !== cartItemId);
            state.totalPrice = calculateTotalPrice(state.items);
        },

        // Xóa toàn bộ giỏ hàng
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

// Export actions
export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
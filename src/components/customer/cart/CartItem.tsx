import {FC, useState} from 'react';
import {FaTrash} from 'react-icons/fa';
import {formatCurrency} from "@/lib/utils.ts";
import type {CartItem as CartItemType} from "@/types/cart.ts";
import {useDeleteCartMutation, useUpdateCartMutation} from "@/api/customerApi/cart.ts";
import {useDispatch} from "react-redux";
import {decreaseQuantity, increaseQuantity, removeFromCart} from "@/redux/slices/cartSlice.ts";

interface CartItemProps {
    item: CartItemType;
    // removeItem: (itemId: string) => void;
}

const CartItem: FC<CartItemProps> = ({item}) => {
    const [updateCart] = useUpdateCartMutation();
    const [deleteCart] = useDeleteCartMutation();
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const product = item.product;
    const dispatch = useDispatch();

    // Tăng số lượng
    const handleIncreaseQuantity = async (cartItemId: string, productId: string, quantity: number) => {
        if (quantity >= 50) {
            return;
        }

        try {
            const response = await updateCart({
                cartItemId,
                productId,
                quantity: quantity + 1,
            }).unwrap();

            // Cập nhật số lượng trong Redux
            dispatch(increaseQuantity(response.data.id)); // Cập nhật Redux
            setQuantity(quantity + 1); // Cập nhật số lượng trong state
        } catch (err) {
            console.error('Failed to increase quantity:', err);
        }
    };

    // Giảm số lượng
    const handleDecreaseQuantity = async (cartItemId: string, productId: string, quantity: number) => {
        if (quantity <= 1) {
            return;
        }

        try {
            const response = await updateCart({
                cartItemId,
                productId,
                quantity: quantity - 1,
            }).unwrap();

            dispatch(decreaseQuantity(response.data.id)); // Cập nhật Redux
            setQuantity(quantity - 1); // Cập nhật số lượng trong state
        } catch (err) {
            console.error('Failed to decrease quantity:', err);
        }
    };

    // Xóa sản phẩm
    const handleRemoveFromCart = async (cartItemId: string) => {
        try {
            await deleteCart(cartItemId).unwrap();
            dispatch(removeFromCart(cartItemId)); // Cập nhật Redux
        } catch (err) {
            console.error('Failed to remove from cart:', err);
        }
    };


    return (
        <div key={item.id} className="flex items-center justify-between p-4 border-b border-b-gray-100">
            {/* Hình ảnh sản phẩm */}
            <div className="w-24 h-24 bg-gray-300 rounded-md">
                <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover rounded-md"/>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1 ml-4">
                <h5 className="font-semibold">{product.name}</h5>
                <p className="text-sm text-gray-500">{product.category.name}</p>
                <p className="text-sm text-gray-500">Size: {product.volume}</p>
            </div>
            <div className="flex gap-10">
                {/* Giá */}
                <div className="text-lg ">{formatCurrency( product.discountPrice || product.price * quantity)}</div>


                {/* Số lượng */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleDecreaseQuantity(item.id, product.id, quantity)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => handleIncreaseQuantity(item.id, product.id, quantity)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                {/* Nút xóa */}
                <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500  cursor-pointer"
                >
                    <FaTrash/>
                </button>
            </div>
        </div>
    );

};
export default CartItem;
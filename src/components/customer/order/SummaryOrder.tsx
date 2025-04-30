import {FC} from "react";
import {formatCurrency} from "@/lib/utils.ts";
import {ROUTES} from "@/types/constant.ts";
import {CartItem} from "@/types/cart.ts";

interface SummaryOrderProps {
    cartItems: CartItem[];
}

const SummaryOrder: FC<SummaryOrderProps> = ({cartItems}) => {

    const calculateTotalPrice = (items: CartItem[]) => {
        return items.reduce((total, item) => {
            const price = item.product.discountPrice || item.product.price;
            return total + price * item.quantity;
        }, 0);
    }

    const totalPrice = calculateTotalPrice(cartItems);


    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span>Tổng tiền tạm tính</span>
                    <span className="text-orange-500">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-500">{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Tổng tiền đơn hàng</span>
                    <span className="text-orange-500">{formatCurrency(totalPrice)}</span>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 cursor-pointer"
            >
                Đặt hàng
            </button>
            <a
                href={ROUTES.CART}
                className="block text-center mt-2 text-blue-500"
            >
                Quay lại giỏ hàng
            </a>
        </div>
    );
}
export default SummaryOrder;
import {FC} from "react";
import {formatCurrency} from "@/lib/utils.ts";
import {CartItem} from "@/types/cart.ts";

interface ListProductsProps {
    cartItems: CartItem[];
}

const ListProducts: FC<ListProductsProps> = ({cartItems}) => {


    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-orange-500 mb-4">DANH SÁCH SẢN PHẨM</h3>
            <div
                className="max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100">
                {cartItems.map((item) => (
                    <div key={item.product.id}
                         className="flex items-center justify-between p-4 border-b border-b-gray-100">
                        {/* Hình ảnh sản phẩm */}
                        <div className="w-24 h-24 bg-gray-300 rounded-md">
                            <img src={item.product.thumbnail} alt={item.product.name}
                                 className="w-full h-full object-cover rounded-md"/>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="flex-1 ml-4">
                            <h5 className="font-semibold line-clamp-2 overflow-hidden">
                                {item.product.name}
                            </h5>
                            <p className="text-sm text-gray-500 line-clamp-1 overflow-hidden">Size: {item.product.volume}
                                <span className='font-semibold'>x{item.quantity}</span></p>
                        </div>
                        <div className="flex gap-10">
                            {/* Giá */}
                            <div
                                className="text-lg ">{formatCurrency((item.product.discountPrice || item.product.price) * item.quantity)}</div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
export default ListProducts;
import {FaArrowLeft} from 'react-icons/fa';
import {Link, NavLink} from 'react-router-dom';
import CartItem from "@/components/customer/cart/CartItem.tsx";
import {ROUTES} from "@/types/constant.ts";
import type {CartItem as CartItemType} from "@/types/cart.ts";
import Loader from "@/components/ui/Loader.tsx";
import {Button} from "@/components/ui/button.tsx";
import {formatCurrency} from "@/lib/utils.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {useAddCartMutation, useClearCartMutation, useGetCartQuery} from "@/api/customerApi/cart.ts";
import {useEffect} from "react";
import {addToCart, clearCart as clearCartRedux} from "@/redux/slices/cartSlice.ts";
import {AiOutlineClear} from "react-icons/ai";

const Cart = () => {
    const {data: cartResponse, isLoading} = useGetCartQuery();
    // const cartItems = cartResponse?.data || [];
    const dispatch = useDispatch();
    const {items, totalPrice} = useSelector((state: RootState) => state.cart);
    // const cartItems = sampleCartItems;
    // const isLoading = false;

    const [addCart] = useAddCartMutation();
    const [clearCart] = useClearCartMutation();

    // Đồng bộ giỏ hàng từ API vào Redux
    useEffect(() => {
        const cartItems: CartItemType[] | undefined = cartResponse?.data;
        if (cartItems) {
            cartItems.forEach((item) => {
                dispatch(addToCart(item));
            });
            // dispatch(addAllToCart(items));
        }
    }, [cartResponse]);

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async () => {
        try {
            const response = await addCart({
                productId: 'product-001', // Thay bằng productId thực tế
                quantity: 1,
            }).unwrap();
            const cartItem: CartItemType = response.data;
            dispatch(addToCart(cartItem)); // Cập nhật Redux sau khi API thành công
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    // Xóa toàn bộ giỏ hàng
    const handleClearCart = async () => {
        try {
            await clearCart().unwrap();

            dispatch(clearCartRedux()); // Cập nhật Redux
        } catch (err) {
            console.error('Failed to clear cart:', err);
        }
    };

    return (
        <div className="w-full">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={ROUTES.HOME}>Trang chủ</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Giỏ hàng</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="p-6 w-full shadow-md rounded-lg my-12">
                {/* Danh sách sản phẩm */}
                {isLoading ? (
                    <Loader/>
                ) : items.length === 0 ? (
                    <p className="text-center text-gray-500">Giỏ hàng trống.</p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <CartItem
                                item={item}
                                key={item.id}
                            />
                        ))}
                    </div>
                )}

                {/* Nút điều hướng */}
                <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-md">
                    <NavLink
                        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
                        to={ROUTES.HOME}
                    >
                        <FaArrowLeft className="mr-2"/>
                        Tiếp tục mua hàng
                    </NavLink>
                    {/*{items.length > 0 && (*/}
                        <div className="flex">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    {/*<Button variant="outline">Show Dialog</Button>*/}
                                    <button
                                        className="flex items-center text-gray-600 hover:text-red-500 cursor-pointer">
                                        <AiOutlineClear className="mr-2"/>
                                        Xóa giỏ hàng
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bạn có muốn xóa giỏ hàng?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Không</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleClearCart()}>Có</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    {/*)}*/}
                </div>
            </div>

            <div className="w-full my-12 flex">
                <div className='w-2/3'>

                </div>
                <div className='w-1/3'>
                    <table className='w-full'>
                        <tbody>
                        <tr>
                            <td className='text-left'>
                                <h3 className="">Tổng tiền tạm tính</h3>
                            </td>
                            <td className='text-right'>
                                <span className="">{formatCurrency(totalPrice)}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left'>
                                <h3 className="">Phí vận chuyển</h3>
                            </td>
                            <td className='text-right'>
                                <span className="">{formatCurrency(0)}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left'>
                                <h3 className="">Thuế</h3>
                            </td>
                            <td className='text-right'>
                                <span className="">{formatCurrency(0)}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left'>
                                <h3 className="">Tổng tiền</h3>
                            </td>
                            <td className='text-right'>
                                <span className="">{formatCurrency(totalPrice)}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <Button
                        type="submit"
                        className="h-10 w-full mt-4"
                        // style={{backgroundColor: "#ffab66"}}
                    >
                        Thanh toán
                    </Button>
                </div>


            </div>
        </div>
    );
};
export default Cart;

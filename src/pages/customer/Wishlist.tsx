import { useAddCartMutation } from "@/api/customerApi/cart";
import { IoMdSad } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { formatCurrency, toastError, toastSuccess } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/slices/cartSlice";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { TrashIcon } from "lucide-react";
import { FC } from "react";
import { useSelector } from "react-redux";

const WishlistItem: FC<
  Product & {
    index: number;
    handleRemove: () => void;
    handleAddToCart: () => void;
  }
> = (product) => {
  return (
    <tr>
      <td>{product.index + 1}</td>
      <td>
        <div className="flex max-w-94 space-x-2 ">
          <div className="size-24">
            <img src={product.thumbnail} />
          </div>
          <span>{product.name}</span>
        </div>
      </td>
      <td>{formatCurrency(product.price)}</td>
      <td>
        <div className="p-1 bg-secondary mx-2 rounded-2xl text-center">
          {product.volume}
        </div>
      </td>
      <td>
        <div className="flex  items-center space-x-2">
          <Button
            onClick={product.handleRemove}
            variant={"destructive"}
            className="cursor-pointer"
          >
            <TrashIcon />
          </Button>
          <Button onClick={product.handleAddToCart}>Thêm vào giỏ hàng</Button>
        </div>
      </td>
    </tr>
  );
};

interface WishlistProps {}
export const Wishlist: FC<WishlistProps> = () => {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useAppDispatch();
  const handleRemove = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    toastSuccess("Xóa khỏi wishlist thành công", 1500);
  };
  const [addCart] = useAddCartMutation();
  const handleAddToCart = async (productId: string) => {
    console.log("add");
    try {
      const response = await addCart({
        productId: productId,
        quantity: 1,
      }).unwrap();

      const cartItem: CartItem = response.data;
      dispatch(addToCart(cartItem)); // Cập nhật Redux sau khi API thành công
      toastSuccess("Đã thêm vào giỏ hàng");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toastError("Lỗi", 1500);
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-center">Sản phẩm yêu thích</h1>
      {items.length ? (
        <table>
          <tr>
            <td>STT</td>
            <td>Sản phẩm </td>
            <td>Giá</td>
            <td>Thể tích</td>
            <td>Hành động</td>
          </tr>
          {items.length &&
            items.map((item, index) => (
              <WishlistItem
                handleRemove={() => {
                  handleRemove(item.product.id);
                }}
                handleAddToCart={() => {
                  handleAddToCart(item.product.id);
                }}
                key={item.product.id}
                {...item.product}
                index={index}
              />
            ))}
        </table>
      ) : (
        <div className="flex-center flex-col text-gray-500">
          <h1 className="text-center ">Chưa có sản phẩm trong wishlist</h1>
          <IoMdSad size={80} />
        </div>
      )}
    </div>
  );
};

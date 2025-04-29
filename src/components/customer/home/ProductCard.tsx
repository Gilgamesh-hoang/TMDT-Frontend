import { useAddCartMutation } from "@/api/customerApi/cart.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  calculateDiscountPercentage,
  formatCurrency,
  toastError,
  toastSuccess,
} from "@/lib/utils.ts";
import { addToCart } from "@/redux/slices/cartSlice.ts";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart.ts";
import { Product } from "@/types/product.ts";
import { Heart, ShoppingCart, StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard: React.FC<Product> = (product) => {
  const [addCart] = useAddCartMutation();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();
  const renderDiscount = () => {
    if (!product.discountPrice) return null;

    return (
      <div className="flex space-x-2 text-sm">
        <span className="text-gray line-through">
          {formatCurrency(product.price)}
        </span>
        <span className="text-error">
          -{calculateDiscountPercentage(product.price, product.discountPrice)}%
        </span>
      </div>
    );
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    console.log("add");
    try {
      const response = await addCart({
        productId: product.id,
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
  const isInWishlist = wishlist.items.some(
    (item) => item.product.id == product.id,
  );
  const handleAddtoWishlist = () => {
    dispatch(addToWishlist({ product }));
    toastSuccess("Đã thêm vào wishlist");
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product.id));
    toastSuccess("Đã xóa khỏi wishlist");
  };
  return (
    <Card className="py-0  overflow-hidden gap-2  shadow-xl   ">
      <div className="max-w-68  h-52 overflow-hidden rounded-2xl group  relative">
        <div
          className="absolute    space-x-2 w-full flex-center transition-all
        h-full opacity-0.5 bg-black/40  group-hover:opacity-100 "
        >
          {isInWishlist ? (
            <Button onClick={handleRemoveFromWishlist}>
              <Heart fill="white" />
            </Button>
          ) : (
            <Button onClick={handleAddtoWishlist}>
              <Heart />
            </Button>
          )}
          <Button onClick={handleAddToCart}>
            <ShoppingCart />
          </Button>
        </div>
        <img
          className="w-full h-full  object-cover"
          src={product.thumbnail}
          alt={product.id}
        />
      </div>
      <CardTitle className="text-center px-3">
        <Link to={`san-pham/${product.id}`}>{product.name}</Link>
      </CardTitle>
      <CardContent>
        <h3 className="text-error">
          {product.discountPrice
            ? formatCurrency(product.discountPrice)
            : formatCurrency(product.price)}
        </h3>

        {renderDiscount()}
      </CardContent>
      <CardFooter className="pb-2">
        <div className="flex space-x-2 text-gray text-sm">
          <StarIcon fill="#FFC107" className="text-transparent" size={15} />
          {Math.floor(product.rating || 0)} - Đã bán {product.sold}
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;

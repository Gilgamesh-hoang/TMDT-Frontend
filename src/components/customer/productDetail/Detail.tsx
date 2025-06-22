import { useAddCartMutation } from "@/api/customerApi/cart.ts";
import "@/components/customer/productDetail/productCarouselStyle.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, toastError, toastSuccess } from "@/lib/utils";
import { addToCart } from "@/redux/slices/cartSlice.ts";
import { CartItem } from "@/types/cart.ts";
import { Product } from "@/types/product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ImageCarousels } from "./ImageCarousels";
import { ProductPolicies } from "./ProductPolicies";

export const Detail: React.FC<Product> = (props) => {
  const [addCart] = useAddCartMutation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(50, prev + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 50) {
      setQuantity(value);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    try {
      const response = await addCart({
        productId: props.product.id,
        quantity: quantity,
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
    <div className="grid grid-cols-12  space-x-3">
      <div className="col-span-5 ">
        <ImageCarousels images={props.images.map((image) => image.imagePath)} />
      </div>
      <div className="col-span-7 ml-20">
        <h3>{props.product.name}</h3>
        <div className="flex space-x-2">
          <div className="text-sm text-yellow-600">
            ({props.product.sold} sản phẩm đã bán)
          </div>
        </div>
        <div>
          <h2>{formatCurrency(props.product.price)}</h2>
        </div>
        <p className="text-gray-800 text-sm">{props.description}</p>
        <div className="my-2 flex space-x-2 items-center">
          <div>Dung tích:</div>
          <span className="bg-primary p-[5px]  rounded-sm font-bold text-white">
            {props.product.volume}
          </span>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center border rounded-md overflow-hidden w-30 h-10">
            <Button variant="ghost" onClick={handleDecrease}>
              –
            </Button>
            <Input
              type="number"
              min={1}
              size={20}
              value={quantity}
              onChange={handleChange}
              className="border-none text-center focus-visible:ring-0
              focus-visible:ring-offset-0 no-spinner"
            />
            <Button variant="ghost" onClick={handleIncrease}>
              +
            </Button>
          </div>
          <Button onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
          <Button variant="outline">Mua ngay</Button>
        </div>
        <ProductPolicies />
      </div>
    </div>
  );
};

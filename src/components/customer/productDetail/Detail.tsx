import { Product } from "@/types/product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/components/customer/productDetail/productCarouselStyle.css";
import { ImageCarousels } from "./ImageCarousels";
import { Ratings } from "@/components/ui/rating";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductPolicies } from "./ProductPolicies";
export const Detail: React.FC<Product> = (props) => {
  const images = [
    "https://icharm.vn/wp-content/uploads/2024/07/tinh-dau-chanel-coco.png",
    "https://icharm.vn/wp-content/uploads/2024/07/tinh-dau-nuoc-hoa-chanel-coco.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
  ];
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };
  return (
    <div className="grid grid-cols-12  space-x-3">
      <div className="col-span-5 ">
        <ImageCarousels images={images} />
      </div>
      <div className="col-span-7 ">
        <h3>{props.name}</h3>
        <div className="flex space-x-2">
          <Ratings variant="yellow" rating={props.rating || 5} />
          <div className="text-sm text-yellow-600">
            (20 đánh giá từ khách hàng)
          </div>
        </div>
        <div>
          <h2>{formatCurrency(props.price)}</h2>
        </div>
        <p className="text-gray-800 text-sm">{props.description}</p>
        <div className="my-2 flex space-x-2 items-center">
          <div>Dung tích:</div>
          <span className="bg-primary p-[5px]  rounded-sm font-bold text-white">
            {props.volume}
          </span>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center border rounded-md overflow-hidden w-28 h-10">
            <Button variant="ghost" onClick={handleDecrease}>
              –
            </Button>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={handleChange}
              className="border-none text-center focus-visible:ring-0
              focus-visible:ring-offset-0 no-spinner"
            />
            <Button variant="ghost" onClick={handleIncrease}>
              +
            </Button>
          </div>
          <Button>Thêm vào giỏ hàng</Button>
          <Button variant="outline">Mua ngay</Button>
        </div>
        <ProductPolicies />
      </div>
    </div>
  );
};

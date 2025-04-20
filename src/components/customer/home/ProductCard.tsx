import { Product } from "@/types/product.ts";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Heart, ShoppingCart, StarIcon } from "lucide-react";
import { calculateDiscountPercentage, formatCurrency } from "@/lib/utils.ts";

const ProductCard: React.FC<Product> = (product) => {
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

  return (
    <Card className="py-0  overflow-hidden gap-2  shadow-xl   ">
      <div className="max-w-68  h-52 overflow-hidden rounded-2xl group  relative">
        <div
          className="absolute    space-x-2 w-full flex-center transition-all 
        h-full opacity-0.5 bg-black/40  group-hover:opacity-100 "
        >
          <Button>
            <Heart />
          </Button>
          <Button>
            <ShoppingCart />
          </Button>
        </div>
        <img
          className="w-full h-full  object-cover"
          src={product.thumbnail}
          alt={product.id}
        />
      </div>
      <CardTitle className="text-center px-3">{product.name}</CardTitle>
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { bestSellers } from "@/mock/products";
import { Product } from "@/types/product";
import { Heart, ShoppingCart, StarIcon } from "lucide-react";

export const ProductCard: React.FC<Product> = (product) => {
  return (
    <Card className="py-0  overflow-hidden gap-2  shadow-xl relative group">
      <div
        className="absolute  space-x-2 w-full flex-center transition-all  h-full opacity-0 bg-black/40 
        group-hover:opacity-100 "
      >
        <Button>
          <Heart />
        </Button>
        <Button>
          <ShoppingCart />
        </Button>
      </div>
      <div className="max-w-68  h-52 overflow-hidden rounded-2xl">
        <img className="w-full h-full  object-cover" src={product.thumbnail} />
      </div>
      <CardTitle className="text-center">{product.name}</CardTitle>
      <CardContent>
        <h3 className="text-error">
          {product.isOnSale && product.discountPrice
            ? formatCurrency(product.discountPrice)
            : formatCurrency(product.price)}
        </h3>
        {product.isOnSale && (
          <div className="flex space-x-2 text-sm">
            <span className="text-gray line-through">
              {formatCurrency(product.price)}
            </span>
            <span className="text-error">-{product.discountPercent}%</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-2">
        <div className="flex space-x-2 text-gray text-sm">
          <StarIcon fill="#FFC107" className="text-transparent" size={20} />
          {product.rating} - Đã bán {product.sold}
        </div>
      </CardFooter>
    </Card>
  );
};
export const BestSeller = () => {
  return (
    <div className="flex flex-col space-x-4">
      <div className="flex items-center justify-center ">
        <div className="bg-primary h-[2px] w-full">.</div>
        <h1 className="text-center w-full text-primary">Best Seller</h1>
        <div className="bg-primary h-[2px] w-full">.</div>
      </div>
      <div className="grid grid-cols-4 grid-rows-2  gap-y-5 gap-x-20 mt-4">
        {bestSellers &&
          bestSellers.map((item) => <ProductCard key={item.id} {...item} />)}
      </div>
    </div>
  );
};

import { ImageContainer } from "@/components/ui/image-container";
import { truncateString } from "@/lib/string-utils";
import { formatCurrency, uuid } from "@/lib/utils";
import { FC } from "react";
import { OrderItemSummary } from "./type";
export const OrderItem: FC<OrderItemSummary> = (props) => {
  const product = props.product;
  return (
    <div className="flex  justify-between items-center">
      <div className="flex  space-x-2">
        <div className="p-2 bg-white rounded-2xl">
          <ImageContainer src={product.thumbnail} className="size-14 " />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray text-sm leading-3">
            {product.category.name}
          </span>
          <p className="font-bold">{truncateString(product.name, 50)}</p>
          <p className="text-gray">Dung tich: {product.volume}</p>
        </div>
      </div>
      <div className="flex space-x-8 ">
        <div className="rounded-sm px-2 border-2 border-gray-300 ">
          {props.quantity}x{formatCurrency(props.price)}
        </div>
        <div className="rounded-sm px-2 border-2 border-gray-300 bg-secondary/80">
          {formatCurrency(props.price * props.quantity)}
        </div>
      </div>
    </div>
  );
};

interface OrderItemListProps {
  orderItemList: OrderItemSummary[];
}
export const OrderItemList: FC<OrderItemListProps> = ({ orderItemList }) => {
  return (
    <div className="rounded-2xl border p-2 max-h-[420px] overflow-auto">
      <h3>Danh sách sản phẩm</h3>
      <div className="flex flex-col space-y-2">
        {orderItemList.map((item) => (
          <OrderItem key={uuid()} {...item} />
        ))}
      </div>
    </div>
  );
};

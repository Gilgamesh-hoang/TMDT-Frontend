import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageContainer } from "@/components/ui/image-container";
import { StatusBar } from "@/components/ui/status";
import { formatDateTime, truncateString } from "@/lib/string-utils";
import { formatCurrency } from "@/lib/utils";
import { MOMO_IMAGE, VNPAY_IMAGE } from "@/types/constant";
import { OrderStatus, OrderSummaryResponse } from "@/types/order";
import { Payment } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
interface GetOrderColumnsProps {
  onDelete: (id: string) => void;
}
export const getOrderColumns = ({
  onDelete,
}: GetOrderColumnsProps): ColumnDef<OrderSummaryResponse>[] => [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <p>{truncateString(row.getValue("id"), 10)}</p>,
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("createdAt"))}</span>,
  },
  {
    header: "Khách hàng",
    accessorKey: "customerName",
  },
  {
    header: "Số điện thoại",
    accessorKey: "phoneNumber",
  },
  {
    header: "Tổng tiền",
    accessorKey: "totalAmount",
    cell: ({ row }) => (
      <span>{formatCurrency(row.getValue("totalAmount"))}</span>
    ),
  },
  {
    header: "Trạng thái đơn hàng",
    accessorKey: "status",
    cell: ({ row }) => (
      <StatusBar status={row.getValue("status") as OrderStatus} />
    ),
  },
  {
    header: "Phương thức thanh toán",
    accessorKey: "payment",
    cell: ({ row }) => {
      const payment = row.getValue("payment") as Payment;
      const image = payment.paymentMethod == "MOMO" ? MOMO_IMAGE : VNPAY_IMAGE;
      return (
        <div className="flex items-center space-x-2">
          <div>
            <img width={42} src={image} />
          </div>
          <StatusBar status={payment.paymentStatus} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cateogry = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`${cateogry.id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(cateogry.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

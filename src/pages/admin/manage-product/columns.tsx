import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateString } from "@/lib/string-utils";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
export const columns: ColumnDef<Product>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <p>{truncateString(row.getValue("id"), 10)}</p>,
  },
  {
    header: "",
    accessorKey: "thumbnail",
    cell: ({ row }) => (
      <div className="size-18 overflow-hidden">
        <img
          className="w-full h-full  object-cover"
          src={row.getValue("thumbnail")}
        />
      </div>
    ),
  },
  {
    header: "Sản phẩm",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="max-w-[300px]  whitespace-break-spaces">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    header: "Thể tích",
    accessorKey: "volume",
  },
  {
    header: "Danh mục",
    accessorKey: "category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Category;
      return <p>{category.name}</p>;
    },
  },
  {
    header: "Số lượng",
    accessorKey: "quantity",
  },
  {
    header: "Đã bán",
    accessorKey: "sold",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => alert("copy ma san pham" + product.id)}
            >
              Sao chép mã sản phẩm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem>Cập nhập thông tin</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

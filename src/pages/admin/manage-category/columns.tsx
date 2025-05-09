import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
interface GetCategoryColumnsProps {
  onUpdate: (category: Category) => void;
  onDelete: (id: string) => void;
}
export const getCategoryColumns = ({
  onUpdate,
  onDelete,
}: GetCategoryColumnsProps): ColumnDef<Category>[] => [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Ten danh muc",
    accessorKey: "name",
  },
  {
    header: "Trang thai",
    accessorKey: "isDeleted",
    cell: ({ row }) => {
      const isDeleted = !row.getValue("isDeleted");
      return (
        <span
          className={cn(
            "px-3 py-1 rounded-2xl text-white",
            isDeleted ? "bg-red-600" : "bg-green-600",
          )}
        >
          {isDeleted ? "Khong hoat dong" : "Hoat dong"}
        </span>
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
            <DropdownMenuItem
              onClick={() => alert("copy ma san pham" + cateogry.id)}
            >
              Sao chép mã sản phẩm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdate(cateogry)}>
              Cập nhập thông tin
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

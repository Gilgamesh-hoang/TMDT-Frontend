import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
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
    header: "Tên danh mục",
    accessorKey: "name",
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("createdAt"))}</span>,
  },
  {
    header: "Trạng thái",
    accessorKey: "isDeleted",
    cell: ({ row }) => {
      const isDeleted = row.getValue("isDeleted");
      return (
        <span
          className={cn(
            "px-3 py-1 rounded-2xl text-white",
            isDeleted ? "bg-amber-600" : "bg-green-600",
          )}
        >
          {isDeleted ? "Không hoạt động" : "Hoạt động"}
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
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`${cateogry.id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
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

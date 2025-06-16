import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime, truncateString } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { AdminCommentResponse, Author } from "@/types/comment";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
interface GetCategoryColumnsProps {
  onDelete: (id: string) => void;
}
export const getAdminCommentColumns = ({
  onDelete,
}: GetCategoryColumnsProps): ColumnDef<AdminCommentResponse>[] => [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <p>{truncateString(row.getValue("id"), 10)}</p>,
  },
  {
    header: "Tác giả",
    accessorKey: "author",
    cell: ({ row }) => {
      const author: Author = row.getValue("author");
      return <span>{author.fullName}</span>;
    },
  },
  {
    header: "Nội dung",
    accessorKey: "content",
  },
  {
    header: "Sản phẩm",
    accessorKey: "productName",
    cell: ({ row }) => <p>{truncateString(row.getValue("productName"), 40)}</p>,
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
          {isDeleted ? "Đã xóa" : "Hoạt động"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original;
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
            <DropdownMenuItem onClick={() => onDelete(comment.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ratings } from "@/components/ui/rating";
import { formatDateTime, truncateString } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { Author } from "@/types/comment";
import { AdminAccountResponse } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
interface GetCategoryColumnsProps {
  onDelete: (id: string) => void;
}
export const getAdminAccountColumns = ({
  onDelete,
}: GetCategoryColumnsProps): ColumnDef<AdminAccountResponse>[] => [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <p>{truncateString(row.getValue("id"), 10)}</p>,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Họ và tên",
    accessorKey: "fullName",
  },
  {
    header: "Số điện thoại",
    accessorKey: "phone",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: ({ row }) => {
      const active = !row.getValue("status");
      return (
        <span
          className={cn(
            "px-3 py-1 rounded-2xl text-white",
            active ? "bg-amber-600" : "bg-green-600",
          )}
        >
          {active ? "Không hoạt động" : "Hoạt động"}
        </span>
      );
    },
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("createdAt"))}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rating = row.original;
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
            <DropdownMenuItem onClick={() => onDelete(rating.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

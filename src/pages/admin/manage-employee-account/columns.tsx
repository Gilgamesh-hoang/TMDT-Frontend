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
import { ADMIN_ROUTES } from "@/types/constant";
import { AdminAccountResponse } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
interface GetCategoryColumnsProps {
  onToggleBan: (id: string, status: boolean) => void;
}
export const getAdminAccountColumns = ({
  onToggleBan,
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
        const user = row.original;
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
              <DropdownMenuItem>
                <NavLink to={`${ADMIN_ROUTES.MANAGE_CUSTOMER}/${user.id}`}>
                  Xem chi tiết
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleBan(user.id, user.status)}>
                {user.status ? "Cấm tài khoản" : "Mở khóa tài khoản"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

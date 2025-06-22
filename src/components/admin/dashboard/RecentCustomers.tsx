import { AdminAccountResponse } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";
import { SummaryDataTable } from "./RecentOrders";
import { formatDateTime } from "@/lib/string-utils";
const columns: ColumnDef<AdminAccountResponse>[] = [
  { header: "Khách hàng", accessorKey: "fullName" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Ngày tạo tài khoản",
    accessorKey: "createdAt",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("createdAt"))}</span>,
  },
];
export const RecentCustomers: FC<{ data: AdminAccountResponse[] }> = ({
  data,
}) => {
  return (
    <div className="container mx-auto ">
      <h2>Khách hàng mới đăng ký</h2>
      <SummaryDataTable columns={columns} data={data} />
    </div>
  );
};

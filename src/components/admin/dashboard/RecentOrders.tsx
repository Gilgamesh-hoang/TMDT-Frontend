import { StatusBar } from "@/components/ui/status";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/string-utils";
import { formatCurrency } from "@/lib/utils";
import { DataTableProps } from "@/types/data-table";
import { OrderStatus, OrderSummary } from "@/types/order";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";

export function SummaryDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-amber-500 font-bold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <h2>No result</h2>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
const columns: ColumnDef<OrderSummary>[] = [
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
];
export const RecentOrders: FC<{ data: OrderSummary[] }> = ({ data }) => {
  return (
    <div className="container mx-auto">
      <h2>Đơn hàng mới nhất</h2>
      <SummaryDataTable columns={columns} data={data} />
    </div>
  );
};

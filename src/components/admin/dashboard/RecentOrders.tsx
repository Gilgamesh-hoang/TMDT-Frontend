import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, statusColorMap } from "@/lib/utils";
import { mockOrders } from "@/mock/orders";
import { DataTableProps } from "@/types/data-table";
import { Order, OrderStatus } from "@/types/order";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
const columns: ColumnDef<Order>[] = [
  { header: "Id", accessorKey: "id" },
  { header: "Date", accessorKey: "date" },
  { header: "Customer", accessorKey: "customerName" },
  {
    header: "Amount",
    accessorKey: "total",
    cell: ({ row }) => <p>{formatCurrency(row.getValue("total"))}</p>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div className=" flex">
        <div
          className={cn(
            "text-white rounded-2xl px-3 py-[2px] font-bold",
            statusColorMap[row.getValue("status") as OrderStatus],
          )}
        >
          {row.getValue("status")}
        </div>
      </div>
    ),
  },
];
export const RecentOrders = () => {
  return (
    <div className="container mx-auto p2-10">
      <h2>Đơn hàng mới nhất</h2>
      <SummaryDataTable columns={columns} data={mockOrders} />
    </div>
  );
};

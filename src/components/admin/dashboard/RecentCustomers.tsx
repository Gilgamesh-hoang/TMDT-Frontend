import { ColumnDef } from "@tanstack/react-table";
import { SummaryDataTable } from "./RecentOrders";
import { Customer } from "@/types/customer";
import { customers } from "@/mock/customers";
const columns: ColumnDef<Customer>[] = [
  { header: "Id", accessorKey: "id" },
  { header: "Customer", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Register date",
    accessorKey: "createdDate",
  },
];
export const RecentCustomers = () => {
  return (
    <div className="container mx-auto p2-10">
      <h2>Khách hàng mới đăng ký</h2>
      <SummaryDataTable columns={columns} data={customers} />
    </div>
  );
};

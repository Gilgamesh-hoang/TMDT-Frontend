import { useGetProductsQuery } from "@/api/adminApi/product";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/DataTablePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/Loader";
import { Pagination } from "@/components/ui/Pagination";
import { truncateString } from "@/lib/string-utils";
import { Category } from "@/types/category";
import { PaginationRequest } from "@/types/pagination";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const ManageProduct = () => {
  const columns: ColumnDef<Product>[] = [
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
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 5 });
  const { data: pageResponse, isLoading } = useGetProductsQuery(page);
  const handleOnPageChange = (page: number) => {
    setPage((prev) => ({ ...prev, page }));
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <h2>Quản lý sản phẩm</h2>
      {pageResponse?.data.data && (
        <div className="border-3 ">
          <DataTable columns={columns} data={pageResponse?.data.data} />
          <div className="flex justify-center my-2">
            <Pagination
              totalPages={pageResponse.data.totalPage}
              currentPage={page.page}
              onPageChange={handleOnPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

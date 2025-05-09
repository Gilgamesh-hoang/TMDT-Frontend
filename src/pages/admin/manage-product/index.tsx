import { useGetProductsQuery } from "@/api/adminApi/product";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/Loader";
import { PageSizeSelector } from "@/components/ui/PageSizeSelector";
import { Pagination } from "@/components/ui/Pagination";
import { PaginationRequest } from "@/types/pagination";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { columns } from "./columns";

export const ManageProduct = () => {
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 5 });
  const { data: pageResponse, isLoading } = useGetProductsQuery(page);
  const handleOnPageChange = (page: number) => {
    setPage((prev) => ({ ...prev, page }));
  };
  const handleOnSizeChange = (value: string) => {
    setPage((prev) => ({ ...prev, size: Number(value) }));
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý sản phẩm</h2>
        <div>
          <Button>
            <NavLink to={"save"}>
              <strong>Tạo mới</strong>
            </NavLink>
          </Button>
        </div>
      </div>
      {pageResponse?.data.data && (
        <div className="border-3 ">
          <DataTable columns={columns} data={pageResponse?.data.data} />
          <div className="flex justify-center my-2">
            <Pagination
              totalPages={pageResponse.data.totalPage}
              currentPage={page.page}
              onPageChange={handleOnPageChange}
            />
            <div className="bg-white ml-8">
              <PageSizeSelector onValueChange={handleOnSizeChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

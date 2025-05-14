import { useGetOrdersQuery } from "@/api/adminApi/order";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getOrderColumns } from "./columns";
import { Pagination } from "@/components/ui/Pagination";
export const ManageOrder = () => {
  const [page, setPage] = useState<number>(1);
  const { data: pageResponse, isLoading } = useGetOrdersQuery({
    page,
    size: 5,
  });
  if (isLoading) return <Loader />;
  const onDelete = () => {};
  const columns = getOrderColumns({ onDelete });
  const handleOnPageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý đơn hàng</h2>
        <div></div>
      </div>
      {pageResponse && (
        <div className="border-3 ">
          <DataTable columns={columns} data={pageResponse?.data} />
        </div>
      )}
      {pageResponse && (
        <div className="flex-center mt-2">
          <Pagination
            totalPages={pageResponse.totalPage}
            currentPage={page}
            onPageChange={handleOnPageChange}
          />
        </div>
      )}
    </div>
  );
};

import { useGetOrdersQuery } from "@/api/adminApi/order";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getOrderColumns } from "./columns";
import { Pagination } from "@/components/ui/Pagination";
import { OrderSummary } from "@/types/order";
import { Dialog } from "@/components/ui/dialog";
import { OrderUpdateStatusDialog } from "./OrderUpdateStatusDialog";
export const ManageOrder = () => {
  const [page, setPage] = useState<number>(1);
  const { data: pageResponse, isLoading } = useGetOrdersQuery({
    page,
    size: 10,
  });
  const [selectedOrder, setSelectedOrder] = useState<null | OrderSummary>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onClickUpdateStatus = (order: OrderSummary) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };
  const columns = getOrderColumns({ onClickUpdateStatus });
  const handleOnPageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) return <Loader />;
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
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {selectedOrder && (
          <OrderUpdateStatusDialog
            initialData={selectedOrder}
            onSave={() => {
              setSelectedOrder(null);
              setShowDialog(false);
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

import { useGetCustomerAccountsQuery } from "@/api/adminApi/account";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/Loader";
import { Pagination } from "@/components/ui/Pagination";
import { toastSuccess } from "@/lib/utils";
import { DeleteDialogState } from "@/types/data-table";
import { PaginationRequest } from "@/types/pagination";
import { useState } from "react";
import { DeleteConfirmDialog } from "../manage-category/DeleteConfirmDialog";
import { getAdminAccountColumns } from "./columns";
export const ManageCustomerAccount = () => {
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 10 });
  const { data, isLoading } = useGetCustomerAccountsQuery(page);
  const initDeleteDialogState: DeleteDialogState = { open: false, id: null };
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(
    initDeleteDialogState,
  );

  const handleConfirmDelete = async () => {
    try {
      toastSuccess("Xóa đánh giá thành công");
      setDeleteDialog(initDeleteDialogState);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (commentId: string) => {
    setDeleteDialog({ id: commentId, open: true });
  };
  const columns = getAdminAccountColumns({ onDelete });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý tài khoản khách hàng</h2>
      </div>
      {data && (
        <div className="border-3   min-h-[500px]">
          <DataTable columns={columns} data={data.data} />
        </div>
      )}
      {data && (
        <div className="flex justify-center mt-2">
          <Pagination
            totalPages={data.totalPage}
            currentPage={page.page}
            onPageChange={(page: number) =>
              setPage((prev) => ({ ...prev, page }))
            }
          />
        </div>
      )}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={() => setDeleteDialog(initDeleteDialogState)}
      >
        <DeleteConfirmDialog onConfirmDelete={handleConfirmDelete} />
      </AlertDialog>
    </div>
  );
};

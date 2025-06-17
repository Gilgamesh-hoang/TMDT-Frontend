import {
  useDeleteProductMutation,
  useGetDeletedProductCountQuery,
  useGetProductsQuery,
} from "@/api/adminApi/product";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/Loader";
import { PageSizeSelector } from "@/components/ui/PageSizeSelector";
import { Pagination } from "@/components/ui/Pagination";
import { toastSuccess } from "@/lib/utils";
import { ADMIN_ROUTES } from "@/types/constant";
import { DeleteDialogState } from "@/types/data-table";
import { PaginationRequest } from "@/types/pagination";
import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { DeleteConfirmDialog } from "../manage-category/DeleteConfirmDialog";
import { getProductColumns } from "./columns";
export const ManageProduct = () => {
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 5 });
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data: pageResponse, isLoading } = useGetProductsQuery({ ...page, q });
  const { data: deletedProductCount } = useGetDeletedProductCountQuery();
  const initDeleteDialogState: DeleteDialogState = { open: false, id: null };
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(
    initDeleteDialogState,
  );
  const [deleteProduct] = useDeleteProductMutation();
  const handleOnPageChange = (page: number) => {
    setPage((prev) => ({ ...prev, page }));
  };
  const handleOnSizeChange = (value: string) => {
    setPage((prev) => ({ ...prev, size: Number(value) }));
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(deleteDialog.id!).unwrap();
      toastSuccess("Xóa sản phẩm thành công");
      setDeleteDialog(initDeleteDialogState);
    } catch (error) {
      console.log(error);
    }
  };
  const onClickDelete = async (productId: string) => {
    setDeleteDialog({ id: productId, open: true });
  };
  const columns = getProductColumns({ onClickDelete });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý sản phẩm</h2>
        <div className="flex space-x-2">
          <Button variant={"destructive"} className="text-white">
            <NavLink to={ADMIN_ROUTES.MANAGE_DELETED_PRODUCT}>
              <strong>Sản phẩm đã xóa ({deletedProductCount}) </strong>
            </NavLink>
          </Button>
          <Button>
            <NavLink to={"save"}>
              <strong>Tạo mới</strong>
            </NavLink>
          </Button>
        </div>
      </div>
      {pageResponse?.data && (
        <div className="border-3 ">
          <DataTable columns={columns} data={pageResponse?.data} />
          <div className="flex justify-center my-2">
            <Pagination
              totalPages={pageResponse.totalPage}
              currentPage={page.page}
              onPageChange={handleOnPageChange}
            />
            <div className="bg-white ml-8">
              <PageSizeSelector onValueChange={handleOnSizeChange} />
            </div>
          </div>
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

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/api/adminApi/category";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";
import { toastError, toastSuccess } from "@/lib/utils";
import { Category } from "@/types/category";
import { useState } from "react";
import { CategorySaveForm } from "./CategorySaveDialog";
import { getCategoryColumns } from "./columns";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
export const ManageCategory = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const onUpdate = (category: Category) => {
    setOpenDialog(true);
    setSelectedCategory(category);
  };

  const onDelete = (id: string) => {
    setOpenAlertDialog(true);
    setSelectedCategoryId(id);
  };

  const onConfirmDelete = async () => {
    try {
      if (selectedCategoryId) {
        await deleteCategory(selectedCategoryId).unwrap();
        setSelectedCategoryId(null);
        toastSuccess("Xóa danh mục thành công");
      }
    } catch (error) {
      toastError("Danh mục đã có sản phẩm không thể xóa");
      console.log(error);
    }
  };
  const resetDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };
  const columns = getCategoryColumns({ onDelete, onUpdate });
  if (isLoading || isDeleting) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý danh mục</h2>
        <div>
          <Button
            onClick={() => {
              setOpenDialog(true);
              setSelectedCategory(null);
            }}
          >
            <strong>Tạo mới</strong>
          </Button>
        </div>
      </div>
      {categories && (
        <div className="border-3 ">
          <DataTable columns={columns} data={categories} />
        </div>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <CategorySaveForm
          action={selectedCategory ? "update" : "create"}
          initialData={selectedCategory}
          onSave={resetDialog}
        />
      </Dialog>
      <AlertDialog onOpenChange={setOpenAlertDialog} open={openAlertDialog}>
        <DeleteConfirmDialog onConfirmDelete={onConfirmDelete} />
      </AlertDialog>
    </div>
  );
};

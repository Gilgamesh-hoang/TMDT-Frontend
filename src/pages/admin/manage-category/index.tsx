import { useGetCategoriesQuery } from "@/api/adminApi/category";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import { CategorySaveForm } from "./CategorySaveDialog";
import { Category } from "@/types/category";
import { getCategoryColumns } from "./columns";

export const ManageCategory = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const onUpdate = (category: Category) => {
    setOpenDialog(true);
    setSelectedCategory(category);
  };

  const onDelete = (id: string) => {
    console.log("delete", id);
  };
  const resetDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };
  const columns = getCategoryColumns({ onDelete, onUpdate });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý Danh muc</h2>
        <div>
          <Button onClick={resetDialog}>
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
    </div>
  );
};

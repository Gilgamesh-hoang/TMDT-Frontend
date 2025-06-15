import {
  useGetDeletedProductsQuery,
  useRecoverProductMutation,
} from "@/api/adminApi/product";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/Loader";
import { toastSuccess } from "@/lib/utils";
import { getProductColumns } from "./columns";
import { BackButton } from "@/components/admin/common/BackButton";
export const ManageDeletedProduct = () => {
  const { data, isLoading } = useGetDeletedProductsQuery();
  const [recoverProduct] = useRecoverProductMutation();
  const onClickRecover = async (productId: string) => {
    try {
      await recoverProduct(productId).unwrap();
      toastSuccess("Khôi phục sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const columns = getProductColumns({ onClickRecover });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4">
      <div>
        <BackButton />
      </div>
      <div className="flex justify-between my-2 items-center">
        <h2>Sản phẩm đã xóa</h2>
      </div>
      {data && (
        <div className="border-3 ">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

import {
  useBanAccountMutation,
  useGetEmployeeAccountsQuery,
  useUnbanAccountMutation,
} from "@/api/adminApi/account";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";
import { Pagination } from "@/components/ui/Pagination";
import { toastError, toastSuccess } from "@/lib/utils";
import { PaginationRequest } from "@/types/pagination";
import { useState } from "react";
import { getAdminAccountColumns } from "./columns";
import { RegisterDialog } from "./RegisterDialog";
export const ManageEmployeeAccount = () => {
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 10 });
  const { data, isLoading } = useGetEmployeeAccountsQuery(page);
  const [showRegisterDigalog, setShowRegisterDigalog] =
    useState<boolean>(false);
  const [banAccount] = useBanAccountMutation();
  const [unbanAccount] = useUnbanAccountMutation();
  const onToggleBan = async (userId: string, status: boolean) => {
    const mutation = status ? banAccount : unbanAccount;
    try {
      await mutation(userId).unwrap();
      toastSuccess("Cập nhập trạng thái tài khoản thành công");
    } catch (error) {
      console.log(error);
      toastError("Bạn không có quyền thực hiện hành động này");
    }
  };
  const columns = getAdminAccountColumns({ onToggleBan });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý tài khoản nhân viên</h2>
        <Button onClick={() => setShowRegisterDigalog(true)}>Tạo mới</Button>
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
      <Dialog open={showRegisterDigalog} onOpenChange={setShowRegisterDigalog}>
        <RegisterDialog callback={() => setShowRegisterDigalog(false)} />
      </Dialog>
    </div>
  );
};

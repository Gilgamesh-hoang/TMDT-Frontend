import {
  useDeleteAdminCommentMutation,
  useGetAdminCommentsQuery,
} from "@/api/adminApi/comment";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/Loader";
import { Pagination } from "@/components/ui/Pagination";
import { PaginationRequest } from "@/types/pagination";
import { useState } from "react";
import { getAdminCommentColumns } from "./columns";
export const ManageComment = () => {
  const [page, setPage] = useState<PaginationRequest>({ page: 1, size: 10 });
  const { data, isLoading } = useGetAdminCommentsQuery(page);
  const [deleteComment] = useDeleteAdminCommentMutation();
  const onDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = getAdminCommentColumns({ onDelete });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex justify-between my-2 items-center">
        <h2>Quản lý bình luận</h2>
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
    </div>
  );
};

import { z } from "zod";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { CommentSaveSchema } from "@/validation/comment";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "@/api/customerApi/comment";
import { useAppSelector } from "@/redux/store";
import { FC, useState } from "react";
import { Loader } from "lucide-react";
import { toastSuccess } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";

interface CommentSectionProps {
  productId: string;
}
export const CommentSection: FC<CommentSectionProps> = ({ productId }) => {
  const { me } = useAppSelector((state) => state.auth);
  const [createComment] = useCreateCommentMutation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCommentsQuery({ page, size: 5, productId });
  const handleCommentSave = async (
    comment: z.infer<typeof CommentSaveSchema>,
  ) => {
    try {
      if (!me) return;
      await createComment({ ...comment, productId });
      toastSuccess("Bình luận thành công");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loader className="animate-spin" />;
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {me ? (
        <CommentForm onSubmit={handleCommentSave} />
      ) : (
        <div className="bg-primary/20 p-10 rounded-2xl">
          <p className="text-center text-md">Vui lòng đăng nhập để bình luận</p>
        </div>
      )}
      {data && <CommentList comments={data.data} />}
      {data && (
        <div className="flex-center">
          <Pagination
            onPageChange={(value) => setPage(value)}
            totalPages={data?.totalPage}
            currentPage={data?.currentPage}
          />
        </div>
      )}
    </div>
  );
};

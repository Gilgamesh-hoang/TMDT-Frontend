import {
    useDeleteCommentMutation,
    useUpdateCommentMutation
} from "@/api/customerApi/comment";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { toastSuccess } from "@/lib/utils";
import { DeleteConfirmDialog } from "@/pages/admin/manage-category/DeleteConfirmDialog";
import { CommentResponse } from "@/types/comment";
import { CommentSaveSchema } from "@/validation/comment";
import { FC, useState } from "react";
import { z } from "zod";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: CommentResponse[];
}
export const CommentList: FC<CommentListProps> = ({ comments }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const handleDelete = async () => {
    try {
      await deleteComment(selectedCommentId!).unwrap();
      setSelectedCommentId(null);
      toastSuccess("Xóa bình luận thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const confirmDelete = (commentId: string) => {
    setShowDialog(true);
    setSelectedCommentId(commentId);
  };

  const handleUpdate = async (formData: z.infer<typeof CommentSaveSchema>) => {
    try {
      await updateComment({
        content: formData.content,
        id: selectedCommentId!,
      }).unwrap();
      setSelectedCommentId(null);
      toastSuccess("Cập nhập bình luận thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {comments &&
        comments.map((comment) => (
          <CommentItem
            onUpdate={handleUpdate}
            onDelete={confirmDelete}
            editMode={selectedCommentId === comment.id}
            enterEditMode={(id) => setSelectedCommentId(id)}
            key={comment.id}
            {...comment}
          />
        ))}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <DeleteConfirmDialog onConfirmDelete={handleDelete} />
      </AlertDialog>
    </div>
  );
};

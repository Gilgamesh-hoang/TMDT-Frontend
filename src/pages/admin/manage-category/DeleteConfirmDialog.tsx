import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FC } from "react";

interface DeleteConfirmDialogProps {
  onConfirmDelete: () => void;
}
export const DeleteConfirmDialog: FC<DeleteConfirmDialogProps> = ({
  onConfirmDelete,
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Lưu ý quan trọng</AlertDialogTitle>
        <AlertDialogDescription>
          Khi xóa vĩnh viễn sẽ không bao giờ khôi phục được
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Hủy</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirmDelete}>Xóa</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

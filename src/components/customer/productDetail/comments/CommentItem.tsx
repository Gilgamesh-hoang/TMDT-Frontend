import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageContainer } from "@/components/ui/image-container";
import { PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/string-utils";
import { useAppSelector } from "@/redux/store";
import { CommentResponse } from "@/types/comment";
import { AVATAR_SRC } from "@/types/constant";
import { CommentSaveSchema } from "@/validation/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { EditIcon, EllipsisIcon, SendIcon, TrashIcon } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { useReplyCommentMutation } from "@/api/customerApi/comment";
import { cn, toastSuccess } from "@/lib/utils";

export const CommentItem: FC<
  CommentResponse & {
    onDelete: (commentId: string) => void;
    onUpdate: (formData: z.infer<typeof CommentSaveSchema>) => void;
    enterEditMode: (commentId: string) => void;
    editMode: boolean;
  }
> = (props) => {
  const { me } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof CommentSaveSchema>>({
    resolver: zodResolver(CommentSaveSchema),
    defaultValues: {
      content: props.content,
    },
  });
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyComment] = useReplyCommentMutation();
  const onSubmitReply = async (formData: z.infer<typeof CommentSaveSchema>) => {
    try {
      await replyComment({
        productId: props.productId,
        content: formData.content,
        parentId: replyId!,
      });
      toastSuccess("Trả lời bình luận thành công");
      setReplyId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const showReplyForm = () => {
    if (!replyId) {
      setReplyId(props.id);
      return;
    }
    setReplyId(null);
  };
  return (
    <div className="flex flex-col">
      <div className="flex border-l-emerald-400 border-l-3 space-x-2 px-2">
        <ImageContainer src={AVATAR_SRC} className="size-10" />
        <div className="flex flex-col w-full bg-gray-100 px-2 rounded-2xl">
          <div className="flex justify-between">
            <h3 className="leading-0">{props.author.fullName}</h3>
            {me?.id == props.author.id && (
              <Popover>
                <PopoverTrigger>
                  <EllipsisIcon />
                  <PopoverContent className="w-38">
                    <Button
                      onClick={() => props.enterEditMode(props.id)}
                      variant={"ghost"}
                    >
                      <EditIcon />
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={() => props.onDelete(props.id)}
                      variant={"ghost"}
                    >
                      <TrashIcon />
                      Xóa
                    </Button>
                  </PopoverContent>
                </PopoverTrigger>
              </Popover>
            )}
          </div>
          {props.editMode ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(props.onUpdate)}
                className="relative"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <Textarea
                        value={field.value}
                        maxLength={300}
                        cols={100}
                        className="bg-gray-200"
                        rows={4}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  className="absolute bottom-0 right-0"
                  disabled={!form.watch().content}
                >
                  <SendIcon />
                  Lưu
                </Button>
              </form>
            </Form>
          ) : (
            <p
              className={cn(
                "whitespace-pre-wrap wrap-break-word",
                props.isDeleted && "text-red-500",
              )}
            >
              {props.isDeleted
                ? "Bình luận đã quản trị viên bị xóa"
                : props.content}
            </p>
          )}
          <div className="justify-between flex items-center  py-0">
            {props.depth < 2  && (
              <Button
                onClick={showReplyForm}
                variant="link"
                size="icon"
                className="text-black"
                disabled={props.isDeleted}
              >
                {replyId ? "Đóng" : "Trả lời"}
              </Button>
            )}
            <p className="text-sm text-gray-500">
              {formatDateTime(props.createdAt)}
            </p>
          </div>
          {replyId && (
            <CommentForm
              onSubmit={onSubmitReply}
              className="border-3 py-2 border-white rounded"
            />
          )}
        </div>
      </div>
      <div className="ml-10">
        {props.replies.length > 0 && <CommentList comments={props.replies} />}
      </div>
    </div>
  );
};

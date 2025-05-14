import { z } from "zod";

export const CommentSaveSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Bình luận phải có ít nhất 5 ký tự" })
    .max(300, { message: "Bình luận có số lượng ký tự đối đa là 300" }),
});

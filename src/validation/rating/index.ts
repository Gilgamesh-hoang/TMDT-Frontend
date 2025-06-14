import { z } from "zod";
export const RatingSaveSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Đánh giá phải có ít nhất 5 ký tự" })
    .max(300, { message: "Đánh giá có số lượng ký tự đối đa là 300" }),
  rating: z.number(),
});

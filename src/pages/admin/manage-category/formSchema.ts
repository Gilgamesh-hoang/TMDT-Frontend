import { z } from "zod";

export const CategorySaveSchema = z.object({
  name: z.string().min(5, { message: "Tên danh mục phải có ít nhất 5 ký tự" }),
  description: z.string(),
  isDeleted: z.boolean(),
});

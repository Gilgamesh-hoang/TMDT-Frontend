import { z } from "zod";

export const CategorySaveSchema = z.object({
  name: z.string().min(5, { message: "Ten danh muc phai co it nhat 5 ky tu" }),
  description: z.string(),
});

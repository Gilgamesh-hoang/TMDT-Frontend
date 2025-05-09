import { z } from "zod";

export const ProductSaveSchema = z
  .object({
    name: z.string().min(1, "Tên không được bỏ trống"),
    description: z.string(),
    categoryId: z.string(),
    quantity: z.number().min(1, "Số lượng phải lớn hơn 1"),
    status: z.union([z.literal("1"), z.literal("2")]),
    imageIds: z.array(z.string()),
    thumbnail: z.string().optional(),
    volume: z.string(),
    price: z.number().min(1000, "Giá bán quá thấp"),
    discountPrice: z.number(),
  })
  .refine((data) => data.discountPrice < data.price, {
    message: "Giá khuyến mãi phải thấp hơn giá gốc",
    path: ["discountPrice"],
  });

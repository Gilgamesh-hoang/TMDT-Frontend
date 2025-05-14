import { orderStatusValues } from "@/types/order";
import { z } from "zod";

export const OrderStatusSchema = z.object({
  status: z.enum(orderStatusValues),
  orderId: z.string().uuid(),
});

import { useUpdateOrderStatusMutation } from "@/api/adminApi/order";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderStatusSchema } from "./formSchema";
import { orderStatusValues, orderStatusVN, OrderSummary } from "@/types/order";
import { toastSuccess } from "@/lib/utils";
import { allowStatusTransitions } from "./util";

interface CategorySaveFormProps {
  initialData: OrderSummary;
  onSave: () => void;
}
export const OrderUpdateStatusDialog: FC<CategorySaveFormProps> = ({
  onSave,
  initialData,
}) => {
  const form = useForm<z.infer<typeof OrderStatusSchema>>({
    resolver: zodResolver(OrderStatusSchema),
  });
  useEffect(() => {
    form.reset({
      status: initialData.status,
      orderId: initialData.id,
    });
  }, [form, initialData]);
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const handleUpdateOrderStatus = async (
    formData: z.infer<typeof OrderStatusSchema>,
  ) => {
    try {
      await updateOrderStatus(formData).unwrap();
      toastSuccess("Cập nhập trạng tháng đơn hàng thành công");
      onSave();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <DialogTitle>
        <DialogHeader>Cập nhập trạng thái đơn hàng</DialogHeader>
      </DialogTitle>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateOrderStatus)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái đơn hàng</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatusValues.map((status) => {
                          const allowUpdateStatus =
                            allowStatusTransitions[initialData.status];
                          return (
                            <SelectItem
                              disabled={!allowUpdateStatus.includes(status)}
                              key={status}
                              value={status}
                            >
                              {orderStatusVN[status]}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <Button
                onClick={onSave}
                type="button"
                variant={"outline"}
                className="bg-gray-500 text-white"
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu" : "Lưu"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

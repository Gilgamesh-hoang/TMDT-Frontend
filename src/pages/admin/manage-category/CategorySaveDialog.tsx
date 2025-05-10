import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/api/adminApi/category";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toastSuccess } from "@/lib/utils";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySaveSchema } from "./formSchema";

interface CategorySaveFormProps {
  action: "create" | "update";
  categoryId?: string;
  initialData: Category | null;
  onSave: () => void;
}
export const CategorySaveForm: FC<CategorySaveFormProps> = ({
  action,
  onSave,
  initialData,
}) => {
  const form = useForm<z.infer<typeof CategorySaveSchema>>({
    resolver: zodResolver(CategorySaveSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      isDeleted: initialData?.isDeleted ?? false,
    },
  });
  useEffect(() => {
    form.reset({
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      isDeleted: initialData?.isDeleted ?? false,
    });
  }, [form, initialData]);
  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const isLoading = isUpdatingCategory || isCreatingCategory;
  const handleSaveCategory = async (
    formData: z.infer<typeof CategorySaveSchema>,
  ) => {
    try {
      if (action == "create") await createCategory(formData).unwrap();
      if (action == "update" && initialData)
        await updateCategory({ ...formData, id: initialData.id }).unwrap();
      toastSuccess("Tạo danh mục mới thành công");
      onSave();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <DialogTitle>
        <DialogHeader>
          {action == "update" ? "Cập nhập" : "Tạo mới"} danh mục
        </DialogHeader>
      </DialogTitle>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveCategory)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miêu tả danh mục</FormLabel>
                  <Textarea
                    value={field.value}
                    maxLength={500}
                    placeholder="Mùi hương thơm nhẹ"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDeleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Trạng thái</FormLabel>
                    <FormDescription>
                      Trạng thái hoạt động của danh mục
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={action == "create"}
                      checked={!field.value}
                      onCheckedChange={(e) => field.onChange(!e)}
                    />
                  </FormControl>
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

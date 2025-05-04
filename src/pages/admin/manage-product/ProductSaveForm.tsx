import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductSaveSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string(),
  category: z.string(),
  quantity: z.number().min(1),
});

export const ProductSaveForm = () => {
  const form = useForm<z.infer<typeof ProductSaveSchema>>({
    resolver: zodResolver(ProductSaveSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      quantity: 1,
    },
  });
  const handleSaveProduct = async (
    product: z.infer<typeof ProductSaveSchema>,
  ) => {
    console.log(product);
  };
  return (
    <div className="mx-8 my-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveProduct)}>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-3 col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={150}
                        className="w-10/12"
                        placeholder="Sản phẩm A"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 col-span-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="c1">Danh muc A</SelectItem>
                          <SelectItem value="c2">Danh muc B</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

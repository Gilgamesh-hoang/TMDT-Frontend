import { useGetCategoriesQuery } from "@/api/adminApi/categories";
import { useCreateProductMutation } from "@/api/adminApi/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmileIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSad } from "react-icons/io";
import { toast } from "react-toastify";
import { z } from "zod";

const ProductSaveSchema = z
  .object({
    name: z.string().min(1, "Tên không được bỏ trống"),
    description: z.string(),
    categoryId: z.string(),
    quantity: z.number().min(1, "Số lượng phải lớn hơn 1"),
    status: z.string(),
    images: z.string(),
    volume: z.string(),
    price: z.number().min(1000, "Giá bán quá thấp"),
    discountPrice: z.number(),
  })
  .refine((data) => data.discountPrice < data.price, {
    message: "Giá khuyến mãi phải thấp hơn giá gốc",
    path: ["discountPrice"],
  });

export const ProductSaveForm = () => {
  const form = useForm<z.infer<typeof ProductSaveSchema>>({
    resolver: zodResolver(ProductSaveSchema),
    defaultValues: {
      name: "",
      description: "",
      images: "",
      categoryId: "",
      quantity: 100,
      status: "1",
      volume: "",
      price: 100000,
      discountPrice: 0,
    },
  });
  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();
  const handleSaveProduct = async (
    product: z.infer<typeof ProductSaveSchema>,
  ) => {
    try {
      await createProduct({
        ...product,
        status: Number(product.status),
      }).unwrap();
      toast.success("Create product successfully");
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const { data: categories } = useGetCategoriesQuery();
  const [showDiscount, setShowDiscount] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  if (isCreatingProduct) return <Loader />;
  return (
    <div className="mx-8 my-5 ">
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
                        placeholder="Sản phẩm A"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả sản phẩm"
                        rows={12}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Hình ảnh</FormLabel>
                    <Button onClick={}>Media</Button>
                    <FormControl>
                      <Textarea placeholder="Hình ảnh" rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 col-span-1">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">
                            <div
                              className="flex items-center justify-between gap-4 
                             px-4 bg-green-200 rounded-md "
                            >
                              <SmileIcon size={25} />
                              <span>Hoạt động</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div
                              className="flex items-center justify-between gap-4 
                             px-4 bg-gray-200 rounded-md "
                            >
                              <IoMdSad size={25} />
                              <span>Ẩn</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories &&
                            categories.data.map((category) => (
                              <SelectItem value={category.id} key={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Thể tích</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ex: 10ml" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="eg: 100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-white p-2 rounded-2xl border flex flex-col space-y-2">
                <p className="my-2 font-bold">Giá</p>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá gốc (vnd)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={field.value?.toLocaleString("vi-VN") ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/[^\d]/g, "");
                            field.onChange(raw ? Number(raw) : null);
                          }}
                          placeholder="eg: 100000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {showDiscount && (
                  <FormField
                    control={form.control}
                    name="discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá giảm (vnd)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={field.value?.toLocaleString("vi-VN") ?? ""}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/[^\d]/g, "");
                              field.onChange(raw ? Number(raw) : null);
                            }}
                            placeholder="eg: 100000"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="flex items-center space-x-2 p-2">
                  <Checkbox
                    checked={showDiscount}
                    id="showDiscount"
                    onCheckedChange={(value) => setShowDiscount(value === true)}
                  />
                  <label htmlFor="showDiscount">Áp dụng giảm giá</label>
                </div>
              </div>
              <Button type="submit">Lưu</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

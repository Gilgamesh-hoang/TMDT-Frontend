import { useGetCategoriesQuery } from "@/api/adminApi/category";
import { useUpdateProductMutation } from "@/api/adminApi/product";
import { useGetProductDetailQuery } from "@/api/customerApi/product";
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
import { isValidUUID } from "@/lib/string-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductUpdateRequest, ProductUpdateSchema } from "./formSchema";
import { BackButton } from "@/components/admin/common/BackButton";
import { ImageContainer } from "@/components/ui/image-container";
import { NavLink } from "react-router-dom";
export const ProductUpdateForm = () => {
  const { productId } = useParams();
  const [showDiscount, setShowDiscount] = useState(false);
  const { data, isLoading } = useGetProductDetailQuery(productId!, {
    skip: !isValidUUID(productId),
  });
  const product = data?.data.product;
  const images = data?.data.images;
  const form = useForm<ProductUpdateRequest>({
    resolver: zodResolver(ProductUpdateSchema),
    values: product && {
      id: product.id,
      name: product.name,
      description: data?.data.description,
      categoryId: product.category.id,
      quantity: product.quantity,
      volume: product.volume,
      price: product.price,
      discountPrice: product.discountPrice || 0,
    },
  });
  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation();
  const handleSaveProduct = async (request: ProductUpdateRequest) => {
    try {
      await updateProduct(request).unwrap();
      toast.success("Cập nhập sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const { data: categories } = useGetCategoriesQuery();
  if (isSaving || isLoading) return <Loader />;
  return (
    <div className="mx-8 my-5 ">
      <BackButton />
      <h3>Cập nhập sản phẩm - {productId}</h3>
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
              <div className="flex space-x-2 min-h-30 rounded-sm border bg-white flex-wrap">
                {images &&
                  images?.length > 0 &&
                  images.map((image) => (
                    <div className="relative" key={image.id}>
                      <ImageContainer
                        key={image.id}
                        className="size-35"
                        src={image.imagePath}
                      />
                      {image.imagePath == product?.thumbnail && (
                        <p className="absolute bg-gray-300 text-center w-full bottom-0">
                          Thumbnail
                        </p>
                      )}
                    </div>
                  ))}
              </div>
              <NavLink to={"images"}>
                <Button type="button">Update</Button>
              </NavLink>
              <div className="flex space-x-2 min-h-30 rounded-sm border bg-white"></div>
            </div>
            <div className="flex flex-col gap-3 col-span-1">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="bg-white p-2 rounded-2xl border">
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories &&
                            categories.map((category) => (
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

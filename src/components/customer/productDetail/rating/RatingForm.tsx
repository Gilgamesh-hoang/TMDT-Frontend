import { useCreateRatingMutation } from "@/api/customerApi/rating";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toastSuccess } from "@/lib/utils";
import { RatingSaveSchema } from "@/validation/rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RatingFormProps {
  productId: string;
  callback: () => void;
}
export const RatingForm: FC<RatingFormProps> = ({ productId, callback }) => {
  const form = useForm<z.infer<typeof RatingSaveSchema>>({
    resolver: zodResolver(RatingSaveSchema),
    defaultValues: {
      content: "",
      rating: undefined,
    },
  });
  const [createRating, { isLoading }] = useCreateRatingMutation();
  const currentRating = form.watch("rating");
  const handleSaveRating = async (data: z.infer<typeof RatingSaveSchema>) => {
    try {
      await createRating({
        ...data,
        productId,
      }).unwrap();
      form.reset();
      toastSuccess("Đánh giá thành công");
      callback();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <div className="border rounded-md p-4 mb-6">
        <Form {...form}>
          <h3 className="font-medium text-center text-lg mb-3">
            Đánh giá sản phẩm
          </h3>
          <form onSubmit={form.handleSubmit(handleSaveRating)}>
            <div className="mb-4 flex-center">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    fill={currentRating >= star ? "#FFA500" : "none"}
                    stroke={currentRating >= star ? "#FFA500" : "#D1D5DB"}
                    size={24}
                    className="cursor-pointer"
                    onClick={() => form.setValue("rating", star)}
                    onMouseEnter={() => form.setValue("rating", star)}
                    onMouseLeave={() =>
                      form.setValue("rating", form.getValues("rating"))
                    }
                  />
                ))}
              </div>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <Textarea
                    value={field.value}
                    maxLength={300}
                    cols={100}
                    className="bg-gray-200"
                    rows={4}
                    placeholder="Sản phẩm rất tốt"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-4">
              <Button disabled={isLoading || !currentRating} type="submit">
                Gửi đánh giá
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

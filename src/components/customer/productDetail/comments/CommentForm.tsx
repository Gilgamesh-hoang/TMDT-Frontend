import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CommentSaveSchema } from "@/validation/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CommentFormProps {
  onSubmit: (comment: z.infer<typeof CommentSaveSchema>) => Promise<void>;
  className?: string;
}
export const CommentForm: FC<CommentFormProps> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof CommentSaveSchema>>({
    resolver: zodResolver(CommentSaveSchema),
    defaultValues: {
      content: "",
    },
  });
  return (
    <div className={cn("flex space-x-4 mx-auto", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            onSubmit(data).then(() => form.reset()),
          )}
          className="relative"
        >
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
                  placeholder="Sản phẩm này thơm không"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            className="absolute bottom-0 right-0"
            disabled={!form.watch().content}
          >
            <SendIcon />
            Lưu
          </Button>
        </form>
      </Form>
    </div>
  );
};

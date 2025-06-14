import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { CommentSection } from "./comments/CommentSection";
import { RatingSection } from "./rating/RatingSection";

interface ProductTabsProps {
  productId: string;
}
export const ProductTabs: FC<ProductTabsProps> = ({ productId }) => {
  return (
    <Tabs defaultValue="comment" className="w-full">
      <TabsList className="w-full h-11 font-bold">
        <TabsTrigger value="comment" className="text-md">
          <strong>BÌNH LUẬN</strong>
        </TabsTrigger>
        <TabsTrigger value="rating" className="text-md">
          <strong>ĐÁNH GIÁ</strong>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="comment">
        <CommentSection productId={productId} />
      </TabsContent>
      <TabsContent value="rating">
        <RatingSection productId={productId} />
      </TabsContent>
    </Tabs>
  );
};

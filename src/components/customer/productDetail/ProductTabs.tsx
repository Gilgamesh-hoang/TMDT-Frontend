import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingLayout from "@/components/customer/productDetail/rating/RatingLayout.tsx";

export const ProductTabs = () => {
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
        <div className="min-h-30 flex-center">
          Trong đây sẽ tạo component render danh sách bình luận, form bình luận
        </div>
      </TabsContent>
      <TabsContent value="rating">
        <div className="min-h-30">
          <RatingLayout />
        </div>
      </TabsContent>
    </Tabs>
  );
};

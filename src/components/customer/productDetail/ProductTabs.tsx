import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="min-h-30 flex-center">
          Trong đây sẽ tạo component render danh sách đánh giá, form đánh giá
        </div>
      </TabsContent>
    </Tabs>
  );
};

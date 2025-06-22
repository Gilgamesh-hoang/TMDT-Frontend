import {
  useCanRateProductQuery,
  useGetRatingsQuery,
  useGetRatingStatsQuery,
} from "@/api/customerApi/rating";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FC, useState } from "react";
import { RatingForm } from "./RatingForm";
import { RatingItem } from "./RatingItem";
import { RatingGroup } from "./RatingGroup";
import { Pagination } from "@/components/ui/Pagination";
import { cn, uuid } from "@/lib/utils";
interface RatingSectionProps {
  productId: string;
}
export const RatingSection: FC<RatingSectionProps> = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const { data, isLoading } = useGetRatingsQuery({
    page,
    size: 5,
    productId,
    ratingFilter,
  });
  const { data: ratingStats } = useGetRatingStatsQuery(productId);
  const { data: canRateProduct,refetch } = useCanRateProductQuery(productId);
  const updateRatingFilter = (rating: number | string) => {
    setRatingFilter(Number(rating));
    setPage(1);
  };
  return (
    <div className="max-w border rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2"></div>
      </div>
      {ratingStats && <RatingGroup {...ratingStats} />}
      <div className="w-full flex flex-col items-center py-2">
        <Button
          disabled={canRateProduct != 1}
          onClick={() => setShowForm(true)}
          className="w-50"
        >
          Viết đánh giá
        </Button>
        {canRateProduct != 1 && (
          <p className="text-sm text-gray-500">
            {canRateProduct == 0
              ? "Vui lòng mua sản phẩm để được đánh giá! "
              : "Bạn đã đánh giá sản phẩm này rồi"}
          </p>
        )}
      </div>
      <div className="flex space-x-2 my-2">
        <Button
          variant={"outline"}
          onClick={() => updateRatingFilter(0)}
          className={cn(ratingFilter == 0 && "text-red-500 border-red-500")}
        >
          Tất cả
        </Button>
        {ratingStats &&
          Object.entries(ratingStats.ratingDistribution).map(
            ([star, count]) => {
              if (count > 0) {
                return (
                  <Button
                    key={uuid()}
                    variant={"outline"}
                    className={cn(
                      ratingFilter == Number(star) &&
                        "text-red-500 border-red-500",
                    )}
                    onClick={() => updateRatingFilter(star)}
                  >
                    {star} sao ({count})
                  </Button>
                );
              }
            },
          )}
      </div>
      {!isLoading &&
        data?.data &&
        data.data.map((rating) => <RatingItem {...rating} key={rating.id} />)}
      {data && (
        <div className="flex-center mt-2">
          <Pagination
            onPageChange={(value) => setPage(value)}
            totalPages={data?.totalPage}
            currentPage={data?.currentPage}
          />
        </div>
      )}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <RatingForm
          productId={productId}
          callback={() => {
            setShowForm(false);
            refetch();
          }}
        />
      </Dialog>
    </div>
  );
};

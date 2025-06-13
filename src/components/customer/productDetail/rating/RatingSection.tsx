import {
  useGetRatingsQuery,
  useGetRatingStatsQuery,
} from "@/api/customerApi/rating";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FC, useState } from "react";
import { RatingForm } from "./RatingForm";
import { RatingItem } from "./RatingItem";
import { RatingGroup } from "./RatingGroup";
interface RatingSectionProps {
  productId: string;
}
export const RatingSection: FC<RatingSectionProps> = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data, isLoading } = useGetRatingsQuery({ page, size: 5, productId });
  const { data: ratingStats } = useGetRatingStatsQuery(productId);
  return (
    <div className="max-w border rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2"></div>
      </div>
      {ratingStats && <RatingGroup {...ratingStats} />}
      <div className="w-full flex justify-center py-2">
        <Button onClick={() => setShowForm(true)} className="w-50">
          Viết đánh giá
        </Button>
      </div>
      {!isLoading &&
        data?.data &&
        data.data.map((rating) => <RatingItem {...rating} key={rating.id} />)}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <RatingForm
          productId={productId}
          callback={() => {
            setShowForm(false);
          }}
        />
      </Dialog>
    </div>
  );
};

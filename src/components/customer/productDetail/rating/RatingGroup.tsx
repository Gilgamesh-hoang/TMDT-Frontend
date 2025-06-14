import { Ratings } from "@/components/ui/rating";
import { RatingStatsResponse } from "@/types/rating";
import { Star } from "lucide-react";
import { FC } from "react";

export const RatingGroup: FC<RatingStatsResponse> = (props) => {
  console.log();
  return (
    <div className="flex gap-6 mb-4">
      <div className="flex flex-col items-center">
        <div className="flex items-end">
          <div className="text-3xl font-bold">
            {props.averageRating.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">/{5}</div>
        </div>
        <Ratings rating={Math.round(props.averageRating)} variant="yellow" />
        <div className="text-gray-500">{props.count} Đánh giá</div>
      </div>
      <div className="flex-1 border rounded-md p-4">
        {Object.entries(props.ratingDistribution).map(([star, count]) => {
          const percent = props.count > 0 ? (count / props.count) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 mb-2">
              <div className="w-6 text-right">{star}</div>
              <Star fill="#FFA500" stroke="#FFA500" size={16} />
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-300 h-2.5 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

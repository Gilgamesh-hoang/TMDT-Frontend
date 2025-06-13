import { Ratings } from "@/components/ui/rating";
import { formatDateTime } from "@/lib/string-utils";
import { RatingReponse } from "@/types/rating";
import { FC } from "react";
export const RatingItem: FC<RatingReponse> = (props) => {
  return (
    <div key={props.id} className="border rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <div className="font-medium">{props.author.fullName}</div>
          <Ratings rating={props.rating} variant="yellow" />
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        {formatDateTime(props.createdDate)}
      </div>
      <div>{props.content}</div>
    </div>
  );
};

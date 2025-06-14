import { Ratings } from "@/components/ui/rating";
import { formatDateTime } from "@/lib/string-utils";
import { RatingReponse } from "@/types/rating";
import { FC } from "react";
export const RatingItem: FC<RatingReponse> = (props) => {
  return (
    <div key={props.id} className="border rounded-md p-2">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <div className="flex space-x-2 items-center">
            <p className="font-medium">{props.author.fullName} -</p>
            <p className="text-sm text-gray-500">
              {formatDateTime(props.createdAt)}
            </p>
          </div>
          <div className="text-sm text-gray-500 mb-2"></div>
          <Ratings rating={props.rating} variant="yellow" />
        </div>
      </div>
      <div>{props.content}</div>
    </div>
  );
};

import {Star} from "lucide-react";

export default function RatingItem(props: Review) {
  return (
    <div key={props.id} className="border rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </div>
        <div>
          <div className="font-medium">{props.user}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                fill={star <= props.rating ? "#FFA500" : "none"}
                stroke={star <= props.rating ? "#FFA500" : "#D1D5DB"}
                size={16}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-2">{props.date.toDateString()}</div>
      <div>{props.comment}</div>
    </div>
  )
}
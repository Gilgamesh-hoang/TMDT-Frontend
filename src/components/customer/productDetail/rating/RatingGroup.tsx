import {Star} from "lucide-react";

export default function RatingGroup() {

  const averageRating = 4.8;
  const totalRatings = 5;

  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div className="flex gap-6 mb-4">
      {/* Average rating */}
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">{averageRating}</div>
        <div className="text-sm text-gray-500">/{totalRatings}</div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              fill={star <= Math.floor(averageRating) ? "#FFA500" : "none"}
              stroke={star <= Math.floor(averageRating) ? "#FFA500" : "#D1D5DB"}
              size={16}
            />
          ))}
        </div>
      </div>

      {/* Rating distribution */}
      <div className="flex-1 border rounded-md p-4">
        {ratingDistribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-2 mb-2">
            <div className="w-6 text-right">{item.stars}</div>
            <Star fill="#FFA500" stroke="#FFA500" size={16}/>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-300 h-2.5 rounded-full"
                style={{width: `${item.percentage}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
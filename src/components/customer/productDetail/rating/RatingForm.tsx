import {Star} from "lucide-react";
import {useState} from "react";
import TextArea from "@/components/customer/common/TextArea.tsx";
import Input from "@/components/customer/common/Input.tsx";

export default function RatingForm() {

  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="border rounded-md p-4 mb-6">
      <h3 className="font-medium text-lg mb-3">Viết đánh giá của bạn</h3>

      {/*{reviewSubmitted ? (*/}
      {/*  <div className="bg-green-100 text-green-700 p-3 rounded mb-3">*/}
      {/*    Cảm ơn bạn đã gửi đánh giá!*/}
      {/*  </div>*/}
      {/*) : null}*/}

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Xếp hạng của bạn</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                fill={(hoverRating || userRating) >= star ? "#FFA500" : "none"}
                stroke={(hoverRating || userRating) >= star ? "#FFA500" : "#D1D5DB"}
                size={24}
                className="cursor-pointer"
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium mb-1">Tên của bạn</label>
          <Input value={""} required={true} onChange={(e) => {}} />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewText" className="block text-sm font-medium mb-1">Nhận xét của bạn</label>
          <TextArea onChange={() => {}} value={""}/>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Thêm hình ảnh (tùy chọn)</label>
          <Input type={"file"} accept={"image/*"} onChange={(e) => {}} />
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  )
}
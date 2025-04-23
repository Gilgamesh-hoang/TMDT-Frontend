import RatingFilterButton from "@/components/customer/productDetail/rating/RatingFilterButton.tsx";
import RatingGroup from "@/components/customer/productDetail/rating/RatingGroup.tsx";
import RatingItem from "@/components/customer/productDetail/rating/RatingItem.tsx";
import RatingForm from "@/components/customer/productDetail/rating/RatingForm.tsx";

export default function RatingLayout () {

  const reviews: Review[] = [
    {
      id: "test",
      user: "Mai Linh",
      rating: 5,
      date: new Date(),
      comment: "Sản phẩm đỉnh wow á shop, shop đẹp trai, để thương lắm"
    }
  ];

  return (
    <div className="max-w border rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg uppercase">ĐÁNH GIÁ VÀ BÌNH LUẬN</div>
        <div className="flex gap-2">
          <RatingFilterButton title={"Mới nhất"} onClick={() => console.log(reviews)} />
          <RatingFilterButton title={"Cao đến thấp"} />
        </div>
      </div>
      <RatingGroup />
      <RatingForm />
      {reviews.map((review: Review) => (
        <RatingItem {...review} key={review.id} />
      ))}
    </div>
  )
}
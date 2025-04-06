import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import { collections } from "@/mock/collections";
import { Collection } from "@/types/collection";
import { Link } from "react-router-dom";
const CollectionCard: React.FC<Collection> = ({
  id,
  thumbnail,
  name,
  desc,
}) => {
  return (
    <Card className="p-0  shadow gap-2">
      <div className="overflow-hide ">
        <img className="rounded-2xl " src={thumbnail} />
      </div>
      <CardDescription className="px-4 m-0">
        <h3>{name}</h3>
        <p>{desc}</p>
      </CardDescription>
      <CardFooter className="mb-3 px-4 ">
        <Link to={"/collection/" + id}>
          <Button>Khám phá ngay</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export const NewCollection = () => {
  const data = collections;
  return (
    <div className="my-4">
      <div className="w-1/2 mx-auto">
        <h1 className="text-center">Bộ sưu tập mới</h1>
        <p className="text-center text-gray">
          Bộ sưu tập mới của
          <strong> An Nhiên Essential Oil </strong>
          mang đến những dòng tinh dầu thiên nhiên tinh khiết. Với hương thơm
          dịu nhẹ và thiết kế sang trọng, mỗi sản phẩm là một trải nghiệm thư
          giãn tuyệt vời. Bộ sưu tập lần này được chọn lọc kỹ lưỡng từ nguyên
          liệu cao cấp.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-25 mt-6">
        {data &&
          data.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
      </div>
    </div>
  );
};

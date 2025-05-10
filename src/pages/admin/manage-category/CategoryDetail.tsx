import { useGetCategoryDetailByIdQuery } from "@/api/adminApi/category";
import { BackButton } from "@/components/admin/common/BackButton";
import Loader from "@/components/ui/Loader";
import { formatDateTime, isValidUUID } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";

interface FieldPairProps {
  name: string;
  value: ReactNode;
}
const FieldPair: FC<FieldPairProps> = ({ name, value }) => {
  return (
    <div className="flex justify-between items-center text-lg font-medium text-gray-800">
      <span>{name}:</span>
      <span className="font-semibold text-gray-600">{value}</span>
    </div>
  );
};
export const CategoryDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryDetailByIdQuery(id!, {
    skip: !isValidUUID(id),
  });
  if (isLoading) return <Loader />;
  return (
    <div className="px-4">
      {data && (
        <div className="max-w-3xl mx-auto p-6 mt-8 rounded-lg shadow-lg border ">
          <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
            Chi tiết danh mục
          </h2>
          <div className="space-y-4">
            <FieldPair name="ID" value={data.id} />
            <FieldPair name="Tên danh mục:" value={data.name} />
            <FieldPair
              name="Ngày tạo:"
              value={formatDateTime(data.createdAt)}
            />
            <FieldPair name="Số lượng sản phẩm:" value={data.productCount} />
            <FieldPair name="Tổng bán" value={data.soldCount} />
            <FieldPair
              name="Trạng thái hoạt động:"
              value={
                <span
                  className={cn(
                    "px-3 py-1 rounded-2xl text-white",
                    data.isDeleted ? "bg-amber-600" : "bg-green-600",
                  )}
                >
                  {data.isDeleted ? "Không hoạt động" : "Hoạt động"}
                </span>
              }
            />
          </div>
          <div className="text-lg font-medium text-gray-800">
            <p>Miêu tả:</p>
            <p className="border-3 border-gray-300 p-2 rounded text-gray-600">
              {data.description || "Chưa có miêu tả"}
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

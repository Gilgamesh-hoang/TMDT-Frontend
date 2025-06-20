import { BackButton } from "@/components/admin/common/BackButton";
import { FieldPair } from "../manage-category/CategoryDetail";
import { useParams } from "react-router-dom";
import { useGetCustomerDetailQuery } from "@/api/adminApi/account";
import { formatDateTime, isValidUUID } from "@/lib/string-utils";
import Loader from "@/components/ui/Loader";
import { cn, formatCurrency } from "@/lib/utils";

export const CustomerDetail = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetCustomerDetailQuery(userId!, {
    skip: !isValidUUID(userId),
  });
  if (isLoading) return <Loader />;
  return (
    <div>
      {data && (
        <div className="max-w-3xl mx-auto p-6 mt-8 rounded-lg shadow-lg border ">
          <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
            Chi tiết khách hàng
          </h2>
          <div className="space-y-4">
            <FieldPair name="ID" value={data.id} />
            <FieldPair name="Họ và tên" value={data.fullName} />
            <FieldPair name="Số điện thoại" value={data.phone} />
            <FieldPair
              name="Ngày tạo tài khoản"
              value={formatDateTime(data.createdAt)}
            />
            <FieldPair
              name="Tổng tiền đã mua hàng"
              value={formatCurrency(data.totalSpent)}
            />
            <FieldPair
              name="Tổng đơn hàng đã giao"
              value={data.deliveredOrderCount}
            />
            <FieldPair
              name="Tổng đơn hàng đã hủy"
              value={data.cancelledOrderCount}
            />
            <FieldPair
              name="Trạng thái hoạt động:"
              value={
                <span
                  className={cn(
                    "px-3 py-1 rounded-2xl text-white",
                    data.status ? "bg-green-600" : "bg-orange-600",
                  )}
                >
                  {data.status ? "Hoạt động" : "Không hoạt động"}
                </span>
              }
            />
          </div>
          <div className="mt-4 flex justify-center">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

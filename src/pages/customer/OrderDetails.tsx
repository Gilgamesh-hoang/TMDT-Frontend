import {
  useCancelMyOrderMutation,
  useGetMyOrderDetailQuery,
} from "@/api/customerApi/order";
import { toastSuccess } from "@/lib/utils";
import { OrderStatus, orderStatusVN } from "@/types/order";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Loader,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Truck,
  User,
  X,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const {
    data: orderResponse,
    isLoading,
    error,
    refetch,
  } = useGetMyOrderDetailQuery(orderId!);

  const [cancelOrder, { isLoading: isCancelling }] = useCancelMyOrderMutation();

  const order = orderResponse?.data;

  const handleCancelOrder = async () => {
    if (!order || !window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      return;
    }

    try {
      const result = await cancelOrder(order.id).unwrap();
      if (result.status === 200) {
        toastSuccess(result.message || "Hủy đơn hàng thành công!");
        refetch(); // Refresh order details
      }
    } catch (error) {
      console.error("Cancel order failed:", error);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "RETURNED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <Clock size={16} />;
      case "PROCESSING":
        return <Package size={16} />;
      case "DELIVERED":
        return <CheckCircle size={16} />;
      case "CANCELLED":
        return <X size={16} />;
      case "RETURNED":
        return <RotateCcw size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canCancelOrder = (status: OrderStatus) => {
    return status === "PENDING" || status === "PROCESSING";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="animate-spin" size={24} />
          <span>Đang tải chi tiết đơn hàng...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Có lỗi xảy ra khi tải chi tiết đơn hàng
          </p>
          <button
            onClick={() => refetch()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 mr-4"
          >
            Thử lại
          </button>
          <button
            onClick={() => navigate("/user/profile")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy đơn hàng</p>
          <button
            onClick={() => navigate("/user/profile")}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/user/profile?tab=orders")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold">Chi tiết đơn hàng</h1>
                <p className="text-gray-500">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}
              >
                {getStatusIcon(order.status)}
                <span className="font-medium">
                  {orderStatusVN[order.status]}
                </span>
              </div>

              {canCancelOrder(order.status) && (
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {isCancelling ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  <span>{isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Package size={20} />
                <span>Sản phẩm đã đặt</span>
              </h2>

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/san-pham/${item.productId}`)}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={32} className="text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.productName}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Số lượng: {item.quantity}</span>
                          <span>Giá: {formatCurrency(item.price)}</span>
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          {formatCurrency(item.subtotal)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Truck size={20} />
                <span>Thông tin giao hàng</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">{order.fullName}</p>
                    <p className="text-sm text-gray-500">Người nhận</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">{order.phoneNumber}</p>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">
                      {order.street}, {order.commune}, {order.district},{" "}
                      {order.province}
                    </p>
                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                  </div>
                </div>

                {order.note && (
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium">{order.note}</p>
                      <p className="text-sm text-gray-500">Ghi chú</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <CreditCard size={20} />
                <span>Thanh toán</span>
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span
                    className={`font-medium ${
                      order.paymentStatus === "COMPLETED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus === "COMPLETED"
                      ? "Đã thanh toán"
                      : "Thất bại"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Tổng kết đơn hàng</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền hàng:</span>
                  <span className="font-medium">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng thanh toán:</span>
                    <span className="text-primary">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Calendar size={20} />
                <span>Thông tin đơn hàng</span>
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt hàng:</span>
                  <span className="font-medium">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Số lượng sản phẩm:</span>
                  <span className="font-medium">{order.orderItems.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

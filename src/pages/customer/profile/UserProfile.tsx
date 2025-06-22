import { useGetMyOrdersQuery } from "@/api/customerApi/order";
import {
    ChangePasswordRequest,
    UpdateUserRequest,
    useChangePasswordMutation,
    useFetchCurrentUserQuery,
    useUpdateProfileMutation,
} from "@/api/customerApi/user";
import { OrderStatus, orderStatusVN } from "@/types/order";
import {
    Calendar,
    ChevronRight,
    Edit3,
    Eye,
    Key,
    Loader,
    Mail,
    Package,
    Phone,
    Truck,
    User
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatDateTime } from "@/lib/string-utils";
import { formatCurrency, toastError, toastSuccess } from "@/lib/utils";

interface EditForm {
  fullName: string;
  phone: string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "info" | "orders" | "address" | "password"
  >("info");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<EditForm>({
    fullName: "",
    phone: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Orders state
  const [orderPage, setOrderPage] = useState(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | "ALL">("ALL");

  const navigate = useNavigate();

  // API hooks
  const {
    data: userResponse,
    isLoading,
    error,
    refetch,
  } = useFetchCurrentUserQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Orders API
  const {
    data: ordersResponse,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useGetMyOrdersQuery({
    page: orderPage,
    size: 10,
    ...(orderStatus !== "ALL" && { status: orderStatus as OrderStatus }),
  });

  const user = userResponse?.data;
  const ordersData = ordersResponse?.data;

  // Initialize form when user data is loaded
  useEffect(() => {
    if (user) {
      setEditForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof EditForm, value: string): void => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordInputChange = (
    field: keyof PasswordForm,
    value: string,
  ): void => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateInfo = async (): Promise<void> => {
    if (isEditing) {
      try {
        const updateData: UpdateUserRequest = {};
        let hasEmailChanged = false;

        // Only include changed fields
        if (editForm.fullName !== user?.fullName) {
          updateData.fullName = editForm.fullName;
        }
        if (editForm.phone !== user?.phone) {
          updateData.phone = editForm.phone;
        }
        if (editForm.email !== user?.email) {
          updateData.email = editForm.email;
          hasEmailChanged = true;
        }

        const result = await updateProfile(updateData).unwrap();

        if (result.status === 200) {
          toastSuccess(result.message || "Cập nhật thông tin thành công!");

          // If email was changed, navigate to email update verification page
          if (hasEmailChanged) {
            toastSuccess(
              "Vui lòng kiểm tra email để xác thực thay đổi địa chỉ email.",
            );
            navigate("/user/update-email", {
              state: {
                newEmail: editForm.email,
                oldEmail: user?.email,
              },
            });
            return; // Don't set isEditing to false, let the new page handle it
          }
        }

        setIsEditing(false);
      } catch (error) {
        console.error("Update failed:", error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChangePassword = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toastError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toastError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const changePasswordData: ChangePasswordRequest = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      };

      const result = await changePassword(changePasswordData).unwrap();

      if (result.status === 200) {
        toastSuccess(result.message || "Đổi mật khẩu thành công!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Change password failed:", error);
    }
  };

  const handleViewOrderDetail = (orderId: string) => {
    navigate(`/user/order-detail/${orderId}`);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "RETURNED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="animate-spin" size={24} />
          <span>Đang tải thông tin...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Có lỗi xảy ra khi tải thông tin người dùng
          </p>
          <button
            onClick={() => refetch()}
            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Không tìm thấy thông tin người dùng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-primary rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-gray-600 text-xl">←</span>
              </button>
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Thông tin tài khoản
            </h1>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm h-fit">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "info"
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User size={20} />
                    <span>Thông tin</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "orders"
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Truck size={20} />
                    <span>Đơn hàng</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "password"
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Key size={20} />
                    <span>Đổi mật khẩu</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            {activeTab === "info" && (
              <div className="p-8">
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-4">
                        <User size={20} className="text-gray-400" />
                        <div>
                          <label className="text-sm text-gray-500">
                            Họ và tên:
                          </label>
                          <div className="mt-1">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editForm.fullName}
                                onChange={(e) =>
                                  handleInputChange("fullName", e.target.value)
                                }
                                placeholder="Nhập họ và tên"
                                className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-800">
                                {user.fullName || "Chưa có tên"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-4">
                        <Phone size={20} className="text-gray-400" />
                        <div>
                          <label className="text-sm text-gray-500">
                            Số điện thoại:
                          </label>
                          <div className="mt-1">
                            {isEditing ? (
                              <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) =>
                                  handleInputChange("phone", e.target.value)
                                }
                                placeholder="Nhập số điện thoại"
                                className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-800">
                                {user.phone || "Chưa có số điện thoại"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-4">
                        <Mail size={20} className="text-gray-400" />
                        <div>
                          <label className="text-sm text-gray-500">
                            Email:
                          </label>
                          <div className="mt-1">
                            {isEditing ? (
                              <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-800">
                                {user.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-4">
                        <Eye size={20} className="text-gray-400" />
                        <div>
                          <label className="text-sm text-gray-500">
                            Trạng thái:
                          </label>
                          <div className="mt-1">
                            <span className="text-green-600 font-medium">
                              Hoạt động
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="mt-8 pt-6 border-t">
                    <button
                      onClick={handleUpdateInfo}
                      disabled={isUpdating}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-80 hover:cursor-pointer transition-colors flex items-center space-x-2"
                    >
                      {isUpdating ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        <Edit3 size={16} />
                      )}
                      <span>
                        {isUpdating
                          ? "Đang cập nhật..."
                          : isEditing
                            ? "XÁC NHẬN THAY ĐỔI"
                            : "CẬP NHẬT THÔNG TIN"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>

                  {/* Order Status Filter */}
                  <select
                    value={orderStatus}
                    onChange={(e) => {
                      setOrderStatus(e.target.value as OrderStatus | "ALL");
                      setOrderPage(0);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="ALL">Tất cả đơn hàng</option>
                    <option value="PENDING">Đang chờ xử lý</option>
                    <option value="PROCESSING">Đang xử lý</option>
                    <option value="DELIVERED">Đã giao</option>
                    <option value="CANCELLED">Đã hủy</option>
                    <option value="RETURNED">Trả hàng</option>
                  </select>
                </div>

                {isLoadingOrders ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-2">
                      <Loader className="animate-spin" size={24} />
                      <span>Đang tải danh sách đơn hàng...</span>
                    </div>
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 mb-4">
                      Có lỗi xảy ra khi tải danh sách đơn hàng
                    </p>
                  </div>
                ) : !ordersData?.data || ordersData.data.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Package size={64} className="mx-auto mb-4" />
                    </div>
                    <p className="text-gray-500">
                      {orderStatus === "ALL"
                        ? "Bạn chưa có đơn hàng nào"
                        : `Không có đơn hàng ${orderStatusVN[orderStatus as OrderStatus]?.toLowerCase()}`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ordersData.data.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    Đơn hàng #{order.id.slice(-8).toUpperCase()}
                                  </h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                    <div className="flex items-center space-x-1">
                                      <Calendar size={14} />
                                      <span>
                                        {formatDateTime(order.createdAt)}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Package size={14} />
                                      <span>{order.totalItems} sản phẩm</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                                >
                                  {orderStatusVN[order.status]}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6">
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Người nhận:
                                  </span>
                                  <p className="font-medium">
                                    {order.fullName}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Số điện thoại:
                                  </span>
                                  <p className="font-medium">
                                    {order.phoneNumber}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Thanh toán:
                                  </span>
                                  <p className="font-medium">
                                    {order.paymentMethod}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="flex items-center space-x-1">
                                    <span className="text-lg font-bold text-green-600">
                                      {formatCurrency(order.totalAmount)}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    handleViewOrderDetail(order.id)
                                  }
                                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                >
                                  <span>Xem chi tiết</span>
                                  <ChevronRight size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Pagination */}
                    {ordersData.totalPage > 1 && (
                      <div className="flex items-center justify-center space-x-4 mt-8">
                        <button
                          onClick={() =>
                            setOrderPage(Math.max(0, orderPage - 1))
                          }
                          disabled={orderPage === 0}
                          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Trang trước
                        </button>

                        <span className="px-4 py-2">
                          Trang {orderPage + 1} / {ordersData.totalPage}
                        </span>

                        <button
                          onClick={() =>
                            setOrderPage(
                              Math.min(ordersData.totalPage - 1, orderPage + 1),
                            )
                          }
                          disabled={orderPage >= ordersData.totalPage - 1}
                          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Trang sau
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "password" && (
              <div className="p-8">
                <h2 className="text-xl font-semibold mb-6">Đổi mật khẩu</h2>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "currentPassword",
                          e.target.value,
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nhập mật khẩu hiện tại"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        handlePasswordInputChange("newPassword", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nhập mật khẩu mới"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "confirmPassword",
                          e.target.value,
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                      minLength={6}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={isChangingPassword}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isChangingPassword && (
                      <Loader className="animate-spin" size={16} />
                    )}
                    <span>
                      {isChangingPassword
                        ? "Đang cập nhật..."
                        : "Cập nhật mật khẩu"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

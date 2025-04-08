import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {adminRoutes, customerPrivateRoutes, publicRoutes, RouteType} from "@/routes";
import {User} from "@/types/models.ts";
import {RootState} from "@/redux/store.ts";
import {toastError} from "@/lib/utils.ts";
import {ROUTES} from "@/types/constant.ts";

interface ProtectedRouteProps {
  route: RouteType;
  children: React.ReactNode;
}

// sau này dùng để authorization
const hasAccess = (route: RouteType, user: User | null): boolean => {
  const isPublicRoute = publicRoutes.some((r) => r.path === route.path);
  const isPrivateRoute = customerPrivateRoutes.some((r) => r.path === route.path);
  const isAdminRoute = adminRoutes.some((r) => r.path === route.path);

  if (!user) {
    // Người dùng chưa đăng nhập: Chỉ được truy cập publicRoutes
    return isPublicRoute;
  }

  if (user.role === 'ADMIN') {
    // Admin: Được truy cập tất cả
    return isPublicRoute || isPrivateRoute || isAdminRoute;
  }

  if (user.role === 'CUSTOMER') {
    // Customer đã đăng nhập: Được truy cập privateRoutes và publicRoutes
    return isPrivateRoute || isPublicRoute;
  }

  return false; // Trường hợp không xác định
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ route, children }) => {
  const {me} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // sau này dùng để authorization
  // if (!hasAccess(route, me)) {
  //   // Nếu không có quyền, chuyển hướng dựa trên trạng thái đăng nhập
  //   if (!me) {
  //     toastError('Bạn cần đăng nhập để truy cập trang này!', 1500);
  //     navigate(ROUTES.HOME);
  //     return;
  //   } else {
  //     toastError('Bạn không có quyền truy cập trang này!', 1500);
  //     navigate(ROUTES.HOME);
  //     return;
  //   }
  // }

  return <>{children}</>;
};
export default ProtectedRoute;

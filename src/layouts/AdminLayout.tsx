import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { useStomp } from "@/hooks/useStomp";
import { cn, toastSuccess } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { ADMIN_ONLY, ADMIN_ROUTES } from "@/types/constant";
import { UserRole } from "@/types/models";
import { IMessage } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { matchPath, Navigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}
export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { me } = useAppSelector((state) => state.auth);
  const { subscribeToTopic, connected } = useStomp("anynomous customer");
  useEffect(() => {
    if (!connected) return;
    if (!me) return;
    const topic = "/topic/admin-notifications";
    const handleMessageComing = (message: IMessage) => {
      toastSuccess(message.body, 3000);
    };
    const unsubscribe = subscribeToTopic(topic, handleMessageComing);
    return unsubscribe;
  }, [connected, subscribeToTopic, me]);
  const isAdmin = me?.roles.includes(UserRole.ROLE_ADMIN);
  const [expand, setExpand] = useState(true);
  const { pathname } = useLocation();
  const isAdminOnlyPath = ADMIN_ONLY.some((adminPath) =>
    matchPath(adminPath, pathname),
  );
  if (!isAdmin && isAdminOnlyPath) {
    return <Navigate to={ADMIN_ROUTES.UNAUTHORIZED} />;
  }
  const toggleEpand = () => {
    setExpand((pre) => !pre);
  };

  return (
    <div className="flex  h-screen ">
      <AdminSideBar expand={expand} toggleExpand={toggleEpand} />
      <div
        className={cn("flex flex-col px-10 w-full ml-15", expand && "ml-54")}
      >
        <AdminHeader />
        <div className="h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

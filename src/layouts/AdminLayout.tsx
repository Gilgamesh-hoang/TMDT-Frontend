import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex  ">
      <AdminSideBar className="fixed" />
      <div className="flex flex-col px-10 w-full bg-gray-100">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

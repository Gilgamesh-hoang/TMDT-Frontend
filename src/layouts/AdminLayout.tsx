import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}
export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [expand, setExpand] = useState(true);
  const toggleEpand = () => {
    setExpand((pre) => !pre);
  };
  return (
    <div className="flex  h-screen bg-gray-100">
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

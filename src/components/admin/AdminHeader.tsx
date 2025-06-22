import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut, Settings } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { UserRole } from "@/types/models";
import { cn, toastSuccess } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useLogoutMutation } from "@/api/auth";
import { setCurrentUser } from "@/redux/slices/authSlice";
import { ROUTES } from "@/types/constant";
import { useDispatch } from "react-redux";

export const AdminHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { me } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const isAdmin = me?.roles.includes(UserRole.ROLE_ADMIN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(location.search);
      params.set("q", searchTerm);
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setCurrentUser(null));
      toastSuccess("Đăng xuất thành công");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white py-2  px-4 rounded-4xl">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <h3 className="text-gray">Hi</h3>
          <h3 className="text-primary whitespace-nowrap flex-grow">
            {me?.fullName}!
          </h3>
        </div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          size={40}
        />
      </div>
      <div className="flex items-center space-x-6">
        <div
          className={cn(
            "border-3 px-2 py-1 rounded  text-white",
            isAdmin ? "bg-primary" : "bg-success",
          )}
        >
          {isAdmin ? "Admin" : "Nhân viên"}
        </div>
        <div className="relative">
          <Bell />
        </div>
        <div className="flex-center gap-10">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <Settings />
            </PopoverTrigger>
            <PopoverContent className="w-42  " sideOffset={9}>
              <button
                className="flex gap-4 hover:text-red-900 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut />
                Đăng xuất
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <Avatar>
          <AvatarImage
            width={40}
            className="rounded-full"
            src="https://randomuser.me/api/portraits/men/34.jpg"
          />
        </Avatar>
      </div>
    </div>
  );
};

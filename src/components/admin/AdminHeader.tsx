import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { Badge } from "../ui/badge";

export const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center bg-white py-2  px-4 rounded-4xl">
      <div className="flex items-center space-x-4">
        <h3 className="text-gray">WELCOME</h3>
        <Input placeholder="Search" size={50} />
      </div>
      <div className="flex items-center space-x-6">
        <Link to="wishlist" className="relative">
          <Bell />
          <Badge className="absolute  rounded-full -top-2 -right-3">3</Badge>
        </Link>
        <Settings/>
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

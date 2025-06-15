import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";

export const AdminHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(location.search);
      params.set("q", searchTerm);
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };
  return (
    <div className="flex justify-between items-center bg-white py-2  px-4 rounded-4xl">
      <div className="flex items-center space-x-4">
        <h3 className="text-gray">WELCOME</h3>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          size={50}
        />
      </div>
      <div className="flex items-center space-x-6">
        <Link to="wishlist" className="relative">
          <Bell />
          <Badge className="absolute  rounded-full -top-2 -right-3">3</Badge>
        </Link>
        <Settings />
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

import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
const SearchBar = () => {
  return (
    <div className=" relative shadow-2xl rounded-2xl border  border-gray-200 ">
      <Input
        className="rounded-2xl drop-shadow-2xl border-none ring-0 "
        placeholder="Tìm kiếm"
        size={50}
      ></Input>
      <Search className="absolute top-1/2 transform -translate-y-1/2 right-4" />
    </div>
  );
};
export const Header = () => {
  return (
    <div className="flex justify-between items-center px-16 py-2">
      <div className="w-16 h-16  flex-center rounded-full bg-primary">Logo</div>
      <SearchBar />
      <div className="flex-center gap-10">
        <User />
        <Link to="wishlist" className="relative">
          <Heart />
          <Badge
            className="absolute  rounded-full -top-2 -right-3"
            variant="destructive"
          >
            3
          </Badge>
        </Link>
        <Link to="wishlist" className="relative">
          <ShoppingCart />
          <Badge
            className="absolute  rounded-full -top-2 -right-3"
            variant="destructive"
          >
            5
          </Badge>
        </Link>
      </div>
    </div>
  );
};

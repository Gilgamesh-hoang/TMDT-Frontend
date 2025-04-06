import { Badge } from "@/components/ui/badge";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Heart,
    Lock,
    Search,
    ShoppingCart,
    User,
    User2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
const NavBar = () => {
  return (
    <NavigationMenu className="my-4 mx-auto ">
      <NavigationMenuList>
        <NavigationMenuItem className="font-bold border-b-2 pr-4 border-b-primary">
          <Link to="/">Trang chủ</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent ml-24 ">
            Tinh dầu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3  w-[200px] ">
              <li className="border-b-1 border-b-gray-200">
                <NavigationMenuLink>Tinh dầu hương thảo</NavigationMenuLink>
              </li>
              <li className="border-b-1 border-b-gray-200">
                <NavigationMenuLink>Tinh dầu cam</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Tinh dầu oải hương</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-24">
          <Link to="/">Về chúng tôi</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-24">
          <Link to="/">Tư vấn</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
const SearchBar = () => {
  return (
    <div className=" relative drop-shadow-2xl rounded-2xl border  border-gray-200 ">
      <Input
        className="rounded-2xl  border-none ring-0 "
        placeholder="Tìm kiếm"
        size={50}
      ></Input>
      <Search className="absolute top-1/2 transform -translate-y-1/2 right-4" />
    </div>
  );
};
export const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-16 py-2">
        <div className="w-16 h-16  flex-center rounded-full bg-primary">
          Logo
        </div>
        <SearchBar />
        <div className="flex-center gap-10">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <User />
            </PopoverTrigger>
            <PopoverContent className="w-42  " sideOffset={9}>
              <Link
                to={"/login"}
                className="flex gap-4 mb-4 hover:text-red-900"
              >
                <Lock />
                Đăng nhập
              </Link>
              <Link to={"/register"} className="flex gap-4  hover:text-red-900">
                <User2 />
                Đăng ký
              </Link>
            </PopoverContent>
          </Popover>
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
      <div className="border-b-1 border-b-gray-200"></div>
      <NavBar />
    </div>
  );
};

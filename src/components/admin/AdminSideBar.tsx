import {
  adminSideBarData,
  SideBarLinkItemProps,
} from "@/data/adminSidebarData";
import { cn } from "@/lib/utils";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
interface Props {
  className?: string;
}
const SideBarLinkItem: React.FC<
  SideBarLinkItemProps & { expand: boolean; active: boolean }
> = ({ icon, name, href, expand, active = false }) => {
  return (
    <div>
      <Link
        to={`/admin${href}`}
        className={cn(
          "px-4 py-[8px] relative flex space-x-2 box-content",
          active && "text-primary shadow-[inset_4px_0_0_0_#ffab66]",
        )}
      >
        <div className={active ? "text-primary" : "text-black"}>{icon}</div>
        {expand && (
          <span
            className={cn(
              "hover:text-black",
              active ? "text-black" : "text-gray",
            )}
          >
            {name}
          </span>
        )}
      </Link>
    </div>
  );
};
export const AdminSideBar: React.FC<Props> = () => {
  const [expand, setExpand] = useState(true);
  const toggleEpand = () => {
    setExpand((pre) => !pre);
  };
  const { pathname } = useLocation();
  return (
    <div
      onMouseEnter={() => {
        if (!expand) toggleEpand();
      }}
      className={cn(
        " fixed bg-white  flex flex-col transition-all overflow-y-scroll h-full",
        expand ? "w-54" : "w-14",
      )}
    >
      <section
        className="pl-4 w-full py-4 pr-2 text-black border-b-2 border-b-gray-500  
        flex justify-between gap-x-10 items-center "
      >
        <div className="flex-center  space-x-2">
          <ShoppingCart className="text-primary" />
          {expand && <h3 className=" font-bold">AnNhien</h3>}
        </div>
        <div
          onClick={toggleEpand}
          className="bg-black text-white p-1 rounded-sm cursor-pointer"
        >
          <ArrowLeft />
        </div>
      </section>

      <div className=" mt-4 text-black flex flex-col space-y-2">
        {adminSideBarData.map((item) => (
          <div>
            {expand && <p className="font-bold px-4">{item.group}</p>}
            <div className="mt-4 flex flex-col space-y-2">
              {item.linkItems.map((link) => (
                <SideBarLinkItem
                  expand={expand}
                  active={pathname.substring(6).startsWith(link.href)}
                  {...link}
                  key={link.href}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

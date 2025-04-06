import { Feature } from "@/components/customer/home/Features";
import { ShoppingCart, TruckIcon, User2Icon } from "lucide-react";
export const features: Feature[] = [
  {
    icon: <ShoppingCart size={50} />,
    title: "Shopping",
    description:
      "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
  {
    icon: <TruckIcon size={50} />,
    title: "Delivery",
    description:
      "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
  {
    icon: <User2Icon size={50} />,
    title: "Customer Serivce",
    description:
      "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
  },
];

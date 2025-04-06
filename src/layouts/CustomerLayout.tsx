import { Outlet } from "react-router-dom";
import { Header } from "@/components/customer/Header";
import { Footer } from "@/components/customer/Footer";

export const CustomerLayout = () => {
  return (
    <div className="w-full px-40  flex flex-col space-y-4">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

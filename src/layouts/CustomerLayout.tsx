import { Outlet } from "react-router-dom";
import { Header } from "@/components/customer/Header";
import { Footer } from "@/components/customer/Footer";

export const CustomerLayout = () => {
  return (
    <div className="w-full min-h-screen px-20 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

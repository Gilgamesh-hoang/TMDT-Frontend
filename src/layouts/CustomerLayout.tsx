import { Header, NavBar } from "@/components/customer/Header";
import { Footer } from "@/components/customer/Footer";

export const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full container mx-auto  px-40 flex flex-col space-y-1">
      <Header />
      <div className="border-b-1 border-b-gray-200"></div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

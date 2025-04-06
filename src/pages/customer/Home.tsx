import { Banner } from "@/components/customer/home/Banner";
import { BestSeller } from "@/components/customer/home/BestSeller";
import { BrandList } from "@/components/customer/home/BrandList";
import { Features } from "@/components/customer/home/Features";
import { Introduction } from "@/components/customer/home/Introduction";
import { NewCollection } from "@/components/customer/home/NewCollection";
import { features } from "@/mock/features";
import { introduction1, introduction2 } from "@/mock/introction";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <NewCollection />
      <Introduction {...introduction1} />
      <Features features={features} />
      <BestSeller />
      <Introduction reverse {...introduction2} />
      <BrandList />
    </div>
  );
};

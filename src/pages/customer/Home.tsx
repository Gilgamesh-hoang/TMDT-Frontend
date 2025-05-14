import { Banner } from "@/components/customer/home/Banner";
import { BestSeller } from "@/components/customer/home/BestSeller";
import { BrandList } from "@/components/customer/home/BrandList";
import { CustomerFeedbacks } from "@/components/customer/home/CustomerFeedbacks";
import { Features } from "@/components/customer/home/Features";
import { Introduction } from "@/components/customer/home/Introduction";
import { NewCollection } from "@/components/customer/home/NewCollection";
import { features } from "@/mock/features";
import { introduction1, introduction2 } from "@/mock/introction";
import MostView from "@/components/customer/home/MostView.tsx";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <NewCollection />
      <Introduction {...introduction1} />
      <Features features={features} />
      <BestSeller />
      <MostView />
      <Introduction reverse {...introduction2} />
      <CustomerFeedbacks />
      <BrandList />
    </div>
  );
};

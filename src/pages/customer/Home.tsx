import { Banner } from "@/components/customer/home/Banner";
import { Introduction } from "@/components/customer/home/Introduction";
import { NewCollection } from "@/components/customer/home/NewCollection";
import { introduction1, introduction2 } from "@/mock/introction";

export const Home = () => {
  return (
    <div className="">
      <Banner />
      <NewCollection />
      <Introduction {...introduction1} />
      <Introduction reverse {...introduction2} />
    </div>
  );
};

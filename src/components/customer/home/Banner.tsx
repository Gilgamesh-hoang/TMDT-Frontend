import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { uuid } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

export const Banner = () => {
  const bannerUrl = [
    "https://artofscent.vn/wp-content/uploads/2023/08/artofscent-banner-home-the-gioi-tinh-dau-100-nguyen-chat-thien-nhien-2.jpg",
    "https://natureessentialoil.com.vn/wp-content/uploads/2024/04/Banner-moi-Nam-2048x1024.jpg",
    "https://artofscent.vn/wp-content/uploads/2023/08/artofscent-banner-home-nen-thom-1.jpg",
  ];
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );
  return (
    <div className="w-full  ">
      <Carousel plugins={[autoplay]}>
        <CarouselContent>
          {bannerUrl.map((url) => (
            <CarouselItem key={uuid()}>
              <div className="h-[520px] w-full rounded-3xl overflow-hidden">
                <img className="w-full object-fit h-full" src={url} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

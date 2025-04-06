import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Ratings } from "@/components/ui/rating";
import { feedbacks } from "@/mock/customerFeedback";
import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export interface CustomerFeedback {
  avatar?: string;
  content: string;
  author: string;
  rating: number;
}
export const CustomerFeedbacks = () => {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  return (
    <div className="bg-primary/20 py-10 p-40 -mx-40">
      <Carousel
        plugins={[autoplay]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {feedbacks.map((item) => (
            <CarouselItem key={item.rating}>
              <div className="mx-auto px-60">
                <Avatar className="flex-center" >
                  <AvatarImage  className="rounded-full" src={item.avatar} />
                </Avatar>
                <blockquote className="italic font-semibold text-center text-2xl mt-4">
                  <p>{item.content}</p>
                </blockquote>
                <div className="flex-center mt-4">
                  <Ratings rating={item.rating} variant="yellow" />
                </div>
                <p className="text-center mt-4 text-lg">- {item.author} -</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

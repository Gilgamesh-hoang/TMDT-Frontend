import { Product } from "@/types/product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/components/customer/productDetail/productCarouselStyle.css";
import { uuid } from "@/lib/utils";
interface ImageCarouselsProps {
  images: string[];
}
export const ImageCarousels: React.FC<ImageCarouselsProps> = ({ images }) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img className="" src={images[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.slice(0, 5).map((src) => (
          <div key={uuid()}>
            <img src={src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export const Detail: React.FC<Product> = (props) => {
  const images = [
    "https://icharm.vn/wp-content/uploads/2024/07/tinh-dau-chanel-coco.png",
    "https://icharm.vn/wp-content/uploads/2024/07/tinh-dau-nuoc-hoa-chanel-coco.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
    "https://icharm.vn/wp-content/uploads/2024/07/cong-dung-tinh-dau.png",
  ];
  return (
    <div className="grid grid-cols-12  space-x-3">
      <div className="col-span-5 ">
        <ImageCarousels images={images} />
      </div>
      <div className="col-span-7 bg-yellow-500">
        <h3>{props.name}</h3>
      </div>
    </div>
  );
};

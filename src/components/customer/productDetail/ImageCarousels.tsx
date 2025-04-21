import { uuid } from "@/lib/utils";
import Slider from "react-slick";
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
    arrows:false,
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

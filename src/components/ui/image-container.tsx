import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import fallbackImage from "@/assets/icons/loader.svg";
interface ImageContainerProps {
  src: string;
  className?: string;
  alt?: string;
}
export const ImageContainer: FC<ImageContainerProps> = ({
  src,
  className,
  alt,
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        className="w-full h-full object-cover"
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(fallbackImage)}
      />
    </div>
  );
};

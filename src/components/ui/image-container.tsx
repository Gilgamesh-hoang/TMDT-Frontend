import { cn } from "@/lib/utils";
import { FC } from "react";

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
  return (
    <div className={cn("overflow-hidden", className)}>
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
  );
};

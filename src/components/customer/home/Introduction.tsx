import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface IntroductionProps {
  title: string;
  description: string;
  imageUrl?: string;
  href?: string;
}
export const Introduction: React.FC<
  IntroductionProps & { reverse?: boolean }
> = ({ title, description, imageUrl, href, reverse = false }) => {
  return (
    <div
      className={cn(
        "px-40 py-10 -mx-40",
        reverse ? "bg-white" : "bg-secondary/40",
      )}
    >
      <div className="grid grid-cols-2 gap-x-20">
        <div
          className={cn("flex flex-col space-y-4 px-5", reverse && "order-2")}
        >
          <h1 className={cn("text-5xl", reverse && "text-primary")}>{title}</h1>
          <p>{description}</p>
          <Link to={href || "/"}>
            <Button>Xem thêm</Button>
          </Link>
        </div>
        <div className=" rounded-2xl overflow-hidden shadow-2xl ">
          <div className="group h-92 w-140">
            <img
              className="w-full h-full object-cover group-hover:scale-130 transition-transform"
              src={imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

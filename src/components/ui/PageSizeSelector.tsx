import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
interface PageSizeSelectorProps {
  onValueChange: (value: string) => void;
}
export const PageSizeSelector: FC<PageSizeSelectorProps> = ({
  onValueChange,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Kích thước" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="15">15</SelectItem>
      </SelectContent>
    </Select>
  );
};

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ratings } from "@/components/ui/rating";
import { formatDateTime, truncateString } from "@/lib/string-utils";
import { Author } from "@/types/comment";
import { AdminRatingReponse } from "@/types/rating";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
interface GetCategoryColumnsProps {
  onDelete: (id: string) => void;
}
export const getAdminRatingColumns = ({
  onDelete,
}: GetCategoryColumnsProps): ColumnDef<AdminRatingReponse>[] => [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <p>{truncateString(row.getValue("id"), 10)}</p>,
  },
  {
    header: "Tác giả",
    accessorKey: "author",
    cell: ({ row }) => {
      const author: Author = row.getValue("author");
      return <span>{author.fullName}</span>;
    },
  },
  {
    header: "Nội dung",
    accessorKey: "content",
  },
  {
    header: "Sản phẩm",
    accessorKey: "productName",
    cell: ({ row }) => <p>{truncateString(row.getValue("productName"), 40)}</p>,
  },
  {
    header: "Sao",
    accessorKey: "rating",
    cell: ({ row }) => {
      const rating: number = row.getValue("rating");
      return <Ratings rating={rating} variant="yellow" />;
    },
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("createdAt"))}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rating = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(rating.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

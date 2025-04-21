import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { uuid } from "@/lib/utils";
import React from "react";
export interface BreadCrumbData {
  title?: string;
  href?: string;
}
interface ProductBreadCrumbProps {
  productName: string;
}
export const ProductBreadCrumb: React.FC<ProductBreadCrumbProps> = ({
  productName,
}) => {
  const data: BreadCrumbData[] = [
    { title: "Trang chủ", href: "/" },
    { title: "Sản phẩm", href: "/search" },
    { title: productName },
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) => (
          <React.Fragment key={uuid()}>
            <BreadcrumbItem key={uuid()}>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < data.length-1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

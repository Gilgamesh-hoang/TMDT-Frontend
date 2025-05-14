import { useGetProductDetailQuery } from "@/api/customerApi/product";
import { Detail } from "@/components/customer/productDetail/Detail";
import { ProductBlog } from "@/components/customer/productDetail/ProductBlog";
import { ProductBreadCrumb } from "@/components/customer/productDetail/ProductBreadCrumbs";
import { ProductTabs } from "@/components/customer/productDetail/ProductTabs";
import { SimilarProducts } from "@/components/customer/productDetail/SimilarProducts";
import { VisitedProducts } from "@/components/customer/productDetail/VisitedProducts";
import Loader from "@/components/ui/Loader";
import { isValidUUID } from "@/lib/string-utils";
import { Navigate, useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetProductDetailQuery(productId!, {
    skip: !isValidUUID(productId),
  });

  if (isLoading) return <Loader />;
  if (isError || !data) {
    return <Navigate to="/notfound" />;
  }
  const product = data.data;
  return (
    <div className="w-full flex flex-col space-y-2 p-2">
      <ProductBreadCrumb productName={data.data.product.name} />
      <Detail {...product} />
      <ProductBlog content={product.description} />
      <ProductTabs productId={product.product.id} />
      <SimilarProducts />
      <VisitedProducts />
    </div>
  );
};

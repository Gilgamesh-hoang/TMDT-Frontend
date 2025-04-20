import { useGetProductDetailQuery } from "@/api/customerApi/product";
import { Detail } from "@/components/customer/productDetail/Detail";
import { ProductBreadCrumb } from "@/components/customer/productDetail/ProductBreadCrumbs";
import Loader from "@/components/ui/Loader";
import { Navigate, useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetProductDetailQuery(
    productId || "",
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    return <Navigate to="/notfound" />;
  }
  return (
    <div className="w-full flex flex-col space-y-2 p-2">
      <ProductBreadCrumb productName={data.data.name} />
      <Detail {...data.data} />
    </div>
  );
};

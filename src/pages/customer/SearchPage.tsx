import { useSearchProductsQuery } from "@/api/customerApi/product";
import { ProductBreadCrumb } from "@/components/customer/productDetail/ProductBreadCrumbs";
import { SimilarProducts } from "@/components/customer/productDetail/SimilarProducts";
import { VisitedProducts } from "@/components/customer/productDetail/VisitedProducts";
import ProductCard from "@/components/customer/home/ProductCard.tsx";
import Loader from "@/components/ui/Loader";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/ui/Pagination";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const size = 10;

  // Sử dụng PaginationRequest object
  const { data, isLoading, isError } = useSearchProductsQuery({
    search: keyword,
    page: page,
    size: size
  });

  // Reset page khi keyword thay đổi
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // Lấy thông tin phân trang từ response của backend
  const products = data?.data?.data || [];
  const currentPage = data?.data?.currentPage || 1;
  const totalPages = data?.data?.totalPage || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col space-y-4 p-2">
      <ProductBreadCrumb productName={`Kết quả tìm kiếm: "${keyword}"`} />
      
      <div className="my-4">
        <h1 className="text-2xl font-bold mb-2">Kết quả tìm kiếm cho: "{keyword}"</h1>
        <p className="text-gray-500">
          {products.length > 0 ? 
            `${products.length} sản phẩm được tìm thấy${totalPages > 1 ? ` - Trang ${currentPage}/${totalPages}` : ''}` : 
            'Không tìm thấy sản phẩm'}
        </p>
      </div>
      
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center my-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <img 
            src="/empty-search.svg" 
            alt="Không tìm thấy sản phẩm" 
            className="w-64 h-64 mb-4" 
          />
          <h2 className="text-xl font-semibold">Không tìm thấy sản phẩm nào phù hợp</h2>
          <p className="text-gray-500 mt-2">Vui lòng thử lại với từ khóa khác</p>
        </div>
      )}
      
      <SimilarProducts />
      <VisitedProducts />
    </div>
  );
};
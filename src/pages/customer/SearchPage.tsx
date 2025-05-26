import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchFilterProductsQuery } from "@/api/customerApi/product";
import { ProductBreadCrumb } from "@/components/customer/productDetail/ProductBreadCrumbs";
import { SimilarProducts } from "@/components/customer/productDetail/SimilarProducts";
import { VisitedProducts } from "@/components/customer/productDetail/VisitedProducts";
import ProductCard from "@/components/customer/home/ProductCard.tsx";
import Loader from "@/components/ui/Loader";
import { Pagination } from "@/components/ui/Pagination";

import { ProductFilterDTO, SortDirection, SortOption } from "@/types/product";
import { FaFilter } from "react-icons/fa";
import { ProductFilterSidebar } from "@/components/customer/productDetail/ProductFilterSidebar";
import { useGetCategoriesQuery } from "@/api/customerApi/category";
import { Category } from "@/types/category";
import { ProductSortBar } from "@/components/customer/productDetail/ProductSortBar";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const size = 10;
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  // Directly calling the categories API here instead of using a custom hook
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const categories: Category[] = categoryData || [];

  // State for filter
  const [filter, setFilter] = useState<ProductFilterDTO>({
    sortOption: SortOption.NEWEST,
    sortDirection: SortDirection.DESC,
  });

  // Reset page when keyword or filter changes
  useEffect(() => {
    setPage(1);
  }, [keyword, filter]);

  // Using API to search and filter combined
  const { data, isLoading, isError } = useSearchFilterProductsQuery({
    search: keyword,
    filter,
    page,
    size,
  });

  // Get pagination info from backend response
  const products = data?.data?.data || [];

  const currentPage = data?.data?.currentPage || 1;
  const totalPages = data?.data?.totalPage || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilter: ProductFilterDTO) => {
    // Bảo toàn cài đặt sắp xếp khi các bộ lọc khác thay đổi
    // Lấy ra sortOption và sortDirection từ filter hiện tại
    const { sortOption, sortDirection } = filter;
    
    // Áp dụng các bộ lọc mới nhưng giữ nguyên các tùy chọn sắp xếp
    setFilter({
      ...newFilter,
      sortOption: sortOption || SortOption.NEWEST, // Mặc định nếu không có
      sortDirection: sortDirection || SortDirection.DESC, // Mặc định nếu không có
    });
  };

  const handleSortChange = (newFilter: ProductFilterDTO) => {
    // Chỉ cập nhật cài đặt sắp xếp nhưng giữ nguyên các bộ lọc khác
    const { sortOption, sortDirection } = newFilter;
    
    // Đảm bảo các bộ lọc như categoryIds, minPrice, maxPrice, minRating... được giữ nguyên
    setFilter(prevFilter => ({
      ...prevFilter,
      sortOption,
      sortDirection,
    }));
  };

  const toggleFilterMobile = () => {
    setShowFilterMobile(!showFilterMobile);
  };

  // Calculate min and max price from all products
  const minPriceGlobal = 0;
  const maxPriceGlobal = 10000000; // Assume max price is 10 million

  if (isLoading || categoriesLoading) {
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

      {/* Mobile filter toggle button */}
      <div className="lg:hidden">
        <button
          onClick={toggleFilterMobile}
          className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center"
        >
          <FaFilter className="mr-2" /> {showFilterMobile ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filter - Mobile */}
        {showFilterMobile && (
          <div className="lg:hidden w-full">
            <ProductFilterSidebar
              initialFilter={filter}
              onFilterChange={handleFilterChange}
              categories={categories || []}
              minPriceGlobal={minPriceGlobal}
              maxPriceGlobal={maxPriceGlobal}
            />
          </div>
        )}

        {/* Sidebar filter - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <ProductFilterSidebar
            initialFilter={filter}
            onFilterChange={handleFilterChange}
            categories={categories || []}
            minPriceGlobal={minPriceGlobal}
            maxPriceGlobal={maxPriceGlobal}
          />
        </div>

        {/* Products grid */}
        <div className="w-full lg:w-3/4">
          {/* Product sort bar - MOVED HERE */}
          <div className="flex justify-end mb-4">
            <ProductSortBar filter={filter} onSortChange={handleSortChange} />
          </div>
          
          {isError ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-lg">
                Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <p className="text-lg mb-4">
                Không tìm thấy sản phẩm nào phù hợp với từ khóa "{keyword}"
              </p>
              <p className="text-gray-500">
                Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc của bạn
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Similar Products Based on Search */}
      <div className="mt-8">
        <SimilarProducts />
      </div>

      {/* Recently Visited Products */}
      <div className="mt-8">
        <VisitedProducts />
      </div>
    </div>
  );
};
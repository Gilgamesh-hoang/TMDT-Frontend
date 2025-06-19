import { useState, useEffect, useMemo, useCallback } from "react";
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
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const categories: Category[] = useMemo(() => categoryData || [], [categoryData]);

  const initialFilterState = useMemo(() => ({
    sortOption: SortOption.NEWEST,
    sortDirection: SortDirection.DESC,
  }), []);

  const [filter, setFilter] = useState<ProductFilterDTO>(initialFilterState);

 
  useEffect(() => {
    setPage(1);
  }, [keyword]); 

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [filter.categoryIds, filter.minPrice, filter.maxPrice, filter.minRating]); // Chỉ theo dõi các filter quan trọng

  const { data, isLoading, isError } = useSearchFilterProductsQuery({
    search: keyword,
    filter,
    page,
    size,
  });

  const products = data?.data?.data || [];
  const currentPage = data?.data?.currentPage || 1;
  const totalPages = data?.data?.totalPage || 1;

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFilterChange = useCallback((newFilter: ProductFilterDTO) => {
    setFilter(prevFilter => {
      const { sortOption, sortDirection } = prevFilter;

      return {
        ...newFilter,
        sortOption: sortOption || SortOption.NEWEST,
        sortDirection: sortDirection || SortDirection.DESC,
      };
    });
  }, []);

  const handleSortChange = useCallback((newFilter: ProductFilterDTO) => {

    const { sortOption, sortDirection } = newFilter;
    
    setFilter(prevFilter => ({
      ...prevFilter,
      sortOption,
      sortDirection,
    }));
  }, []);

  const toggleFilterMobile = useCallback(() => {
    setShowFilterMobile(prev => !prev);
  }, []);

  const priceRange = useMemo(() => ({
    min: 0,
    max: 10000000
  }), []);

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
              categories={categories}
              minPriceGlobal={priceRange.min}
              maxPriceGlobal={priceRange.max}
            />
          </div>
        )}

        {/* Sidebar filter - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <ProductFilterSidebar
            initialFilter={filter}
            onFilterChange={handleFilterChange}
            categories={categories}
            minPriceGlobal={priceRange.min}
            maxPriceGlobal={priceRange.max}
          />
        </div>

        {/* Products grid */}
        <div className="w-full lg:w-3/4">
          {/* Product sort bar */}
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
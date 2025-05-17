import { useState, useEffect } from "react";
import { ProductFilterDTO, SortDirection, SortOption } from "@/types/product";
import { Category } from "@/types/category";


interface ProductFilterSidebarProps {
  initialFilter: ProductFilterDTO;
  onFilterChange: (filter: ProductFilterDTO) => void;
  categories: Category[];
  minPriceGlobal: number;
  maxPriceGlobal: number;
}

export const ProductFilterSidebar = ({
  initialFilter,
  onFilterChange,
  categories,
  minPriceGlobal = 0,
  maxPriceGlobal = 10000000,
}: ProductFilterSidebarProps) => {
  const [filter, setFilter] = useState<ProductFilterDTO>(initialFilter);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilter.minPrice || minPriceGlobal,
    initialFilter.maxPrice || maxPriceGlobal,
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    // Update filter when price range changes
    const timer = setTimeout(() => {
      if (
        filter.minPrice !== priceRange[0] ||
        filter.maxPrice !== priceRange[1]
      ) {
        setFilter({
          ...filter,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  useEffect(() => {
    // Notify parent component when filter changes
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategoryIds = filter.categoryIds || [];
    const exists = updatedCategoryIds.includes(categoryId);

    setFilter({
      ...filter,
      categoryIds: exists
        ? updatedCategoryIds.filter((id) => id !== categoryId)
        : [...updatedCategoryIds, categoryId],
    });
  };

  const handleRatingChange = (rating: number) => {
    // Chuyển thành checkbox behavior: toggle rating value
    setFilter({
      ...filter,
      minRating: rating === filter.minRating ? undefined : rating,
    });
  };

  const handleSortChange = (option: SortOption) => {
    setFilter({
      ...filter,
      sortOption: option,
      // Reset direction when changing sort option
      sortDirection:
        option === SortOption.PRICE
          ? SortDirection.ASC
          : SortDirection.DESC,
    });
  };

  const handleSortDirectionChange = () => {
    setFilter({
      ...filter,
      sortDirection:
        filter.sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    });
  };

  const handleResetFilter = () => {
    setFilter({});
    setPriceRange([minPriceGlobal, maxPriceGlobal]);
  };

  // Define predefined price ranges based on the design
  const predefinedPriceRanges = [
    { min: 0, max: 49000, label: "Giá dưới 50.000đ" },
    { min: 50000, max: 199000, label: "Giá từ 50.000đ tới 200.000đ" },
    { min: 200000, max: 499000, label: "Giá từ 200.000đ tới 500.000đ" },
    { min: 500000, max: 1500000000, label: "Giá trên 500.000đ" },
  ];

  const handlePredefinedPriceRangeChange = (min: number, max: number) => {
    // Sửa để có thể check và uncheck
    if (filter.minPrice === min && filter.maxPrice === max) {
      // Nếu đang được chọn, hãy xóa bộ lọc giá
      setFilter({
        ...filter,
        minPrice: undefined,
        maxPrice: undefined,
      });
      setPriceRange([minPriceGlobal, maxPriceGlobal]);
    } else {
      // Nếu chưa được chọn, đặt giá trị mới
      setPriceRange([min, max]);
      setFilter({
        ...filter,
        minPrice: min,
        maxPrice: max,
      });
    }
  };

  return (
    <div className="rounded-lg border border-gray-200">
      {/* Header */}
      <div className="bg-orange-200 p-4 rounded-t-lg">
        <h3 className="font-bold text-gray-800 uppercase">LỌC SẢN PHẨM</h3>
      </div>

      {/* Filter Body */}
      <div className="p-4 space-y-6">
        {/* Lọc theo giá */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-bold text-gray-800 uppercase mb-3">GIÁ</h4>
          <div className="space-y-2">
            {predefinedPriceRanges.map((range, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-range-${index}`}
                  checked={
                    filter.minPrice === range.min && filter.maxPrice === range.max
                  }
                  onChange={() => 
                    handlePredefinedPriceRangeChange(range.min, range.max)
                  }
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`price-range-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Lọc theo danh mục */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-bold text-gray-800 uppercase mb-3">DANH MỤC</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={filter.categoryIds?.includes(category.id) || false}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Lọc theo đánh giá - Đổi từ radio button sang checkbox */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-bold text-gray-800 uppercase mb-3">ĐÁNH GIÁ</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"  
                  id={`rating-${rating}`}
                  checked={filter.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-sm text-gray-700 flex items-center"
                >
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                  <span className="ml-1">trở lên</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sắp xếp */}
      <div className="space-y-3">
        <h4 className="font-medium">SẮP XẾP THEO</h4>
        <div className="space-y-2">
          {[
            { value: SortOption.NEWEST, label: "Mới nhất" },
            { value: SortOption.BEST_SELLER, label: "Bán chạy" },
            { value: SortOption.PRICE, label: "Giá" },
            { value: SortOption.MOST_VIEWED, label: "Lượt xem" },
          ].map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`sort-${option.value}`}
                name="sort"
                checked={filter.sortOption === option.value}
                onChange={() => handleSortChange(option.value)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`sort-${option.value}`}
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                {option.label}
                {filter.sortOption === option.value && (
                  <button
                    onClick={handleSortDirectionChange}
                    className="ml-2 text-gray-500"
                  >
                    {filter.sortDirection === SortDirection.ASC ? "↑" : "↓"}
                  </button>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

        {/* Nút đặt lại */}
        <div className="pt-2">
          <button
            onClick={handleResetFilter}
            className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};
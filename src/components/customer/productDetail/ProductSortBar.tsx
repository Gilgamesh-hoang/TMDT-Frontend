import { ProductFilterDTO, SortDirection, SortOption } from "@/types/product";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ProductSortBarProps {
  filter: ProductFilterDTO;
  onSortChange: (newFilter: ProductFilterDTO) => void;
}

export const ProductSortBar = ({ filter, onSortChange }: ProductSortBarProps) => {
  const [isPriceMenuOpen, setIsPriceMenuOpen] = useState(false);
  const priceMenuRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (option: SortOption) => {
    // Nếu không phải là tùy chọn giá, thì sử dụng logic ban đầu
    if (option !== SortOption.PRICE) {
      onSortChange({
        ...filter,
        sortOption: option,
        sortDirection: SortDirection.DESC, // Các tùy chọn khác mặc định giảm dần
      });
    }
  };

  const handlePriceSortChange = (direction: SortDirection) => {
    onSortChange({
      ...filter,
      sortOption: SortOption.PRICE,
      sortDirection: direction,
    });
    setIsPriceMenuOpen(false);
  };

  // Đóng menu giá khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priceMenuRef.current && !priceMenuRef.current.contains(event.target as Node)) {
        setIsPriceMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <span className="font-medium text-gray-700">SẮP XẾP THEO:</span>
      <div className="flex flex-wrap gap-2">
        {[
          { value: SortOption.NEWEST, label: "Mới nhất" },
          { value: SortOption.BEST_SELLER, label: "Bán chạy" },
          { value: SortOption.MOST_VIEWED, label: "Lượt xem" },
        ].map((option) => (
          <div 
            key={option.value} 
            className={`px-3 py-1 rounded-full cursor-pointer border ${
              filter.sortOption === option.value 
                ? "bg-orange-100 border-orange-500 text-orange-700" 
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleSortChange(option.value)}
          >
            <span className="text-sm">{option.label}</span>
          </div>
        ))}
        
        {/* Tùy chọn Giá với menu con */}
        <div className="relative" ref={priceMenuRef}>
          <div 
            className={`px-3 py-1 rounded-full cursor-pointer border flex items-center ${
              filter.sortOption === SortOption.PRICE 
                ? "bg-orange-100 border-orange-500 text-orange-700" 
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setIsPriceMenuOpen(!isPriceMenuOpen)}
            onMouseEnter={() => setIsPriceMenuOpen(true)}
          >
            <span className="text-sm">
              {filter.sortOption === SortOption.PRICE 
                ? `Giá: ${filter.sortDirection === SortDirection.ASC ? "thấp đến cao" : "cao đến thấp"}` 
                : "Giá"
              }
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
          
          {/* Menu con cho tùy chọn giá */}
          {isPriceMenuOpen && (
            <div className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div 
                className={`px-3 py-2 hover:bg-orange-100 cursor-pointer ${
                  filter.sortOption === SortOption.PRICE && filter.sortDirection === SortDirection.ASC
                    ? "bg-orange-100 text-orange-700 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handlePriceSortChange(SortDirection.ASC)}
              >
                <span className="text-sm">Thấp đến cao</span>
              </div>
              <div 
                className={`px-3 py-2 hover:bg-orange-100 cursor-pointer ${
                  filter.sortOption === SortOption.PRICE && filter.sortDirection === SortDirection.DESC
                    ? "bg-orange-100 text-orange-700 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handlePriceSortChange(SortDirection.DESC)}
              >
                <span className="text-sm">Cao đến thấp</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
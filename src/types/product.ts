
import {Category} from "@/types/category.ts";

export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    images: string[];
    totalViews: number;
    volume: string;
    thumbnail: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    rating?: number;
    sold?: number;
}

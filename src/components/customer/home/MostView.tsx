import ProductCard from "@/components/customer/home/ProductCard.tsx";
import {useGetMostViewedProductsQuery} from "@/api/customerApi/product.ts";
import Loader from "@/components/ui/Loader.tsx";

const MostView = () => {

    const {data, isLoading} = useGetMostViewedProductsQuery({page: 1, size: 8});

    const renderProducts = () => {
        if (isLoading) {
            return <Loader/>;
        }

        const products = data?.data;
        if (!products || products.length === 0) {
            return <p className="text-center w-full m-3 text-xl">Không có sản phẩm nào</p>;
        }

        return (
            <div className="grid grid-cols-4 grid-rows-2  gap-y-5 gap-x-5 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product}/>
                ))}
            </div>
        )
    }


    return (
        <div className="flex flex-col space-x-4">
            <div className="flex items-center justify-center ">
                <div className="bg-primary h-[2px] w-full">.</div>
                <h1 className="text-center w-full text-primary">Sản phẩm được xem nhiều nhất</h1>
                <div className="bg-primary h-[2px] w-full">.</div>
            </div>
            {renderProducts()}
        </div>
    );
};

export default MostView;
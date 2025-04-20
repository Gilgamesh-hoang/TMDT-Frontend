import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardFooter} from "@/components/ui/card";
import {Link} from "react-router-dom";
import {useGetNewestProductsQuery} from "@/api/customerApi/product.ts";
import Loader from "@/components/ui/Loader.tsx";
import {Product} from "@/types/product.ts";

const CollectionCard: React.FC<Product> = (product) => {

    const cutOffDescription = (description: string) => {
        if (!description) return "";

        const arr = description.split(" ");
        if (arr.length <= 30) return description;

        return arr.slice(0, 30).join(" ") + "...";
    }

    return (
        <Card className="p-0 shadow gap-2 group hover:shadow-2xl transition-shadow">
            <div className="rounded-2xl overflow-hidden">
                <div className="overflow-hidden">
                    <img
                        className="group-hover:scale-120 transition-transform"
                        src={product.thumbnail}
                        alt={product.name}
                    />
                </div>
            </div>
            <CardDescription className="px-4 m-0">
                <h3>{product.name}</h3>
                <p>{cutOffDescription(product.description)}</p>
            </CardDescription>
            <CardFooter className="mb-3 px-4 ">
                <Link to={"/collection/" + product.id}>
                    <Button>Khám phá ngay</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export const NewCollection = () => {
    const {data, isLoading} = useGetNewestProductsQuery({page: 1, size: 3});

    const renderProducts = () => {
        if (isLoading) {
            return <Loader/>;
        }

        const products = data?.data;
        if (!products || products.length === 0) {
            return <p className="text-center w-full m-3 text-xl">Không có sản phẩm nào</p>;
        }

        return (
            <div className="grid grid-cols-3 gap-10 mt-6">
                {products.map((product) => (
                    <CollectionCard key={product.id} {...product}/>
                ))}
            </div>
        )
    }

    return (
        <div className="my-4">
            <div className="w-1/2 mx-auto">
                <h1 className="text-center">Bộ sưu tập mới</h1>
                <p className="text-center text-gray">
                    Bộ sưu tập mới của
                    <strong> An Nhiên Essential Oil </strong>
                    mang đến những dòng tinh dầu thiên nhiên tinh khiết. Với hương thơm
                    dịu nhẹ và thiết kế sang trọng, mỗi sản phẩm là một trải nghiệm thư
                    giãn tuyệt vời. Bộ sưu tập lần này được chọn lọc kỹ lưỡng từ nguyên
                    liệu cao cấp.
                </p>
            </div>

            {renderProducts()}

        </div>
    );
};

import {CartItem} from "@/types/cart.ts";

const cartItems: CartItem[] = [
    {
        id: "dcd08471-73c7-44fa-9084-7173c724fa57",
        product: {
            id: "72a71a1f-409d-4d71-a911-58886b4aff7f",
            category: {
                id: "51f97d34-9b3c-4650-b97d-349b3c4650f0",
                name: "Tinh dầu trái cây",
            },
            name: "Tinh Dầu Cam Hương Bergamot (Bergamot Essential Oil) Heny Garden",
            description: "", // Không có trong JSON, gán mặc định
            images: [], // Không có trong JSON, gán mặc định
            totalViews: 19,
            volume: "10ml",
            thumbnail: "https://product.hstatic.net/200000121007/product/tinh-dau-cam-huong-heny-garden-thuong_2ed14eeda7de4cbd9e7ad57aff3a4378.jpg",
            price: 89000,
            discountPrice: 0,
            quantity: 50,
            rating: 0,
            sold: 0,
        },
        quantity: 1,
    },
    {
        id: "086ee265-ee41-4a5f-aee2-65ee41ca5f39",
        product: {
            id: "c9348c78-6437-4d66-9f15-5f5bd332b27a",
            category: {
                id: "56d1901b-1e5d-433c-9190-1b1e5d633c41",
                name: "Tinh dầu hoa",
            },
            name: "Tinh Dầu Thơm Phối Hương Precious Emerald (Viên Ngọc Lục Bảo) Heny Garden",
            description: "",
            images: [],
            totalViews: 19,
            volume: "10ML",
            thumbnail: "https://product.hstatic.net/200000121007/product/tinh-dau-thom-emerald_8641ff82acaa44529d2499d3c12f2cd8.jpg",
            price: 149000,
            discountPrice: 0,
            quantity: 50,
            rating: 0,
            sold: 0,
        },
        quantity: 1,
    },
    {
        id: "d757704e-ee27-4006-9770-4eee27f0062e",
        product: {
            id: "d0d9e858-257f-4170-a520-2d784df6e7d5",
            category: {
                id: "7b92a6fa-f18e-4210-92a6-faf18ea2100a",
                name: "Tinh dầu vỏ cây, hạt cây",
            },
            name: "Tinh Dầu Oải Hương (Lavender Essential Oil) Heny Garden",
            description: "",
            images: [],
            totalViews: 21,
            volume: "10ml",
            thumbnail: "https://product.hstatic.net/200000121007/product/tinh-dau-hoa-oai-huong-heny-garden-thuong_ce0b15bad0c24305961e2c47ea439359.jpg",
            price: 129000,
            discountPrice: 0,
            quantity: 50,
            rating: 0,
            sold: 0,
        },
        quantity: 1,
    },
    {
        id: "016270c6-37cf-4a9d-a270-c637cf6a9daf",
        product: {
            id: "28f4a774-2a84-429b-83ad-0d04c10e8c0c",
            category: {
                id: "5baec91e-d470-45d4-aec9-1ed47085d452",
                name: "Tinh dầu hỗn hợp",
            },
            name: "Đèn Xông Tinh Dầu Gốm Bằng Nến Làm Thơm Phòng HENY GARDEN",
            description: "",
            images: [],
            totalViews: 21,
            volume: "Đèn + 6 Nến + Ko T.Dầu",
            thumbnail: "https://product.hstatic.net/200000121007/product/den-xong-tinh-dau-shopeethuong_3b6dd96f7cd1455f9e4737c4b83a94ac.jpg",
            price: 99000,
            discountPrice: 0,
            quantity: 50,
            rating: 0,
            sold: 0,
        },
        quantity: 1,
    },
];

export default cartItems;
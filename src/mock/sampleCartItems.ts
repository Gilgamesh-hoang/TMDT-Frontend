import {CartItem} from "@/types/cart.ts";

const sampleCartItems: CartItem[] = [
    // CartItem 1: Laptop
    {
        id: 'cart-item-001',
        product: {
            id: 'product-001',
            category: { id: 'cat-001', name: 'Electronics' },
            name: 'MacBook Pro 14-inch M2',
            description: 'High-performance laptop with M2 chip, 16GB RAM, 512GB SSD.',
            images: [
                'https://example.com/images/macbook-pro-1.jpg',
                'https://example.com/images/macbook-pro-2.jpg',
            ],
            totalViews: 1200,
            volume: '14-inch',
            thumbnail: 'https://example.com/images/macbook-pro-thumb.jpg',
            price: 1999.99,
            discountPrice: 1799.99,
            quantity: 50,
            rating: 4.8,
            sold: 300,
        },
        quantity: 1,
    },

    // CartItem 2: Smartphone
    {
        id: 'cart-item-002',
        product: {
            id: 'product-002',
            category: { id: 'cat-001', name: 'Electronics' },
            name: 'iPhone 15 Pro',
            description: 'Latest iPhone with A17 Pro chip, 256GB storage, titanium design.',
            images: [
                'https://example.com/images/iphone-15-pro-1.jpg',
                'https://example.com/images/iphone-15-pro-2.jpg',
            ],
            totalViews: 2500,
            volume: '6.1-inch',
            thumbnail: 'https://example.com/images/iphone-15-pro-thumb.jpg',
            price: 999.99,
            discountPrice: undefined,
            quantity: 100,
            rating: 4.7,
            sold: 500,
        },
        quantity: 2,
    },

    // CartItem 3: Headphones
    {
        id: 'cart-item-003',
        product: {
            id: 'product-003',
            category: { id: 'cat-002', name: 'Accessories' },
            name: 'Sony WH-1000XM5',
            description: 'Wireless noise-canceling headphones with 30-hour battery life.',
            images: [
                'https://example.com/images/sony-wh-1000xm5-1.jpg',
                'https://example.com/images/sony-wh-1000xm5-2.jpg',
            ],
            totalViews: 800,
            volume: 'N/A',
            thumbnail: 'https://example.com/images/sony-wh-1000xm5-thumb.jpg',
            price: 399.99,
            discountPrice: 349.99,
            quantity: 75,
            rating: 4.9,
            sold: 200,
        },
        quantity: 1,
    },

    // CartItem 4: Coffee Maker
    {
        id: 'cart-item-004',
        product: {
            id: 'product-004',
            category: { id: 'cat-003', name: 'Home Appliances' },
            name: 'Nespresso Vertuo Plus',
            description: 'Coffee and espresso machine with automatic capsule recognition.',
            images: [
                'https://example.com/images/nespresso-vertuo-1.jpg',
                'https://example.com/images/nespresso-vertuo-2.jpg',
            ],
            totalViews: 600,
            volume: '40 oz',
            thumbnail: 'https://example.com/images/nespresso-vertuo-thumb.jpg',
            price: 199.99,
            discountPrice: undefined,
            quantity: 30,
            rating: 4.5,
            sold: 150,
        },
        quantity: 1,
    },

    // CartItem 5: Book
    {
        id: 'cart-item-005',
        product: {
            id: 'product-005',
            category: { id: 'cat-004', name: 'Books' },
            name: 'Atomic Habits',
            description: 'A book by James Clear on building good habits and breaking bad ones.',
            images: [
                'https://example.com/images/atomic-habits-1.jpg',
                'https://example.com/images/atomic-habits-2.jpg',
            ],
            totalViews: 1500,
            volume: '320 pages',
            thumbnail: 'https://example.com/images/atomic-habits-thumb.jpg',
            price: 16.99,
            discountPrice: 14.99,
            quantity: 200,
            rating: 4.8,
            sold: 1000,
        },
        quantity: 3,
    },
];

export default sampleCartItems;
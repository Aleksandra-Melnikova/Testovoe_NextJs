interface Product {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

interface ApiProductResponse {
    page: number;
    amount: number;
    total: number;
    items: Product[];
}
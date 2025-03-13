export interface SearchResult {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export interface Product {
    // New properties
    amount: number;

    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    thumbnail: string;
    images: string[];
};

export interface Review {
    rating: number,
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
};


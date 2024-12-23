export interface ProductsResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;
    rating: Rating;
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export interface Rating {
    rate: number;
    count: number;
}

export interface ProductDto extends Omit<ProductsResponse, 'title' | 'rating'> {
    name: string;
}
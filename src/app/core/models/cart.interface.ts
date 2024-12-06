import { ProductDto } from "./products.interface";

export interface Cart extends Omit<ProductDto, 'description' | 'category'> {
    quantity: number;
    subtotal: number;
}

export interface OrderDto {
    userId: number;
    date: string;
    products: ProductsInCart[];
}

export interface ProductsInCart {
    productId: number;
    quantity: number;
}

export interface UserCarts {
    id:       number;
    userId:   number;
    date:     Date;
    products: ProductsInCart[];
}


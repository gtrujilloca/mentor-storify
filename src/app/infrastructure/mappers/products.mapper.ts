import { ProductDto, ProductsResponse } from "@/core/models/products.interface";

export function productsMapper(products: ProductsResponse[]): ProductDto[] {
    return products.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
    }));
}

export function singleProductMapper(product: ProductsResponse): ProductDto {
    return {
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
    };
}
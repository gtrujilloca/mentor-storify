import { ProductDto } from "@/core/models/products.interface";
import { Observable } from "rxjs";

export abstract class ProductsGateway {
    abstract getProducts(): Observable<ProductDto[]>;
    abstract getProductById(id: number): Observable<ProductDto>;
}
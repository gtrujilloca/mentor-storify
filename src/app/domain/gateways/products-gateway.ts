import { ProductsResponse } from "@/core/models/products.interface";
import { Observable } from "rxjs";

export abstract class ProductsGateway {
    abstract getProducts(): Observable<ProductsResponse[]>;
}
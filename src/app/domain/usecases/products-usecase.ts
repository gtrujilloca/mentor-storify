import { inject, Injectable } from "@angular/core";
import { ProductsGateway } from "../gateways/products-gateway";
import { Observable } from "rxjs";
import { ProductsResponse } from "@/core/models/products.interface";

@Injectable()
export class ProductsUsecase {
    private _productsGateway = inject(ProductsGateway);

    getProducts(): Observable<ProductsResponse[]> {
        return this._productsGateway.getProducts();
    }
}
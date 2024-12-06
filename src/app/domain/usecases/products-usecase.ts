import { ProductDto } from "@/core/models/products.interface";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductsGateway } from "../gateways/products-gateway";

@Injectable({
    providedIn: 'root'
})
export class ProductsUsecase {
    private _productsGateway = inject(ProductsGateway);

    getProducts(): Observable<ProductDto[]> {
        return this._productsGateway.getProducts();
    }

    getProductById(id: number): Observable<ProductDto> {
        return this._productsGateway.getProductById(id);
    }
}
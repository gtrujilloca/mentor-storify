import { ProductDto, ProductsResponse } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { productsMapper, singleProductMapper } from '../mappers/products.mapper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsGateway {
  
  constructor(private httpClient: HttpClient) {
    super();
  }
  
  getProducts(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductsResponse[]>(`${environment.serviceUrl}/products`).pipe(
      map(products => productsMapper(products))
    );
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.httpClient.get<ProductsResponse>(`${environment.serviceUrl}/products/${id}`).pipe(
      map(product => singleProductMapper(product))
    )
  }
}

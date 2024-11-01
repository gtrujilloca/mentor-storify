import { ProductsResponse } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsGateway {
  
  constructor(private httpClient: HttpClient) {
    super();
  }
  
  getProducts(): Observable<ProductsResponse[]> {
    return this.httpClient.get<ProductsResponse[]>(`${environment.serviceUrl}/products`);
  }
}

import { ProductsResponse } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { ProductsUsecase } from '@/domain/usecases/products-usecase';
import { ProductsService } from '@/infrastructure/driven-adapters/products.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
],
  providers: [
    ProductsUsecase,
    {
      provide: ProductsGateway,
      useClass: ProductsService
    }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _productsSrv = inject(ProductsUsecase);

  public products = signal<ProductsResponse[]>([]); 

  ngOnInit(): void {
    this._productsSrv.getProducts().subscribe((products) => {      
      this.products.set(products);
    });
  }
}

import { ProductDto } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { ProductsUsecase } from '@/domain/usecases/products-usecase';
import { ProductsService } from '@/infrastructure/driven-adapters/products.service';
import { AlertComponent } from '@/ui/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    AlertComponent
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

  public products = signal<ProductDto[]>([]); 

  ngOnInit(): void {
    this._productsSrv.getProducts().subscribe((products) => {      
      this.products.set(products);
    });
  }
}

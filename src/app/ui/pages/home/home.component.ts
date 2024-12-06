import { ProductDto } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { ProductsUsecase } from '@/domain/usecases/products-usecase';
import { ProductsService } from '@/infrastructure/driven-adapters/products.service';
import { AlertComponent } from '@/ui/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { StateFaccade } from '@/ui/state/services/state-faccade.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    AlertComponent,
    // StoreModule.forFeature(storifyLocalFeature)
],
  providers: [
    // ProductsUsecase,
    // {
    //   provide: ProductsGateway,
    //   useClass: ProductsService
    // }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // private _productsSrv = inject(ProductsUsecase);
  private _productsSrv = inject(StateFaccade);

  // public products = signal<ProductDto[]>([]); 
  public products$ = this._productsSrv.productsData$

  ngOnInit(): void {
    this._productsSrv.getProducts();
  }
}

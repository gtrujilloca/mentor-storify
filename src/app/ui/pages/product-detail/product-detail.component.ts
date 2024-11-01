import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { ProductsUsecase } from '@/domain/usecases/products-usecase';
import { ProductsService } from '@/infrastructure/driven-adapters/products.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    ProductsUsecase,
    {
      provide: ProductsGateway,
      useClass: ProductsService
    }
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent { }

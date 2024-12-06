import { ProductDto } from '@/core/models/products.interface';
import { ProductsGateway } from '@/domain/gateways/products-gateway';
import { ProductsUsecase } from '@/domain/usecases/products-usecase';
import { ProductsService } from '@/infrastructure/driven-adapters/products.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    // ProductsUsecase,
    // {
    //   provide: ProductsGateway,
    //   useClass: ProductsService
    // }
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent implements OnInit {
  private _productsSrv = inject(ProductsUsecase);
  public productInformation = signal<ProductDto>({} as ProductDto);
  public productId!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.productId = Number(paramMap.get('id'));
    });

    this._productsSrv.getProductById(this.productId).subscribe(product => {
      this.productInformation.set(product);
    });
  }
}

import { CartAlertsMessages } from '@/core/constants/alerts.constants';
import { ProductDto } from '@/core/models/products.interface';
import { CartGateway } from '@/domain/gateways/cart-gateway';
import { CartUsecase } from '@/domain/usecases/cart-usecase';
import { AlertService } from '@/infrastructure/driven-adapters/alert.service';
import { CartService } from '@/infrastructure/driven-adapters/cart.service';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: CartGateway,
      useExisting: CartService
    }
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() item!: ProductDto;
  @Output() cartAlert = new EventEmitter<void>();
  private messages = CartAlertsMessages;

  constructor(private router: Router) { }

  private _cartSrv = inject(CartUsecase);
  private _alertSrv = inject(AlertService);
  private readonly _stateSrv = inject(StateFaccade);

  goToDetails(name: string, id: number): void {
    this.router.navigate([`product/${name}/${id}`]);
  }

  addToCart(product: ProductDto): void {
    // this._cartSrv.addToCart(product)
    // this._alertSrv.showAlert(this.messages.ADDED_TO_CART);

    this._stateSrv.addToCart(product, this.messages.ADDED_TO_CART)
  }

  triggerAlert(): void {
    this.cartAlert.emit();
  }
}

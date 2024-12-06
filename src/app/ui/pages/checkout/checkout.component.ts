import { OderAlertsMessages } from '@/core/constants/alerts.constants';
import { Cart } from '@/core/models/cart.interface';
import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { CartGateway } from '@/domain/gateways/cart-gateway';
import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { CartUsecase } from '@/domain/usecases/cart-usecase';
import { AlertService } from '@/infrastructure/driven-adapters/alert.service';
import { AuthService } from '@/infrastructure/driven-adapters/auth.service';
import { CartService } from '@/infrastructure/driven-adapters/cart.service';
import { AlertComponent } from '@/ui/components/alert/alert.component';
import { CartComponent } from '@/ui/components/cart/cart.component';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    CartComponent,
    AlertComponent
  ],
  providers: [
    AuthUsecase,
    {
      provide: AuthGateway,
      useClass: AuthService
    },
    {
      provide: CartGateway,
      useExisting: CartService
    }
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckoutComponent {
  // cartList = signal<Cart[]>([]);
  cartService = inject(CartUsecase);
  alertService = inject(AlertService);
  private messages = OderAlertsMessages;
  private _authSrv = inject(AuthUsecase);
  private readonly _stateSrv = inject(StateFaccade);

  cartList$ = this._stateSrv.productsInCartData$;
  total$ = this._stateSrv.totalCartAmount$;

  // ngOnInit(): void {
  //   this.cartService.currentCart.subscribe(products =>
  //     this.cartList.set(products)
  //   )
  // }

  checkout(): void {
    const date = new Date().toISOString().split('T')[0];
    const userId = this._authSrv.getUserId();
    if (!userId) {
      this.alertService.showAlert(this.messages.AUTH_ERROR);
      return;
    }

    const order = {
      userId,
      date,
      products: this.productsAndQuantity
    };

    this._stateSrv.sendOrder(order);
  }

  get productsAndQuantity() {
    let products: { productId: number, quantity: number }[] = [];
    this.cartList$.subscribe(cartList => {
      products = cartList.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
    });
    return products;
  }

  get total() {
    let total = 0;
    this.cartList$.subscribe(cartList => {
      total = cartList.reduce((acc, item) => acc + item.subtotal, 0);
    });
    return total.toFixed(2);
  }
}

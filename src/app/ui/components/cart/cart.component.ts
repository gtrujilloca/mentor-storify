import { Cart } from '@/core/models/cart.interface';
import { CartGateway } from '@/domain/gateways/cart-gateway';
import { CartUsecase } from '@/domain/usecases/cart-usecase';
import { CartService } from '@/infrastructure/driven-adapters/cart.service';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: CartGateway,
      useExisting: CartService
    }
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent { 
  @Input() cartItem!: Cart;

  private readonly _stateSrv = inject(StateFaccade);

  removeItem(id: number) {
    this._stateSrv.removeFromCart(id);
  }
}

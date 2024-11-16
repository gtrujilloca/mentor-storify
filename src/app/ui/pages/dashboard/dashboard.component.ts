import { UserCarts } from '@/core/models/cart.interface';
import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { CartGateway } from '@/domain/gateways/cart-gateway';
import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { CartUsecase } from '@/domain/usecases/cart-usecase';
import { AuthService } from '@/infrastructure/driven-adapters/auth.service';
import { CartService } from '@/infrastructure/driven-adapters/cart.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent implements OnInit { 

  private _cartSrv = inject(CartUsecase);
  private _authSrv = inject(AuthUsecase);
  public userId!: number | null;
  public userCarts = signal<UserCarts[]>([]);

  ngOnInit(): void {
    this.userId = this._authSrv.getUserId();
    
    if (this.userId) {
      this._cartSrv.getUserCarts(this.userId).subscribe(carts => {
        this.userCarts.set(carts);
      });
    }
  }

}

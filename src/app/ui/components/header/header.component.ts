import { CartGateway } from '@/domain/gateways/cart-gateway';
import { CartUsecase } from '@/domain/usecases/cart-usecase';
import { CartService } from '@/infrastructure/driven-adapters/cart.service';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  providers: [
    {
      provide: CartGateway,
      useExisting: CartService
    },
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  lightClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
  darkClasses = 'bg-slate-700 text-slate-100 dark:bg-slate-100 dark:text-slate-700'

  // cartItems = signal<number>(0);
  // private _cartSrv = inject(CartUsecase);
  private readonly _stateSrv = inject(StateFaccade);

  cartItems$ = this._stateSrv.productsInCartData$;

  // ngOnInit(): void {
    // this._cartSrv.currentCart.subscribe(items =>
    //   this.cartItems.set(items.length)
    // );

  //}

  // ngAfterViewInit() {
  //   const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   if (isDarkTheme) this.changeTheme();
  // }

  // changeTheme() {
  //   document.body.classList.toggle('custom_dark_theme')
  // }
}

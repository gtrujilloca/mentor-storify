import { Cart, OrderDto, UserCarts } from '@/core/models/cart.interface';
import { ProductDto } from '@/core/models/products.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CartService {
  id = new Date().getTime();

  constructor(private http: HttpClient) { 
  }
  private _cart: Cart[] = [];
  private _currentCart: BehaviorSubject<Cart[]> = new BehaviorSubject(this._cart);
  public currentCart = this._currentCart.asObservable();
  
  addToCart(product: ProductDto): void {
    console.log(this.id);
    const productInCart = this._cart.find(element => element.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
      productInCart.subtotal = productInCart.quantity * productInCart.price;
    } else {
      this._cart.push({
        ...product,
        quantity: 1,
        subtotal: product.price
      });
    }
    this._currentCart.next(this._cart);
  }

  removeFromCart(productId: number): void {
    this._cart = this._cart.filter(element => element.id !== productId);
    this._currentCart.next(this._cart);
  }
  
  sendOrder(body: OrderDto): Observable<any> {
    return this.http.post(`${environment.serviceUrl}/carts`, body).pipe(
      tap(_ => {
        this._cart = [];
        this._currentCart.next(this._cart);
      })
    )
  }

  getUserCarts(userId: number): Observable<UserCarts[]> {
    return this.http.get<UserCarts[]>(`${environment.serviceUrl}/carts/user/${userId}`);
  }
}

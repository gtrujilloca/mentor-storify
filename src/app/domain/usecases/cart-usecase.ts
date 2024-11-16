import { inject, Injectable } from "@angular/core";
import { CartGateway } from "../gateways/cart-gateway";
import { ProductDto } from "@/core/models/products.interface";
import { Cart, OrderDto, UserCarts } from "@/core/models/cart.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CartUsecase {
    private _cartGateway = inject(CartGateway);

    private _cart: Cart[] = this._cartGateway['_cart'];

    private _currentCart: BehaviorSubject<Cart[]> = this._cartGateway['_currentCart']

    public currentCart: Observable<Cart[]> = this._cartGateway.currentCart;

    addToCart(product: ProductDto): void {  
        this._cartGateway.addToCart(product);
    }

    removeFromCart(productId: number): void {
        this._cartGateway.removeFromCart(productId);
    }

    sendOrder(body: OrderDto): Observable<any> {
        return this._cartGateway.sendOrder(body);
    }

    getUserCarts(userId: number): Observable<UserCarts[]> {
        return this._cartGateway.getUserCarts(userId);
    }
}
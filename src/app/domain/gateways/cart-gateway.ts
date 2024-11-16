import { Cart, OrderDto, UserCarts } from "@/core/models/cart.interface";
import { ProductDto } from "@/core/models/products.interface";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class CartGateway {
    private _cart: Cart[] = [];

    private _currentCart: BehaviorSubject<Cart[]> = new BehaviorSubject(this._cart);
    public currentCart: Observable<Cart[]> = this._currentCart.asObservable();
    
    abstract addToCart(product: ProductDto): void;
    abstract removeFromCart(productId: number): void;
    abstract sendOrder(body: OrderDto): Observable<any>; //TODO: Change any to a proper type
    abstract getUserCarts(userId: number): Observable<UserCarts[]>; //TODO: Change any to a proper type
}
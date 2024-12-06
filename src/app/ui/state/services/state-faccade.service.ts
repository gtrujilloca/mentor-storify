import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAlert, selectIsLoading, selectProducts, selectProductsInCart, selectUserToken, StorifyState } from "../reducers/storify.reducer";
import { ProductDto } from "@/core/models/products.interface";
import { StorifyLocalActions } from "../actions/storify-local.actions";
import { OrderDto } from "@/core/models/cart.interface";
import { selectTotalCartAmount } from "../selectors/storify.selectors";

@Injectable({
    providedIn: 'root'
})
export class StateFaccade {
    private readonly _store = inject(Store<StorifyState>);

    readonly alertData$ = this._store.select(selectAlert);
    readonly isLoading$ = this._store.select(selectIsLoading);
    readonly productsData$ = this._store.select(selectProducts);
    readonly productsInCartData$ = this._store.select(selectProductsInCart);
    readonly userToken$ = this._store.select(selectUserToken);
    readonly totalCartAmount$ = this._store.select(selectTotalCartAmount);
    
    addToCart(product: ProductDto, message: string) {
        this._store.dispatch(StorifyLocalActions.addToCart({product}));
        this._store.dispatch(StorifyLocalActions.showAlert({message}));
    }

    removeFromCart(productId: number) {
        this._store.dispatch(StorifyLocalActions.removeFromCart({productId}));
    }

    getProducts() {
        this._store.dispatch(StorifyLocalActions.getProducts());
    }

    hideAlert() {
        this._store.dispatch(StorifyLocalActions.hideAlert());
    }

    signin(username: string, password: string) {
        this._store.dispatch(StorifyLocalActions.signin({username, password}));
    }

    sendOrder(orderBody: OrderDto) {
        this._store.dispatch(StorifyLocalActions.sendOrder({orderBody}));
    }
}


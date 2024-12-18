import { LocalState } from "@/core/enums/state.enums";
import { Cart } from "@/core/models/cart.interface";
import { ProductDto } from "@/core/models/products.interface";
import { createFeature, createReducer, on } from "@ngrx/store";
import { StorifyApiActions } from "../actions/storify-api.actions";
import { StorifyLocalActions } from "../actions/storify-local.actions";

export interface StorifyState {
    products: ProductDto[],
    productsInCart: Cart[],
    isLoading: boolean,
    alert: {
        isVisible: boolean,
        message: string,
    },
    userToken: string,
}

export const initialState: StorifyState = {
    products: [],
    productsInCart: [],
    isLoading: false,
    alert: {
        isVisible: false,
        message: ''
    },
    userToken: ''
};

export const storifyReducer = createReducer(
    initialState,
    on(StorifyLocalActions.addToCart, 
        (state, {product}): StorifyState => {
            let productsAdded = state.productsInCart.slice();
            const productIndex = productsAdded.findIndex(element => element.id === product.id);
            if (productIndex !== -1) {
                let {quantity, price} = productsAdded[productIndex];
                quantity++
                const product = {...productsAdded[productIndex], quantity, subtotal: price * quantity}
                productsAdded[productIndex] = product;
            } else {
                productsAdded = [...productsAdded, { ...product, quantity: 1, subtotal: product.price }];
            }
            return {
                ...state,
                productsInCart: productsAdded
            }
        }
    ),
    on(StorifyLocalActions.removeFromCart, (
        (state, {productId}): StorifyState => ({
            ...state,
            productsInCart: state.productsInCart.filter(product => productId !== product.id)
        })
    )),
    on(StorifyLocalActions.sendOrder, (
        (state): StorifyState => ({
            ...state,
            isLoading: true
        })
    )),
    on(StorifyApiActions.sendOrderSuccessfully, (
        (state): StorifyState => ({
            ...state,
            isLoading: false,
            productsInCart: []
        })
    )),
    on(StorifyApiActions.sendOrderFailure, (
        (state): StorifyState => ({
            ...state,
            isLoading: false
        })
    )),
    on(StorifyLocalActions.setLoader, (
        (state, { loadingState }): StorifyState => ({
            ...state,
            isLoading: loadingState
        })
    )),
    on(StorifyLocalActions.showAlert, (
        (state, {message}): StorifyState => ({
            ...state,
            alert: {
                isVisible: true,
                message
            }
        })
    )),
    on(StorifyLocalActions.hideAlert, (
        (state): StorifyState => ({
            ...state,
            alert: {
                isVisible: false,
                message: ''
            }
        })
    )),
    on(StorifyLocalActions.getProducts, (
        (state): StorifyState => ({
            ...state,
            isLoading: true
        })
    )),
    on(StorifyApiActions.getProductsSuccessfully, (
        (state, {products}): StorifyState => ({
            ...state,
            products,
            isLoading: false
        })
    )),
    on(StorifyApiActions.getProductsFailure, (
        (state): StorifyState => ({
            ...state,
            isLoading: false
        })
    )),
    on(StorifyLocalActions.signin, (
        (state): StorifyState => ({
            ...state,
            isLoading: true
        })
    )),
    on(StorifyApiActions.signinSuccessfully, (
        (state, {token}): StorifyState => ({
            ...state,
            userToken: token,
            isLoading: false
        })
    )),
    on(StorifyApiActions.signinFailure, (
        (state): StorifyState => ({
            ...state,
            isLoading: false,
        })
    )),
    on(StorifyLocalActions.signup, (
        (state): StorifyState => ({
            ...state,
            isLoading: true
        })
    )),
    on(StorifyApiActions.signupSuccessfully, (
        (state): StorifyState => ({
            ...state,
            isLoading: false
        })
    )),
    on(StorifyApiActions.signupFailure, (
        (state): StorifyState => ({
            ...state,
            isLoading: false
        })
    )),
    on(StorifyLocalActions.getUserCarts, (
        (state): StorifyState => ({
            ...state,
            isLoading: true
        })
    )),
)

export const storifyFeature = createFeature({
    name: LocalState.featureName,
    reducer: storifyReducer
})

export const {
    selectAlert,
    selectIsLoading,
    selectProducts,
    selectProductsInCart,
    selectUserToken
} = storifyFeature;
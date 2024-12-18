
import { getMappedProduct, getOrderBodyMock } from "@/core/mocks/products.mock";
import { StorifyLocalActions } from "../actions/storify-local.actions";
import { initialState, storifyReducer } from "./storify.reducer";
import { StorifyApiActions } from "../actions/storify-api.actions";

describe('StorifyReducer', () => {
    test('Should add to cart', () => {
        const product = getMappedProduct()
        const expectedState = {
            ...initialState,
            productsInCart: [{...product, quantity: 1, subtotal: product.price}]
        }
        const action = StorifyLocalActions.addToCart({product});

        const newState = storifyReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('should remove an item from the cart', () => {
        const product = getMappedProduct();
        const initialStateWithProduct = {
            ...initialState,
            productsInCart: [{...product, quantity: 1, subtotal: product.price}]
        };
        const expectedState = {
            ...initialState,
            productsInCart: []
        };
        const action = StorifyLocalActions.removeFromCart({productId: product.id});
    
        const newState = storifyReducer(initialStateWithProduct, action);
        expect(newState).toEqual(expectedState);
    });

    test('should set the loading when the order is being sent', () => {
        const orderBody = getOrderBodyMock();
        const expectedState = {
            ...initialState,
            isLoading: true
        }

        const action = StorifyLocalActions.sendOrder({orderBody});

        const newState = storifyReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('should clear the products when the order is sent successfully', () => {
        const product = getMappedProduct();
        const initialStateWithProduct = {
            ...initialState,
            productsInCart: [{...product, quantity: 1, subtotal: product.price}]
        };

        const action = StorifyApiActions.sendOrderSuccessfully();

        const newState = storifyReducer(initialStateWithProduct, action);
        expect(newState).toEqual(initialState);
    });

})

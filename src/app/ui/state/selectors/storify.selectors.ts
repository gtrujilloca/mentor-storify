import { createSelector } from "@ngrx/store";
import { selectProductsInCart } from "../reducers/storify.reducer";

export const selectTotalCartAmount = createSelector(
    selectProductsInCart,
    (products) => products.reduce((acc, product) => acc + product.price, 0)
)
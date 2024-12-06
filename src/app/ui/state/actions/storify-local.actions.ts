import { OrderDto } from "@/core/models/cart.interface";
import { ProductDto } from "@/core/models/products.interface";
import { User } from "@/core/models/user.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const StorifyLocalActions = createActionGroup({
    source: 'StorifyLocal',
    events: {
        'addToCart': props<{product: ProductDto}>(),
        'removeFromCart': props<{productId: number}>(),
        'sendOrder': props<{orderBody: OrderDto}>(),
        'setLoader': props<{loadingState: boolean}>(),
        'showAlert': props<{message: string}>(),
        'hideAlert': emptyProps(),
        'getProducts': emptyProps(),
        'signin': props<{username: string, password: string}>(),
        'signup': props<{user: User}>(),
        'getUserCarts': props<{userId: number}>(),
    }
})
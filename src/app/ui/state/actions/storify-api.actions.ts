import { OrderDto, UserCarts } from "@/core/models/cart.interface";
import { ProductDto } from "@/core/models/products.interface";
import { User } from "@/core/models/user.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const StorifyApiActions = createActionGroup({
    source: 'StorifyApi',
    events: {
        'getProductsSuccessfully': props<{products: ProductDto[]}>(),
        'getProductsFailure': emptyProps(),
        'signinSuccessfully': props<{token: string}>(),
        'signinFailure': emptyProps(),
        'signup successfully': props<{user: User}>,
        'signupFailure': emptyProps(),
        'sendOrderSuccessfully': props<{orderBody: OrderDto}>,
        'sendOrderFailure': emptyProps(),
        'getUserCartsSuccessfully': props<{userCats: UserCarts[]}>(),
        'getUserCartsFailure': emptyProps(),       
    }
})
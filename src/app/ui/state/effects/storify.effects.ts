import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StorifyApiActions } from "../actions/storify-api.actions";
import { StorifyLocalActions } from "../actions/storify-local.actions";
import { ProductsUsecase } from "@/domain/usecases/products-usecase";
import { catchError, concatMap, map, of, switchMap, timer } from "rxjs";
import { AuthUsecase } from "@/domain/usecases/auth-usecase";
import { AuthAlertsMessages, OrderAlertsMessages } from "@/core/constants/alerts.constants";
import { CartUsecase } from "@/domain/usecases/cart-usecase";

@Injectable()
export class StorifyEffects {
    private readonly _actions$ = inject(Actions);
    private _productsSrv = inject(ProductsUsecase);
    private _authSrv = inject(AuthUsecase);
    private _cartSrv = inject(CartUsecase);

    getProducts$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(StorifyLocalActions.getProducts),
            switchMap(() => this._productsSrv.getProducts().pipe(
                map(products => StorifyApiActions.getProductsSuccessfully({ products })),
                catchError(() => of(StorifyApiActions.getProductsFailure()))
            ))
        )
    });

    signin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(StorifyLocalActions.signin),
            concatMap(({ username, password }) => this._authSrv.signin(username, password).pipe(
                map((token) => StorifyApiActions.signinSuccessfully(token)),
                catchError(() => {
                    return of(
                        StorifyLocalActions.showAlert({ message: AuthAlertsMessages.SIGNIN_ERROR }),
                        StorifyApiActions.signinFailure()
                    )
                })
            ))
        )
    });

    sendOrder$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(StorifyLocalActions.sendOrder),
            concatMap(({ orderBody }) => this._cartSrv.sendOrder(orderBody).pipe(
                map(() => StorifyApiActions.sendOrderSuccessfully()),
                catchError(() => {
                    return of(
                        StorifyApiActions.sendOrderFailure(),
                        StorifyLocalActions.showAlert({ message: OrderAlertsMessages.ORDER_ERROR })
                    )
                })
            ))
        )
    });

    hideAlert$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(StorifyLocalActions.showAlert),
            switchMap(() => timer(3000).pipe(
                map(() => StorifyLocalActions.hideAlert())
            ))
        )
    }, { dispatch: false }); // dispatch: false prevents the effect from dispatching actions
}
import { getProductsResponseMock } from "@/core/mocks/products.mock";
import { AuthUsecase } from "@/domain/usecases/auth-usecase";
import { CartUsecase } from "@/domain/usecases/cart-usecase";
import { ProductsUsecase } from "@/domain/usecases/products-usecase";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { StorifyApiActions } from "../actions/storify-api.actions";
import { StorifyLocalActions } from "../actions/storify-local.actions";
import { StorifyEffects } from "./storify.effects";



const productServiceMock = {
  getProducts: jest.fn().mockReturnValue(of(getProductsResponseMock()))
}

const authServiceMock = {
  signin: jest.fn().mockReturnValue(of('token'))
}

const cartServiceMock = {
  sendOrder: jest.fn().mockReturnValue(of())
}
describe('StorifyEffect', () => {
  let actions$ = new Observable<Action>();
  let productsUsecase: ProductsUsecase;
  let storifyEffects: StorifyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorifyEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductsUsecase,
          useValue: productServiceMock
        },
        {
          provide: AuthUsecase,
          useValue: authServiceMock
        },
        {
           provide: CartUsecase,
           useValue: cartServiceMock
        },
      ]
    })

    // productsUsecase = TestBed.inject(ProductsUsecase);
    storifyEffects = TestBed.inject(StorifyEffects);
  })

  test('should trigger the effects of getProducts', (done) => {
    actions$ = of({type: StorifyLocalActions.getProducts.type});
    const productsResponse = getProductsResponseMock();
    productServiceMock.getProducts.mockReturnValue(of(productsResponse));
    const usecaseSpy = jest.spyOn(productServiceMock, 'getProducts');

    storifyEffects.getProducts$.subscribe({
      next: (action) => {
        expect(usecaseSpy).toHaveBeenCalled();
        expect(action).toEqual({
          type: StorifyApiActions.getProductsSuccessfully.type,
          products: productsResponse
        })
        done();
      }
    })
  });

  test('should handle the error response', (done) => {
    actions$ = of({type: StorifyLocalActions.getProducts.type});
    productServiceMock.getProducts.mockReturnValue(throwError(() => new Error('Error')));
    const useCaseSpy = jest.spyOn(productServiceMock, 'getProducts');

    storifyEffects.getProducts$.subscribe({
      next: (action) => {
        expect(useCaseSpy).toHaveBeenCalled();
        expect(action).toEqual({
          type: StorifyApiActions.getProductsFailure.type
        })
        done();
      },
    })
  })
})
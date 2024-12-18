import { TestBed } from "@angular/core/testing"
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { selectAlert, selectIsLoading } from "../reducers/storify.reducer"
import { StateFaccade } from "./state-faccade.service"
import { getMappedProduct, getOrderBodyMock } from "@/core/mocks/products.mock"
import { StorifyLocalActions } from "../actions/storify-local.actions"

describe('StateFaccade', () => {
  let service: StateFaccade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAlert,
              value: {
                isVisible: false,
                message: ''
              }
            },
            {
              selector: selectIsLoading,
              value: false
            }
          ]
        })
      ]
    });

    service = TestBed.inject(StateFaccade);
    store = TestBed.inject(MockStore);
  });

  test('should get the alert data', (done) => {
    service.alertData$.subscribe(data => {
      expect(data).toEqual({
        isVisible: false,
        message: ''
      })
      done();
    })
  });

  test('should dispatch add to cart actions', () => {
    const product = getMappedProduct();
    const message = 'Added';
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
    service.addToCart(product, message);

    expect(storeSpy).toHaveBeenCalledTimes(2);
    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.addToCart({product}));
    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.showAlert({message}));
  });

  test('should dispatch the removeFromCart actions', () => {
    const productId = 1;
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    service.removeFromCart(productId);

    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.removeFromCart({productId}));
  });

  test('should dispatch the getProducts actions', () => {
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    service.getProducts();

    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.getProducts());
  });

  test('should dispatch the hideAlert actions', () => {
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    service.hideAlert();

    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.hideAlert())
  });

  test('should dispatch the signin action', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    service.signin(username, password);

    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.signin({username, password}));
  });

  test('should dispatch the sendOrder action', () => {
    const orderBody = getOrderBodyMock();
    const storeSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    service.sendOrder(orderBody);

    expect(storeSpy).toHaveBeenCalledWith(StorifyLocalActions.sendOrder({orderBody}));
  });
})
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { StateFaccade } from "@/ui/state/services/state-faccade.service";

const stateFaccadeMock = {removeFromCart: jest.fn()};
describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: StateFaccade,
        useValue: stateFaccadeMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should remove the item from the cart', () => {
    const stateSrvSpy = jest.spyOn(stateFaccadeMock, 'removeFromCart').mockImplementation(jest.fn());
    component.removeItem(1);
    expect(stateSrvSpy).toHaveBeenCalledWith(1);
  });
});
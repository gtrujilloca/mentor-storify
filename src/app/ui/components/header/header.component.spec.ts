import { StateFaccade } from "@/ui/state/services/state-faccade.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeaderComponent } from "./header.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { By } from "@angular/platform-browser";

const stateFaccadeMock = {
    productsInCartData$: of([{
        id: 2,
        name: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        quantity: 1,
        subtotal: 22.3,
    }])
}
describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AsyncPipe,
                RouterLink
            ],
            providers: [{
                provide: StateFaccade,
                useValue: stateFaccadeMock,
            }, {
                provide: ActivatedRoute,
                useValue: {

                }
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    })

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should show the right amount of items in cart', async () => {
        await fixture.whenStable();
        fixture.detectChanges();
        const message = fixture.debugElement.query(By.css('p[data-test-id="cart-items"]'));
        expect((message.nativeElement as HTMLElement).textContent).toEqual('1');
    })
})
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AlertComponent } from "./alert.component";
import { AsyncPipe } from "@angular/common";
import { StateFaccade } from "@/ui/state/services/state-faccade.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

const stateFaccadeMock = { hideAlert: jest.fn(), alertData$: of({ isVisible: true, message: 'Testing alert' }) };
describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;
  let stateFaccadeSrv: StateFaccade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AsyncPipe],
      providers: [{
        provide: StateFaccade,
        useValue: stateFaccadeMock
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    stateFaccadeSrv = TestBed.inject(StateFaccade);

  })

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should check the alert message', fakeAsync (() => {
    fixture.whenStable();
    let alertData;
    tick();
    component.alertData$.subscribe({
      next: (data) => {
        alertData = data;
      }
    })
    tick();
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('strong[data-test-id="alert-message"]'));
    expect((message.nativeElement as HTMLElement).textContent?.trim()).toEqual(alertData!.message);
  }));

  test('should hide the alert', fakeAsync(() => {
    const stateSrvSpy = jest.spyOn(stateFaccadeSrv, 'hideAlert').mockImplementation(jest.fn()); // Replace actual function
    fixture.whenStable();
    tick();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[data-test-id="alert-dismiss-btn"]'));
    button.triggerEventHandler('click', null);
    expect(stateSrvSpy).toHaveBeenCalled();
  }));
});
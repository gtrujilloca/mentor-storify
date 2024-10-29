import { WithoutSaving } from '@/core/guards/leave-form.guard';
import { User } from '@/core/models/user.interface';
import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { AuthService } from '@/infrastructure/driven-adapters/auth.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, WithoutSaving {
  public signupForm!: FormGroup;
  private _authSrv = inject(AuthUsecase);
  private detector = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['Random username'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: this.fb.group({
        firstname: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      address: this.fb.group({
        city: ['Random City'],
        street: ['Random Street'],
        number: [123],
        zipcode: ['12345'],
        geolocation: this.fb.group({
          lat: ['0.0000'],
          long: ['0.0000'],
        }),
      }),
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
    });
    this.detector.detectChanges();
  }

  onSubmit(): void {
    if (!this.signupForm.valid) return;
    this._authSrv.registerUser(this.signupForm.value);
    this.signupForm.reset();
  }

  canLeave(): boolean {
    if (this.signupForm.dirty) {
      return confirm('¿Desea abandonar el formulario?')
    }
    return true;
  };
}

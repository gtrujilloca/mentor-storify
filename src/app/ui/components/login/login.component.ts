import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _authSrv = inject(AuthUsecase);
  constructor() { }

  signin(data: NgForm) {
    const { username, password } = data.value;
    this._authSrv.signin(username, password)
  }
}

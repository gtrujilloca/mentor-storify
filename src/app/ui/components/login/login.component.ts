import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
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
  private _stateSrv = inject(StateFaccade);
  constructor() { }

  signin(data: NgForm) {
    const { username, password } = data.value;
    // this._authSrv.signin(username, password)
    this._stateSrv.signin(username, password);
  }
}

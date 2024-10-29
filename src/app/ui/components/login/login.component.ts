import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { AuthService } from '@/infrastructure/driven-adapters/auth.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private _authSrv = inject(AuthUsecase);

  ngOnInit(): void {
    
  }

  signin(data: NgForm) {
    const { username, password } = data.value;

    this._authSrv.signin('mor_2314', '83r5^_')
    // this._authSrv.signin(username, password);
  }
}

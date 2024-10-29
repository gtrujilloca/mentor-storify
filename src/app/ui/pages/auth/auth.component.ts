import { SigninData, User } from '@/core/models/user.interface';
import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";
import { SignupComponent } from "../../components/signup/signup.component";
import { RouterOutlet } from '@angular/router';
import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { AuthService } from '@/infrastructure/driven-adapters/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    SignupComponent,
    RouterOutlet
  ],
  providers: [

  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthComponent {

}

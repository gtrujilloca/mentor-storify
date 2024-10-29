import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _authSrv = inject(AuthUsecase);
  const router = inject(Router)

  return _authSrv.isLogged() || router.navigateByUrl('auth/signin');
};

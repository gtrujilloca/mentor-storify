import { AuthUsecase } from '@/domain/usecases/auth-usecase';
import { HttpErrorResponse, HttpEventType, HttpResponse, HttpStatusCode, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, count, delay, map, mergeMap, retry, retryWhen, switchMap, tap, throwError, timer } from 'rxjs';
import { INCLUDE_TOKEN } from './auth.context';



export const storeApiInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthUsecase)

  if (!req.context.get(INCLUDE_TOKEN)) return next(req);

  const requestCopy = req.clone({
    setHeaders: {
      esteban123: '123'
    }
  })

  return next(requestCopy).pipe(
    switchMap((response) => {
      if (response.type === HttpEventType.Response && response.status === HttpStatusCode.Ok) {
        return throwError(() => ({
          ...response,
          status: HttpStatusCode.Unauthorized
        }))
      }
      return [response];
    }), 
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        return authSrv.refreshToken('1', 'jwt').pipe(
          switchMap(_ => next(req))
        )
      }
      return throwError(error);
    })
  );
};

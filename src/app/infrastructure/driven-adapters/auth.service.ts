import { TokenPayload, User } from '@/core/models/user.interface';
import { AuthGateway } from '@/domain/gateways/auth-gateway';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService extends AuthGateway {
  id = new Date().getTime();

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.serviceUrl}/users`, user)
  }

  signin(username: string, password: string): void {
    this.httpClient.post<{ token: string }>(`${environment.serviceUrl}/auth/login`, { username, password }).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token)
        this.router.navigateByUrl('/')
      }), catchError(error => {
        return of(new Error(error))
      }))
      .subscribe()
  }

  refreshToken(id: string, refreshToken: string): Observable<any> {
    return timer(1000).pipe(
      map(_ => ({
        refreshToken: 'loremipsum',
      }))
    )
  }

  isLogged(): boolean {
    const token = sessionStorage.getItem('token') || '';
    return Boolean(token);
  }

  getUserId(): number | null {
    const token = sessionStorage.getItem('token');

    if (!token) return null;
    else {
      const decodedToken = jwtDecode<TokenPayload>(token);
      return decodedToken.sub
    }
  }
}

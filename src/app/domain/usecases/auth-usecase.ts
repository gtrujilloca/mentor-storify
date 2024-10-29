import { inject, Injectable } from "@angular/core";
import { AuthGateway } from "../gateways/auth-gateway";
import { User } from "@/core/models/user.interface";
import { Observable } from "rxjs";

@Injectable()
export class AuthUsecase {
    private _authGateway = inject(AuthGateway);

    registerUser(user: User): Observable<User> {
        return this._authGateway.registerUser(user);
    }

    signin(username: string, password: string): void {
        this._authGateway.signin(username, password);
    }

    refreshToken(id: string, refreshToken: string): Observable<any> {
        return this._authGateway.refreshToken(id, refreshToken);
    }

    isLogged(): boolean {
        return this._authGateway.isLogged();
    }
}
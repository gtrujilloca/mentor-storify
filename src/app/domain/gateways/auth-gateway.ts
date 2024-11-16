import { User } from "@/core/models/user.interface";
import { Observable } from "rxjs";

export abstract class AuthGateway {
    abstract registerUser(user: User): Observable<User>;
    abstract signin(username: string, password: string): void;
    abstract refreshToken(id: string, refreshToken: string): Observable<any>;
    abstract isLogged(): boolean;
    abstract getUserId(): number | null;
}
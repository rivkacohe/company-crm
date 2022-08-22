import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivateChild {
    private readonly tokenField = 'token';
    EmailField ='userEmail';
    redirectUrl: string | null = null; // store url for redirecting after login
    userEmail!:string|null;
    constructor(
        private router: Router,
        private apiService: ApiService,
    ) { }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {

        // is the user logged in
        if (this.isLoggedIn()) { return true };

        // store the attempted url for redirecting
        this.redirectUrl = state.url;

        return this.router.navigate(['login-component']);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem(this.tokenField);
        this.userEmail = localStorage.getItem(this.EmailField);
        if (token && token.length > 0) {
            this.apiService.setToken(token);
            return true;
        }

        return false;
    }

    login(details: Login): Observable<User> {
        return this.apiService.login(details).pipe(
            tap((data: User) => {
                if (data.token) {
                    localStorage.setItem(this.tokenField, data.token);
                    localStorage.setItem(this.EmailField, data.email);
                    this.apiService.setToken(data.token);
                }
            })
        )
    }

    logout() {
        localStorage.removeItem(this.tokenField);
        this.apiService.setToken('');
    }
}
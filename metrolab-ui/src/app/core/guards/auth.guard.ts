import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Data } from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';
import { User } from './../models/user.model';

/**
 * Authentication and authorization guard
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        return this.checkPermission(route.data, state);
    }

    canLoad(route: Route): boolean {
        return this.checkPermission(route.data);
    }

    private checkPermission(data: Data, state?: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (data.roles && data.roles.indexOf(currentUser.role) === -1) {
                // if unauthorized, redirect to home page
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        }
        this.redirectToLogin(state);
        return false;
    }

    private redirectToLogin(state?: RouterStateSnapshot): void {
        if (state) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        } else {
            this.router.navigate(['/']);
        }
    }

}
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';

/**
 * Authentication and authorization guard
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    /**
     * Check if user is authenticated and authorized
     * @param route 
     * @param state 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check for permission
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // if unauthorized, redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorized
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
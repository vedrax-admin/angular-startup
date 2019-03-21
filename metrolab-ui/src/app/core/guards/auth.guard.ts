import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';
import { User } from './../models/user.model';

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
            return this.hasPermission(route, currentUser);
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    /**
     * Check if logged in user has permission
     * @param route 
     * @param user 
     */
    private hasPermission(route: ActivatedRouteSnapshot, user: User): boolean {
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
            // if unauthorized, redirect to home page
            this.router.navigate(['/']);
            return false;
        }
        // authorized
        return true;
    }

}
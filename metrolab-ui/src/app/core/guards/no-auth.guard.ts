import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';

/**
 * Authentication and authorization guard
 */
@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    /**
     * Restrict resource when user is authenticated
     * @param route 
     * @param state 
     */
    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {  
            // returns to home page
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}
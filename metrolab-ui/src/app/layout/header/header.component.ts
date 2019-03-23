import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthenticationService } from './../../core/services/authentication.service';
import { User } from './../../core/models/user.model';
import { Role } from './../../core/models/role.enum';

@Component({
    selector: 'metrolab-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    /**
     * The authenticated user
     */
    currentUser: User;

    /**
     * We keep a reference of the auth service for unsubscribing it after component destruction
     */
    private authSubscription: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authSubscription = this.authenticationService.currentUserObs
            .subscribe(user => this.currentUser = user);
    }

    /**
     * Prevent memory leak
     */
    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    /**
     * Is authenticated user an administrator ?
     */
    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    /**
     * Logout for application
     */
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
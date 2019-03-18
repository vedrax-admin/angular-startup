import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';
import { User, Role } from './../../models';

@Component({
    selector: 'metrolab-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

    /**
     * The authenticated user
     */
    currentUser: User;

    /**
     * Constructor
     * @param router 
     * @param authenticationService 
     */
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    /**
     * Initialization method
     */
    ngOnInit() {
        this.authenticationService.currentUser
            .subscribe(user => this.currentUser = user);
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
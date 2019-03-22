import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../core/services/authentication.service';
import { User } from './../../core/models/user.model';
import { Role } from './../../core/models/role.enum';

@Component({
    selector: 'metrolab-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

    /**
     * The authenticated user
     */
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authenticationService.currentUserObs
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
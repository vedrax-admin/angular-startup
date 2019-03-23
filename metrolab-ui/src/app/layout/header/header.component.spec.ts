import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService } from './../../core/services/authentication.service';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { Router } from '@angular/router';
import { MockRouter } from './../../testing/services/router.mock';

import { SIMPLE_USER } from './../../testing/data/user.data';

describe('HeaderComponent', () => {

    let comp: HeaderComponent;
    let authService: AuthenticationService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // provide the component-under-test and dependent service
            providers: [
                HeaderComponent,
                { provide: AuthenticationService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter }
            ]
        });
        // inject both the component and the dependent service.
        comp = TestBed.get(HeaderComponent);
        authService = TestBed.get(AuthenticationService);
        router = TestBed.get(Router);
    });

    it('currentUser should not be defined after construction', () => {
        expect(comp.currentUser).toBeUndefined();
    });

    it('currentUser should be defined after Angular calls ngOnInit', () => {
        comp.ngOnInit();
        expect(comp.currentUser).toBeDefined();
        expect(comp.currentUser.firstName).toEqual(SIMPLE_USER.firstName);
    });

    it('when user is not an administrator, isAdmin returns false', () => {
        comp.ngOnInit();
        expect(comp.isAdmin).toBe(false);
    });

    it('when user calls logout, the logout of the authentication service is called and the user is redirect to the login page', () => {
        spyOn(authService, 'logout');
        spyOn(router, 'navigate');

        comp.ngOnInit();
        comp.logout();
        expect(authService.logout).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

});
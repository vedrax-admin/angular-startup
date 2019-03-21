import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { Role } from '../models/role.enum';
import { AuthenticationService } from '../services/authentication.service';
import { ADMINISTRATOR } from './../../testing/data/user.data';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { MockRouter } from './../../testing/services/router.mock';

class MockActivatedRouteSnapshot {
    private _data: any;
    get data() {
        return this._data;
    }
}

class MockRouterStateSnapshot {
    url: string = '/';
}

describe('AuthGuard', () => {
    describe('canActivate', () => {
        let authGuard: AuthGuard;
        let authService: AuthenticationService;
        let router: Router;
        let route: ActivatedRouteSnapshot;
        let state: RouterStateSnapshot;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [AuthGuard,
                    { provide: Router, useClass: MockRouter },
                    { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot },
                    { provide: AuthenticationService, useClass: MockAuthService },
                    { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
                ]
            });
            router = TestBed.get(Router);
            spyOn(router, 'navigate');
            authService = TestBed.get(AuthenticationService);
            //set logged in administrator by default
            authService.setAuthentication(ADMINISTRATOR);
            authGuard = TestBed.get(AuthGuard);
            state = TestBed.get(RouterStateSnapshot);
        });

        it('When logged in user has permission returns true', () => {

            forAdminRoute();

            expect(authGuard.canActivate(route, state)).toEqual(true);
        });

        it('When logged in user has NOT permission returns false and redirect to home page', () => {

            forAdminRoute();

            //change role to simple user
            authService.currentUserValue.role = Role.User;

            expect(authGuard.canActivate(route, state)).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('When user is not logged in returns false and redirect to login page', () => {

            //no user currently logged in
            authService.setAuthentication(null);

            expect(authGuard.canActivate(route, state)).toEqual(false);
            //redirect to login page with redirect URL
            expect(router.navigate).toHaveBeenCalledWith(['/login'], Object({ queryParams: Object({ returnUrl: '/' }) }));
        });

        function forAdminRoute() {
            route = TestBed.get(ActivatedRouteSnapshot);
            spyOnProperty(route, 'data', 'get').and.returnValue({ roles: ['Admin'] });
        }
    });
});
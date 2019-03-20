import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { AuthenticationService } from '../services/authentication.service';

class MockRouter {
    navigate(path) { }
}

class MockActivatedRouteSnapshot {
    private _data: any;
    get data() {
        return this._data;
    }
}

class MockRouterStateSnapshot {
    url: string = '/';
}

const adminUser: User = {
    id: 1,
    username: 'username',
    password: 'password',
    firstName: 'Remy',
    lastName: 'Penchenat',
    role: Role.Admin,
    token: 'token'
};

class MockAuthService {

    private user: User;

    get currentUserValue(): User {
        return this.user;
    };

    setAuthentication(user: User) {
        this.user = user;
    }

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
            authService.setAuthentication(adminUser);
            authGuard = TestBed.get(AuthGuard);
            state = TestBed.get(RouterStateSnapshot);
        });

        it('Administrator can access admin route when logged in', () => {

            forAdminRoute();

            expect(authGuard.canActivate(route, state)).toEqual(true);
        });

        it('Simple user cannot access admin route when logged in', () => {

            forAdminRoute();

            //change role to simple user
            authService.currentUserValue.role = Role.User;

            expect(authGuard.canActivate(route, state)).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('Redirect to login when user is not logged in', () => {

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
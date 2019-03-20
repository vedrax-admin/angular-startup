import { TestBed } from '@angular/core/testing';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { User, Role } from '../models';
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

class MockAuthService {
    currentUserValue: User = {
        id: 1,
        username: 'username',
        password: 'password',
        firstName: 'Remy',
        lastName: 'Penchenat',
        role: Role.Admin,
        token: 'token'
    };
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
                    { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot },
                    { provide: AuthenticationService, useClass: MockAuthService },
                    { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
                ]
            });
            authService = TestBed.get(AuthenticationService);
            authGuard = TestBed.get(AuthGuard);
            state = TestBed.get(RouterStateSnapshot);
        });

        it('should return true for a logged in user', () => {

            route = TestBed.get(ActivatedRouteSnapshot);
            spyOnProperty(route, 'data', 'get').and.returnValue({ roles: ['Admin'] });

            expect(authGuard.canActivate(route, state)).toEqual(true);
        });
    });
});
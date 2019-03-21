import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NoAuthGuard } from './no-auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { ADMINISTRATOR } from './../../testing/data/user.data';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { MockRouter } from './../../testing/services/router.mock';

describe('NoAuthGuard', () => {
    describe('canActivate', () => {
        let noAuthGuard: NoAuthGuard;
        let authService: AuthenticationService;
        let router: Router;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [NoAuthGuard,
                    { provide: Router, useClass: MockRouter },
                    { provide: AuthenticationService, useClass: MockAuthService }
                ]
            });
            router = TestBed.get(Router);
            spyOn(router, 'navigate');
            authService = TestBed.get(AuthenticationService);
            //set logged in administrator by default
            authService.setAuthentication(ADMINISTRATOR);
            noAuthGuard = TestBed.get(NoAuthGuard);
        });

        it('When user is logged in returns false', () => {

            expect(noAuthGuard.canActivate()).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('When user is NOT logged in returns true', () => {

            //no user currently logged in
            authService.setAuthentication(null);

            expect(noAuthGuard.canActivate()).toEqual(true); 
        });

    });
});



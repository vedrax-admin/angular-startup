import { DebugElement } from '@angular/core';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './login.component';
import { AuthenticationService } from './../../core/services/authentication.service';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { MockRouter } from './../../testing/services/router.mock';
import { shouldBeValid, shouldHaveError, setCtrlValue } from './../../testing/utils/form.util';
import { SIMPLE_USER } from './../../testing/data/user.data';



const fakeActivatedRoute = {
    snapshot: {
        queryParams: {
            returnUrl: '/'
        }
    }
};

describe('LoginComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                NoopAnimationsModule
            ],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthenticationService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
            ]
        }).compileComponents();
    }));

    describe(':', () => {

        function setup() {
            const fixture = TestBed.createComponent(LoginComponent);
            const comp = fixture.componentInstance;
            const element = fixture.nativeElement;
            const debugElement = fixture.debugElement;
            return { fixture, comp, element, debugElement };
        }

        it('should create the app', () => {
            const { comp } = setup();
            expect(comp).toBeTruthy();
        });

        it('the form should be invalid', async(() => {
            const { comp } = setup();
            comp.ngOnInit();
            expect(comp.loginForm.valid).toBeFalsy();
        }));

        it('when username is a correct email, spot as valid', () => {
            controlShouldBeValid('username', 'finance@vedrax.com');
        });

        it('when username is not provided returns an error', () => {
            hasError('username', '', 'required');
        });

        it('when username is an incorrect email, spot as invalid', () => {
            hasError('username', 'invalid', 'email');
        });

        it('when password is correct, spot as valid', () => {
            controlShouldBeValid('password', 'password');
        });

        it('when password is longer than expected, spot as invalid', () => {
            hasError('password', 'veryverylongpassword', 'maxlength');
        });

        it('when password is less than expected, spot as invalid', () => {
            hasError('password', 'ver', 'minlength');
        });

        it('Submit a valid form', fakeAsync(() => {

            const { comp, debugElement } = setup();
            //must initiate the form before
            comp.ngOnInit();

            //spies
            const authService = spyOnAuthenticationService_login(debugElement);
            const router = spyOnRouter_navigate(debugElement);

            //set username and password
            setCtrlValue(comp.loginForm, 'username', 'finance@vedrax.com');
            setCtrlValue(comp.loginForm, 'password', 'password');

            expect(comp.loginForm.valid).toBe(true);
            expect(comp.submitted).toBe(false);

            //submit
            comp.onSubmit();

            // flush the component's setTimeout()
            tick();

            expect(authService.login).toHaveBeenCalledWith('finance@vedrax.com', 'password');
            expect(router.navigate).toHaveBeenCalledWith(['/']);
            expect(comp.submitted).toBe(true);

        }));

        function spyOnAuthenticationService_login(debugElement: DebugElement): AuthenticationService {
            const authService = debugElement.injector.get(AuthenticationService);
            spyOn(authService, 'login').and.returnValue(of(SIMPLE_USER));
            return authService;
        }

        function spyOnRouter_navigate(debugElement: DebugElement): Router {
            const router = debugElement.injector.get(Router);
            spyOn(router, 'navigate');
            return router;
        }

        function controlShouldBeValid(ctrlName: string, value: string) {
            const comp = getLoginComponent();
            let test: boolean = shouldBeValid(comp.loginForm, ctrlName, value);
            expect(test).toBe(true);
        }

        function hasError(ctrlName: string, value: string, errorName: string) {
            const comp = getLoginComponent();
            let test:boolean = shouldHaveError(comp.loginForm, ctrlName, value, errorName);
            expect(test).toBe(true);
        }

        function getLoginComponent() {
            const { comp } = setup();
            //must initiate the form before
            comp.ngOnInit();
            return comp;
        }

    });

});
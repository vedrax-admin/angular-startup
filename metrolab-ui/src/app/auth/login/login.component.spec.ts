import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './login.component';
import { AuthenticationService } from './../../core/services/authentication.service';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { MockRouter } from './../../testing/services/router.mock';
import { MockActivatedRoute } from './../../testing/services/activated-route.mock';
import { of } from 'rxjs';

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

    });

});
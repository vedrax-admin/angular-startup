import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS,HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';
import { AuthenticationService } from '../services/authentication.service';
import { MockAuthService } from './../../testing/services/authentication.service.mock';

const testUrl = '/data';

interface Data {
    name: string;
  }

describe('ErrorInterceptor', () => {
    describe('intercept', () => {
        let errorInterceptor: ErrorInterceptor;
        let authService: AuthenticationService;
        let httpClient: HttpClient;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [ErrorInterceptor,
                    { provide: AuthenticationService, useClass: MockAuthService },
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: ErrorInterceptor,
                        multi: true,
                    }
                ],
                imports: [HttpClientTestingModule]
            });
            httpClient = TestBed.get(HttpClient);
            httpMock = TestBed.get(HttpTestingController);
            authService = TestBed.get(AuthenticationService);
            spyOn(authService, 'logout');
            errorInterceptor = TestBed.get(ErrorInterceptor);

        });

        it('When 401 or 403, user is automatically logged out and error is rethrow', () => {

            const emsg = 'deliberate 401 error';

            // Make an HTTP GET request
            httpClient.get<Data>(testUrl).subscribe(
                res => fail('should have failed with the 401 error'),
                (error: HttpErrorResponse) => {
                    expect(error).toEqual(emsg, 'message');
                }
            );

            // The following `expectOne()` will match the request's URL.
            const req = httpMock.expectOne(testUrl)

            // Respond with mock error
            req.flush(emsg, { status: 401, statusText: 'Unauthorized' });

            expect(authService.logout).toHaveBeenCalledTimes(1);
        });

    });
});
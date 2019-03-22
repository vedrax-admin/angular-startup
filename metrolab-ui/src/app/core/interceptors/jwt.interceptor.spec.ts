import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';
import { MockAuthService } from './../../testing/services/authentication.service.mock';
import { SIMPLE_USER } from './../../testing/data/user.data';
import { Data } from './../../testing/data/util.data';
import { jwtInterceptorProvider } from './jwt.interceptor';

const testUrl = '/data';

describe('JwtInterceptor', () => {
    describe('intercept', () => {
        let authService: AuthenticationService;
        let httpClient: HttpClient;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [JwtInterceptor,
                    { provide: AuthenticationService, useClass: MockAuthService },
                    jwtInterceptorProvider
                ],
                imports: [HttpClientTestingModule]
            });
            httpClient = TestBed.get(HttpClient);
            httpMock = TestBed.get(HttpTestingController);
            authService = TestBed.get(AuthenticationService);
            //Add authenticated user
            authService.setAuthentication(SIMPLE_USER);
        });

        it('When authenticated user, should add authentication header to each request', () => {

            // Make an HTTP GET request
            initiateGetRequest();

            // The following `expectOne()` will match the request's URL.
            const req = mockRequest();

            expect(req.request.headers.has('Authorization')).toEqual(true);
            expect(req.request.headers.get('Authorization')).toBe('Bearer token');
        });

        it('When NO authenticated user, should NOT add authentication header to each request', () => {

            //no user authenticated
            authService.setAuthentication(null);

            // Make an HTTP GET request
            initiateGetRequest();

            // The following `expectOne()` will match the request's URL.
            const req = mockRequest();

            expect(req.request.headers.has('Authorization')).toEqual(false);
        });

        function initiateGetRequest(){
            httpClient.get<Data>(testUrl).subscribe(
                res => {
                    expect(res).toBeTruthy();
                });
        }

        function mockRequest(){
            return httpMock.expectOne(testUrl);
        }

    });
});
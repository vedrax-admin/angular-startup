import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { SIMPLE_USER } from './../../testing/data/user.data';
import { User } from './../models/user.model';


describe('AuthenticationService', () => {
    let apiService: ApiService;
    let authenticationService: AuthenticationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                AuthenticationService
            ],
            imports: [HttpClientTestingModule]
        });
        apiService = TestBed.get(ApiService);
        //returns an observable user when making login request
        spyOn(apiService, 'post').and.returnValue(of(SIMPLE_USER));
        httpMock = TestBed.get(HttpTestingController);
        authenticationService = TestBed.get(AuthenticationService);
    });

    it('When user provides valid credentials, it returns the user', () => {

        spyOn(localStorage, 'setItem');
        spyOn(authenticationService, 'setAuthentication');

        authenticationService.login('username', 'password').subscribe((user: User) => {
            testUser(user);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(authenticationService.setAuthentication).toHaveBeenCalledWith(user);
        });
    });

    it('When user logged out, remove from local storage', () => {

        spyOn(localStorage, 'removeItem');
        spyOn(authenticationService, 'setAuthentication');

        authenticationService.logout();

        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(authenticationService.setAuthentication).toHaveBeenCalledWith(null);
    });

    /**
     * Helping method for checking the returned user
     * 
     * @param data The returned data
     */
    function testUser(user: User) {
        expect(user.firstName).toBe(SIMPLE_USER.firstName);
        expect(user.token).toBe(SIMPLE_USER.token);
    }

});
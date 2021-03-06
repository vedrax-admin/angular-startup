import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    /**
     * Hold the authenticated user that needs to be share with other components
     */
    private currentUserSubject: BehaviorSubject<User>;

    /**
     * An Observable of the authenticated user 
     */
    public currentUserObs: Observable<User>;

    constructor(private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserObs = this.currentUserSubject.asObservable();
    }

    /**
     * Get authenticated user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Set authentication by passing user to subject
     */
    public setAuthentication(user: User) {
        this.currentUserSubject.next(user);
    }

    /**
     * Sign in a user
     * @param username 
     * @param password 
     */
    login(username: string, password: string) {
        return this.apiService.post<User>('/public/auth', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.setAuthentication(user);
                }

                return user;
            }));
    }

    /**
     * Log user out by removing user from local storage
     */
    logout() {
        localStorage.removeItem('currentUser');
        this.setAuthentication(null);
    }
}
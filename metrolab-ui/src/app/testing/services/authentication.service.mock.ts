import { User } from './../../core/models/user.model';
import { Observable, of } from 'rxjs';

import { SIMPLE_USER } from './../data/user.data';

export class MockAuthService {

    private user: User;

    public currentUserObs: Observable<User> = of(SIMPLE_USER);

    get currentUserValue(): User {
        return this.user;
    };

    setAuthentication(user: User) {
        this.user = user;
    }

    login(username: string, password: string){}

    logout() { }

}
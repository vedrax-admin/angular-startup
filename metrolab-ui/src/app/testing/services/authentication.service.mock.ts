import { User } from './../../core/models/user.model';

export class MockAuthService {

    private user: User;

    get currentUserValue(): User {
        return this.user;
    };

    setAuthentication(user: User) {
        this.user = user;
    }

    logout(){}

}
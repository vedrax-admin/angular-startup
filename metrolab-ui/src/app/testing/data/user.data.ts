import { User } from './../../core/models/user.model';
import { Role } from './../../core/models/role.enum';

export const ADMINISTRATOR: User = {
    id: 1,
    username: 'username',
    password: 'password',
    firstName: 'Remy',
    lastName: 'Penchenat',
    role: Role.Admin,
    token: 'token'
}

export const SIMPLE_USER: User = {
    id: 1,
    username: 'username',
    password: 'password',
    firstName: 'Elodie',
    lastName: 'Penchenat',
    role: Role.User,
    token: 'token'
}
import { accessToken } from './access-token';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accessToken: accessToken;
}

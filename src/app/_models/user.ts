import { accessToken } from './access-token';
import { Post } from '.';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accessToken: accessToken;
    modifiedDate: Date;
    createdDate: Date;
    posts: Array<Post>;
    followers: Array<User>;
    followings: Array<User>;
}

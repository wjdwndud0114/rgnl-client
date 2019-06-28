import { accessToken } from './access-token';
import { Post, Follow } from '.';

export class User {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Role: string;
    ModifiedDate: Date;
    CreatedDate: Date;
    Posts: Array<Post>;
    Followers: Array<Follow>;
    Following: Array<Follow>;
    AccessToken: accessToken;
}

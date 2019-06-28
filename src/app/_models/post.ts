import { User } from '.';

export class Post {
    Id: number;
    Title: string;
    Content: string;
    User: User;
    ModifiedDate: Date;
    CreatedDate: Date;
}
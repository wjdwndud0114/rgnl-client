import { User } from '.';

export class Post {
    id: number;
    title: string;
    content: string;
    user: User;
    modifiedDate: Date;
    createdDate: Date;
}
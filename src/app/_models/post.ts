import { User } from './user';

export interface Post {
    PostId: number;
    Title: string;
    Content: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    AppUserId: number;
    AppUser: User;
}

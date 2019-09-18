import { UserRole } from './user-role';
import { Relationship } from './relationship';

export interface User {
    Id: number;
    UserName: string;
    Email: string;
    FirstName: string;
    LastName: string;
    FacebookId: number;
    PictureUrl: string;
    Followers: Relationship[];
    Following: Relationship[];
    Roles: UserRole[];
}

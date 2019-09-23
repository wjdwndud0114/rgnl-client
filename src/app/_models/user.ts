import { UserRole } from './user-role';
import { Relationship } from './relationship';
import { Profile } from './profile';

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
    Profile: Profile;
}

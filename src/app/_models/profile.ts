import { User } from './user';

export interface Profile {
    ProfileId: number;
    ShortDescription: string;
    LongDescription: string;
    Tags: string;
    Url: string;
    Street: string;
    City: string;
    State: string;
    Zip: string;
    AppUserId: number;
    AppUser: User;
}

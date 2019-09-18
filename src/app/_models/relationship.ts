import { User } from './user';

export interface Relationship {
    RelationshipId: number;
    FollowerId: number;
    FolloweeId: number;
    Follower: User;
    Followee: User;
}
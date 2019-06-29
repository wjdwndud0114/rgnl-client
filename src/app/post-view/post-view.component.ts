import { Component, OnInit, Input } from '@angular/core';
import { Post, User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    posts: Array<Post>;

    constructor (
       private authenticationService: AuthenticationService
    ) { }

    ngOnInit () {
        this.authenticationService.subscribeToUser(this.refreshUserCallBack);
        this.refreshUserCallBack(this.authenticationService.currentUserValue);
    }

    refreshUserCallBack = (user: User) => {
        this.posts = [].concat(...user.Following.map(f => {
            f.Followed.Posts.map(p => p.User = {
                AccessToken: null,
                Email: f.Followed.Email,
                CreatedDate: f.Followed.CreatedDate,
                FirstName: f.Followed.FirstName,
                Followers: null,
                Following: null,
                Id: f.Followed.Id,
                LastName: f.Followed.LastName,
                ModifiedDate: f.Followed.ModifiedDate,
                Posts: null,
                Role: f.Followed.Role
            });
            return f.Followed.Posts;
        }));
    }

    ngOnDestroy (): void {
        this.authenticationService.unsubscribeToUser();
    }
}

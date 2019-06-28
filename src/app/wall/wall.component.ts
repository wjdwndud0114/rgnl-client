import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post, User } from '@/_models';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    posts: Array<Post>;
    view: number;

    private _mobileQueryListener: () => void;

    constructor (
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private changeDectorRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 1023px');
        this._mobileQueryListener = () => changeDectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit () {
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(["/login"]);
            return;
        }

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
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.authenticationService.unsubscribeToUser();
    }

    signout (): void {
        this.authenticationService.logout().pipe(first()).subscribe(
            data => {
                this.router.navigate(["/"]);
            }
        );
    }
}

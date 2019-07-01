import { Component, OnInit, Input } from '@angular/core';
import { Post, User, Role } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '@/_services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    canPost: boolean;
    postForm: FormGroup;
    loading: boolean;
    posts: Array<Post>;

    constructor (
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private postService: PostService
    ) { }

    ngOnInit () {
        this.postForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        })

        this.canPost = this.authenticationService.currentUserValue.Role != Role.User;
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
        var user = this.authenticationService.currentUserValue;
        this.posts = this.posts.concat(...user.Posts.map(p => {
            p.User = {
                AccessToken: null,
                Email: user.Email,
                CreatedDate: user.CreatedDate,
                FirstName: user.FirstName,
                Followers: null,
                Following: null,
                Id: user.Id,
                LastName: user.LastName,
                ModifiedDate: user.ModifiedDate,
                Posts: null,
                Role: user.Role
            };
            return p;
        }));
        this.posts.sort((a, b) => a.CreatedDate > b.CreatedDate ? 1 : -1);
    }

    ngOnDestroy (): void {
        this.authenticationService.unsubscribeToUser();
    }

    get f() { return this.postForm.controls; }

    createPost = () => {
        if (this.postForm.invalid) {
            return;
        }

        this.loading = true;
        var user = this.authenticationService.currentUserValue;
        this.postService.create(this.f.title.value, this.f.content.value, user.Id)
        .pipe(first())
        .subscribe(
            data => {
                this.loading = false;
                this.authenticationService.refreshUser().pipe(first()).subscribe(
                    data => {
                        this.refreshUserCallBack(data);
                    }
                )
            },
            error => {

            }
        )
    }
}

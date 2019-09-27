import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Subject } from 'rxjs';
import { LiveService } from 'src/app/_services/live.service';
import { takeUntil, skip } from 'rxjs/operators';
import { Post, User } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>();
  user: User;
  posts: Post[];
  postForm: FormGroup;
  loading = false;
  error = '';
  isProducer: boolean;

  @ViewChild('formDirective', {static: false}) private formDirective: NgForm;

  get f (): FormGroup['controls'] { return this.postForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private liveService: LiveService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
    });

    this.userService.getFollowed();

    this.data.posts.pipe(takeUntil(this.destroyed))
      .subscribe(
        posts => {
          this.posts = posts;
        }
      );

    this.data.user.pipe(takeUntil(this.destroyed))
      .subscribe(
        user => {
          if (user) {
            this.user = user;
            this.isProducer = user.Roles.some(role => role.Role.Name === 'producer');
          }
        }
      );

    this.data.followed.pipe(skip(1), takeUntil(this.destroyed))
    .subscribe (
      followed => {
        this.userService.getPosts();
      }
    );

    this.liveService.start(this.user.Id);
  }

  ngOnDestroy() {
    this.liveService.stop();
    this.destroyed.next();
    this.destroyed.complete();
  }

  createPost () {
    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.createPost({
      AppUserId: this.user.Id,
      Title: this.f.title.value,
      Content: this.f.content.value,
    } as Post)
      .subscribe(
        result => {
          this.loading = false;
          this.formDirective.resetForm();
          this.error = '';
        },
        error => {
          this.loading = false;
          this.error = Object.values(error).join('\n');
      }
    );
  }

  onUpdatePost(post: Post) {
    this.userService.updatePost(post).subscribe(
      result => {
        console.log(`Post ${post.PostId} update succeeded`);
        // TODO: loading indication, growler maybe
      },
      error => {
        console.log(`Post ${post.PostId} update failed`);
        // TODO: loading indication, growler maybe
      }
    );
  }

  onDeletePost(postId: number) {
    this.userService.deletePost(postId).subscribe(
      result => {
        console.log(`Post ${postId} delete succeeded`);
        // TODO: loading indication, growler maybe
      },
      error => {
        console.log(`Post ${postId} delete failed`);
        // TODO: loading indication, growler maybe
      }
    );
  }
}

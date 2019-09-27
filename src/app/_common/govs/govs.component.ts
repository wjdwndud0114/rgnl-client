import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService, DataService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-govs',
  templateUrl: './govs.component.html',
  styleUrls: ['./govs.component.scss']
})
export class GovsComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>();
  user: User;
  govs: User[];
  followedIds: number[] = [];
  loading = false;
  error = '';
  isProducer: boolean;

  constructor(
    private data: DataService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getGovs();

    this.data.followed.pipe(takeUntil(this.destroyed))
    .subscribe(
      followed => {
        if (followed) {
          this.followedIds = followed.map(f => f.Id);
        } else {
          this.followedIds = [];
        }
      }
    );

    this.data.govs.pipe(takeUntil(this.destroyed))
      .subscribe(
        govs => {
          this.govs = govs;
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
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onFollow(govId: number) {
    this.userService.followUser(govId);
  }

  onUnfollow(govId: number) {
    this.userService.unfollowUser(govId);
  }
}

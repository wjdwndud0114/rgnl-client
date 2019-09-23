import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from 'src/app/_services/user.service';
import { DataService } from 'src/app/_services/data.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  console = console;
  user: User;

  constructor (
    private userService: UserService,
    private media: MediaMatcher,
    private data: DataService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px');
  }

  ngOnInit () {
    this.data.user.pipe(first())
    .subscribe(
      user => {
        if (!user.Profile) {
          this.router.navigateByUrl('/profile');
        }
        this.user = user;
      }
    );
  }

  ngOnDestroy (): void {
  }

  signout (): void {
    this.userService.logout();
  }

}

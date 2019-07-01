import { Component, OnInit, Input } from '@angular/core';
import { UserService, AuthenticationService } from '@/_services';
import { User } from '@/_models';

@Component({
    selector: 'app-gov-card',
    templateUrl: './gov-card.component.html',
    styleUrls: ['./gov-card.component.scss']
})
export class GovCardComponent implements OnInit {
    @Input() gov: User;
    isFollowing: boolean;
    loading: boolean;

    constructor (
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit () {
        this.isFollowing = this.authenticationService.currentUserValue.Following.map(f => f.Followed.Id).includes(this.gov.Id);
    }

    followGovUser = () => {
        this.loading = true;
        this.userService.follow(this.gov.Id)
        .subscribe(
            data => {
                this.loading = false;
                this.isFollowing = true;
            },
            error => {

            }
        );
    }

    unfollowGovUser = () => {
        this.loading = true;
        this.userService.unfollow(this.gov.Id)
        .subscribe(
            data => {
               this.loading = false; 
                this.isFollowing = false;
            },
            error => {

            }
        );
    }
}

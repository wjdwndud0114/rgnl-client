import { Component, OnInit, Input } from '@angular/core';
import { UserService, AuthenticationService } from '@/_services';
import { User } from '@/_models';

@Component({
    selector: 'app-gov-card',
    templateUrl: './gov-card.component.html',
    styleUrls: ['./gov-card.component.css']
})
export class GovCardComponent implements OnInit {
    @Input() gov: User;

    loading: boolean;

    constructor (
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit () {
    }

    followGovUser = () => {
        this.loading = true;
        this.userService.follow(this.gov.Id, this.authenticationService.currentUserValue.Id)
        .subscribe(
            data => {
                this.loading = false;
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
            },
            error => {

            }
        );
    }
}

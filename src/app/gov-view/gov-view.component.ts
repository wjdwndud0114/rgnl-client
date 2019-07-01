import { Component, OnInit } from '@angular/core';
import { UserService } from '@/_services';
import { User } from '@/_models';

@Component({
    selector: 'app-gov-view',
    templateUrl: './gov-view.component.html',
    styleUrls: ['./gov-view.component.scss']
})
export class GovViewComponent implements OnInit {
    govs: Array<User>;

    constructor (
        private userService: UserService
    ) { }

    updateGovernment = () => {
        this.userService.getGovUsers().subscribe(users => {
            console.log(users);
            this.govs = users;
        });
    }

    ngOnInit () {
        this.updateGovernment();
    }
}

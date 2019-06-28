import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@/_models';
import { UserService } from '@/_services';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    @Input() posts;

    constructor (
        private userService: UserService
    ) { }

    ngOnInit () {
        
    }

}

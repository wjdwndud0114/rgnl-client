import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@/_models';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post;

    constructor () { }

    ngOnInit () {
    }

}

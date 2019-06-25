import { Component, OnInit } from '@angular/core';
import { Post } from '@/_models';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    posts: Array<Post>;

    constructor () {
        this.posts = [
            {
                id: 1,
                title: "Post #1",
                content: "Post content!!!!",
                user: null,
                modifiedDate: new Date(),
                createdDate: new Date()
            },
            {
                id: 2,
                title: "Post #2",
                content: "Post content!!!!",
                user: null,
                modifiedDate: new Date(),
                createdDate: new Date()
            },
            {
                id: 3,
                title: "Post #3",
                content: "Post content!!!!",
                user: null,
                modifiedDate: new Date(),
                createdDate: new Date()
            },
        ]
    }

    ngOnInit () {
    }

}

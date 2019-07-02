import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@/_models';
import { PostService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post: Post;

    editForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;

    constructor (
        private formBuilder: FormBuilder,
        private postService: PostService
    ) { }

    ngOnInit () {
        this.editForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    get f() { return this.editForm.controls; }

    saveChanges () {
        if (this.editForm.invalid) {
            return;
        }

        this.loading = true;
        this.postService.edit(this.post.Id, this.f.title.value, this.f.content.value)
        .pipe(first())
        .subscribe(
            data => {
                this.loading = false;
            },
            error => {
                this.loading = false;
            }
        );
    }

    cancel () {

    }

    delete () {
        this.postService.delete(this.post.Id);
    }
}

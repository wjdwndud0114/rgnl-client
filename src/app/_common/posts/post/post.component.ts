import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/_models';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [DatePipe]
})
export class PostComponent implements OnInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Input() post: Post;
  @Input() userId: number;
  private isEditing = false;
  postForm: FormGroup;

  get f (): FormGroup['controls'] { return this.postForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
    });
  }

  edit () {
    this.isEditing = true;
  }

  updatePost () {
    if (!this.postForm.valid) {
      return;
    }

    if (this.f.title.value === this.post.Title && this.f.content.value === this.post.Content) {
      this.isEditing = false;
      return;
    }

    this.onUpdate.emit({
      Title: this.f.title.value,
      Content: this.f.content.value,
      PostId: this.post.PostId,
    } as Post);
    this.isEditing = false;
  }

  reset () {
    this.postForm.reset({
      title: this.post.Title,
      content: this.post.Content
    });
  }
}
